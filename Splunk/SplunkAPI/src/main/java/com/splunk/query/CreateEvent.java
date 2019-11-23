package com.splunk.query;

import com.splunk.Args;
import com.splunk.Receiver;
import com.splunk.Service;
import com.splunk.connect.Connection;

public class CreateEvent {
	public static void EventGenerator() {
		
		Service splunkservice  = Connection.connect("52.53.233.200", "admin", "SPLUNK-i-0d3cffc781ab082fd");
		Receiver receiver = splunkservice.getReceiver();
		
		Args logArgs = new Args();
		logArgs.put("sourcetype" ,"mysourcetype");
		receiver.log("main",logArgs,"Splunk configuration server running here.");
		
		
		}

}
