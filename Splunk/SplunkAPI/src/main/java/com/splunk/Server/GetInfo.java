package com.splunk.Server;

import com.splunk.Entity;
import com.splunk.Service;
import com.splunk.ServiceInfo;
import com.splunk.connect.Connection;

public class GetInfo {
	public static void getServerInfo() {
		Service splunkservice  = Connection.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
		ServiceInfo info = splunkservice.getInfo();
		System.out.println("Info:");
		for(String key:info.keySet()) 
			System.out.println("   "+key+ ":" +info.get(key));
			
		Entity settings =  splunkservice.getSettings();
		System.out.println("\nSettings: ");
		for(String key:settings.keySet()) 
			System.out.println("   "+key+ ":" +settings.get(key));
		
		
		
	}
}
