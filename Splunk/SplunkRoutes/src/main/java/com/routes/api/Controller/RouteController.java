package com.routes.api.Controller;

import java.io.InputStream;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.routes.api.Connection;
import com.splunk.Args;
import com.splunk.Entity;
import com.splunk.Job;
import com.splunk.Receiver;
import com.splunk.Service;
import com.splunk.ServiceInfo;

import net.minidev.json.JSONObject;

@RestController
public class RouteController {
	
	@RequestMapping("/ping")
	public String home() {
		return "pinged back";
	}	
	
	
	@PostMapping(path = "/EventGenerator",consumes = "application/json")
	public  String EventGenerator(@RequestBody String message) {
			System.out.println("Hello");
			
			Service splunkservice  = Connection.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
			Receiver receiver = splunkservice.getReceiver();
			
			Args logArgs = new Args();
			logArgs.put("sourcetype" ,"mysourcetype");
			receiver.log("main",logArgs,message);
			
			
			return "log generated";
			

}
	@GetMapping(path = "/serverinfo")
	public String getServerInfo() {
		Service splunkservice  = Connection.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
		ServiceInfo info = splunkservice.getInfo();
		String s = "";
		s += "Info:";
//		System.out.println("Info:");
		for(String key:info.keySet()) 
//			System.out.println("   "+key+ ":" +info.get(key));
			
			s +="\n" +"   "+key+ ":" +info.get(key);
			
		Entity settings =  splunkservice.getSettings();
//		System.out.println("\nSettings: ");
		s += "\n"+ "\nSettings: ";
		for(String key:settings.keySet()) 
//			System.out.println("   "+key+ ":" +settings.get(key));
			s += "\n"+ "   "+key+ ":" +settings.get(key);
		return s;
		
		
		
	}
	
	@PostMapping(path = "/search/{output_mode}",consumes = "application/json")
	public String search(@PathVariable("output_mode") String outputmode, @RequestBody String start_time) {
		Service splunkservice  = Connection.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
//		String outputmode = "json"; //xml,json,csv
		
		String SearchQuery="search index=_internal * | head 3";
		Args queryArgs = new Args();
		queryArgs.put("earliest_time", "-3d@d");
//		queryArgs.put("earliest_time", start_time);
		queryArgs.put("latest_time","now");
		
		Job job = splunkservice.getJobs().create(SearchQuery,queryArgs);
		while (!job.isDone()){
            try{
                Thread.sleep(500);
            }catch (Exception e){

            }

        }
		Args outputArgs = new Args();
		outputArgs.put("output_mode",outputmode);
        InputStream stream  = job.getResults(outputArgs);
        
        String s ="";
		
		try {
			byte[] buffer = new byte[4096];
            while(stream.read(buffer)!=-1){
//                System.out.println(new String(buffer));
            	s += "\n"+new String(buffer);
            }
            
		}
		catch(Exception e) {}
		
        return s;
		
		
		
		
		
	}
	
	
	
	

}
