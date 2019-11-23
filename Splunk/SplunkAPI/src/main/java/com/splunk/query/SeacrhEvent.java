package com.splunk.query;

import java.io.InputStream;

import com.splunk.Args;
import com.splunk.Job;
import com.splunk.Service;
import com.splunk.connect.Connection;

public class SeacrhEvent {
	
	//Create a job before searching
	public static void SimpleSearch() {
		Service splunkservice  = Connection.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
		String SearchQuery="search index=_internal * | head 3";
		Args queryArgs = new Args();
		queryArgs.put("earliest_time", "-3d@d");
		queryArgs.put("latest_time","now");
		
		Job job = splunkservice.search(SearchQuery,queryArgs);
		InputStream stream  = job.getResults();
		
		try {
			byte[] buffer = new byte[4096];
            while(stream.read(buffer)!=-1){
                System.out.println(new String(buffer));
            }
            
		}
		catch(Exception e) {}
		
		
	}
	
	public static void search() {
		Service splunkservice  = Connection.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
		String outputmode = "json"; //xml,json,csv
		String SearchQuery="search index=_internal * | head 3";
		Args queryArgs = new Args();
		queryArgs.put("earliest_time", "-3d@d");
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
		
		try {
			byte[] buffer = new byte[4096];
            while(stream.read(buffer)!=-1){
                System.out.println(new String(buffer));
            }
            
		}
		catch(Exception e) {}
		
		
		
		
		
	}
	

}
