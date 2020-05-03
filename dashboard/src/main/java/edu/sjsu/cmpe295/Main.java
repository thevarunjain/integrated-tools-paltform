package edu.sjsu.cmpe295;

import com.offbytwo.jenkins.JenkinsServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URISyntaxException;

@SpringBootApplication
public class Main {

    final static String jenkinsUrl = "http://52.53.120.24:8080";
    final static String username = "admin";
    final static String password = "admin";

    public static void main(String[] args) throws URISyntaxException {

        SpringApplication.run(Main.class, args);
        Jenkins.startServer(jenkinsUrl, username, password);
        JenkinsServer server = Jenkins.getServer();

        if(server.isRunning()){
            System.out.println("\nJenkins is up and running at \n"+jenkinsUrl);
        }

    }

}
