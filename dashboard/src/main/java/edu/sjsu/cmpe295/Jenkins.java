package edu.sjsu.cmpe295;

import com.offbytwo.jenkins.JenkinsServer;

import java.net.URI;
import java.net.URISyntaxException;

public final class Jenkins {

    private static JenkinsServer server = null;

    private Jenkins(String jenkinsUrl, String username, String password) throws URISyntaxException {
            server = new JenkinsServer(new URI(jenkinsUrl+"/api/json?pretty=true"),
                    username, password
            );
    }

    /**
     * Start the Jenkins server
     * @param jenkinsUrl
     * @param username
     * @param password
     */
    public static void startServer(String jenkinsUrl, String username, String password) {
        if (server == null) {
            server = new JenkinsServer(URI.create(jenkinsUrl), username, password);
        }
    }

    /**
     * Get the instance of the server
     * @return
     */
    public static JenkinsServer getServer(){
        return server;
    }
}
