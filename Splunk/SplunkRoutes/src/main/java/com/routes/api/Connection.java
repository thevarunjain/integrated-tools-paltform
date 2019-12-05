package com.routes.api;

import java.util.HashMap;
import java.util.Map;

import com.splunk.HttpService;
import com.splunk.SSLSecurityProtocol;
import com.splunk.Service;


public class Connection {
	public static Service connect(String Host, String username, String password) {
		Map<String, Object> connectionArgs = new HashMap<String, Object>();
		HttpService.setSslSecurityProtocol(SSLSecurityProtocol.TLSv1_2);
		connectionArgs.put("host",Host);
		connectionArgs.put("username",username);
		connectionArgs.put("password",password);
		connectionArgs.put("port",8089);
		connectionArgs.put("scheme","https");
		
		Service splunkService = Service.connect(connectionArgs);
		
		return splunkService;
	}

}
