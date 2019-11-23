package com.splunk.connect;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.splunk.query.CreateEvent;
import com.splunk.query.SeacrhEvent;
import com.splunk.Server.GetInfo;

@SpringBootApplication
public class SplunkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplunkApiApplication.class, args);
//		Connection con = new Connection();
//		con.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
//		GetInfo info =  new GetInfo();
//		info.getServerInfo();
//		Event e = new Event();
//		e.EventGenerator();
		SeacrhEvent s = new SeacrhEvent();
		s.search();
		
		
		
		
		
		
	}

}
