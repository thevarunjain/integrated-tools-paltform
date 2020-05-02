package edu.sjsu.cmpe295;

import com.offbytwo.jenkins.JenkinsServer;
import com.offbytwo.jenkins.model.Build;
import com.offbytwo.jenkins.model.Job;
import edu.sjsu.cmpe295.Jenkins;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/jenkins")
public class Controller {

    final static String jenkinsUrl = "http://ec2-54-153-5-132.us-west-1.compute.amazonaws.com:8080";
    final String urlPadding = "/api/json?pretty=true";
    final String authToken = "";
    final String username = "admin";
    final String password = "admin";
    final String basicToken = "112246fa80d7af43b1a98e9d0aec4574ec";


    /**
     * Build a job
     * @param name
     * @return
     */
    @PostMapping(value = "/build")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String triggerJob(
            @RequestParam(required = false) String name
    ) {
        System.out.println("Build "+name);
        String res = "";
        try {

            System.out.println(Jenkins.getServer().isRunning());

            String url = jenkinsUrl+"/job/"+name+"/build";
            System.out.println("URL "+url);

            HttpResponse<String> response = Unirest.post(url)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asString();

            if(response.getStatus() == 201){
                System.out.println("Success");
                res = "Built has been Started";

            }
        }catch (Exception e){
            System.out.println(e);
        }
        return res;
    }


    /**
     * Get all Jobs
     */
    @GetMapping(value = "/jobs")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getJobs(){
        System.out.println("Get all jobs");

        HttpResponse<String> response= null;

        try{
            response = Unirest.post(jenkinsUrl+urlPadding)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asString();

            System.out.println(response);
            System.out.println(response.getStatus());
            System.out.println(response.getBody());



        }catch (Exception e) {
            System.out.println(e);
        }
        return response.getBody();
    }



    /**
     * Get builds for a job
     * @param jobName
     * @return
     */
    @GetMapping(value = "/job")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getBuilds(
            @RequestParam(required = false) String jobName
    ) {
        System.out.println("Get a builds for job - "+ jobName);

        HttpResponse<String> response= null;

        try{

            String url = jenkinsUrl+"/job/"+jobName+urlPadding;

            System.out.println("Url "+url);
            response = Unirest.post(url)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asString();

            System.out.println(response);
            System.out.println(response.getStatus());
            System.out.println(response.getBody());



        }catch (Exception e) {
            System.out.println(e);
        }
        return response.getBody();
    }



    /**
     * Pings the jenkins server
     * @param name
     * @return
     */
    @GetMapping(value = "/ping")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getStatus(
            @RequestParam(required = false) String name
    ) {
        System.out.println("Ping");

        String returnStatus = "";
        try {

            JenkinsServer server = Jenkins.getServer();
            if(server.isRunning()){
                System.out.println("Jenkins is running");
                returnStatus = "Jenkins is running";
            }else{
                returnStatus = "Could not connect to Jenkins";
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return returnStatus;
    }



    /**
    TESTING........
     */
    @GetMapping(value = "/all")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String test(
            @RequestParam(required = false) String jobName
    ) {

        HttpResponse<String> response= null;

        try{
            JenkinsServer server = Jenkins.getServer();
            Map<String, Job> jobs = server.getJobs();
            System.out.println("Map " +jobs);

            for(String s : jobs.keySet()){
                System.out.println("Name "+ jobs.get(s).getName());        // url
                System.out.println("Url "+ jobs.get(s).getUrl());
                System.out.println("All Builds \n");

                for(Build b : jobs.get(s).details().getAllBuilds()){
                    System.out.println(b.getUrl());
                    System.out.println(b.getNumber());
                }
                System.out.println("1 Builds "+ jobs.get(s).details().getBuildByNumber(1));
                System.out.println();
            }


        }catch (Exception e) {
            System.out.println(e);
        }
        return "Test Return";
    }


}
