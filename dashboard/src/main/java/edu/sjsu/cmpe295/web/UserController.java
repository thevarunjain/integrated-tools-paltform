package edu.sjsu.cmpe295.web;

import com.offbytwo.jenkins.JenkinsServer;
import com.offbytwo.jenkins.model.Build;
import com.offbytwo.jenkins.model.JobWithDetails;
import com.offbytwo.jenkins.model.QueueItem;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.apache.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/jenkins")
public class UserController {


    @PostMapping(value = "/trigger")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getUsers(
            @RequestParam(required = false) String name
    ) {
        System.out.println("In get jenkins");
        String res = "";
        try {
            JenkinsServer jenkins = new JenkinsServer(new URI("http://13.52.17.41:8080/api/json?pretty=true"),
                    "thevarunjain",
                    "varun123");

            System.out.println(jenkins.isRunning());

            System.out.println(name);

            HttpResponse<String> response = Unirest.post("http://13.52.17.41:8080/job/"+name+"/build")
                    .header("Authorization", "Basic dGhldmFydW5qYWluOjExMjgwNWIxZDlmYjZkODlkMmI4Y2U5YmJhYzVmYzk0N2M=")
                    .header("Accept", "*/*")
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

    @GetMapping(value = "/getjobs")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getJobs(
            @RequestParam(required = false) String name
    ) {
        System.out.println("In get jobs");

        HttpResponse<String> response1= null;

        try{

            response1 = Unirest.post("http://13.52.17.41:8080/api/json?pretty=true")
                    .header("Authorization", "Basic dGhldmFydW5qYWluOjExMjgwNWIxZDlmYjZkODlkMmI4Y2U5YmJhYzVmYzk0N2M=")
                    .header("Accept", "*/*")
                    .asString();

            System.out.println(response1);
            System.out.println(response1.getStatus());
            System.out.println(response1.getBody());



        }catch (Exception e) {
            System.out.println(e);
        }
        return response1.getBody();
    }


    @GetMapping(value = "/getstatus")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getStatus(
            @RequestParam(required = false) String name
    ) {
        System.out.println("In get jenkins");
        String returnStatus = "";
        try {
            JenkinsServer jenkins = new JenkinsServer(new URI("http://13.52.17.41:8080/api/json?pretty=true"),
                    "thevarunjain",
                    "varun123");

            System.out.println(jenkins.isRunning());
            if(jenkins.isRunning()){
                returnStatus = "Jenkins is running";
            }else{
                returnStatus = "Could not connect to Jenkins";
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return returnStatus;
    }

}
