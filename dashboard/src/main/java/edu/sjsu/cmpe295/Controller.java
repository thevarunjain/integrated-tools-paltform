package edu.sjsu.cmpe295;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.offbytwo.jenkins.JenkinsServer;
import com.offbytwo.jenkins.model.Job;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.*;
import lombok.experimental.var;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/jenkins")
public class Controller {


    final static String jenkinsUrl = "http://52.53.120.24:8080";
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
    @PostMapping(value = "/build/{name}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String buildJob(
            @PathVariable String name
    ) {
        System.out.println("Build job"+name);
        JSONObject obj = new JSONObject();
        try {

            String url = jenkinsUrl+"/job/"+name+"/build";

            HttpResponse<String> response = Unirest.post(url)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asString();

            if(response.getStatus() == 201){
                System.out.println("Success");
                obj.put("message","Built has been started for "+name);

            }
        }catch (Exception e){
            obj.put("message",e);
        }
        return obj.toString();
    }


    /**
     * Get all Jobs
     * @return
     */
    @GetMapping(value = "/jobs")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getJobs(){
        System.out.println("Get all jobs");

        List<JSONObject> res = new ArrayList<>();
        JSONObject obj = new JSONObject();

        try{
            HttpResponse<JsonNode> response = Unirest.get(jenkinsUrl+urlPadding)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asJson();

            JSONObject jsonObject = response.getBody().getObject();

            for(int i = 0 ; i < jsonObject.getJSONArray("jobs").length() ; i++){
                    JSONObject job = (JSONObject) jsonObject.getJSONArray("jobs").get(i);

                    JSONObject jobObject = new JSONObject();
                    jobObject.put("name" , job.getString("name"));
                    jobObject.put("url" , job.getString("url"));
                    res.add(jobObject);
            }

            obj.put("jobs",res);

        }catch (Exception e) {
            System.out.println(e);
            obj.put("error",e);
        }
        return obj.toString();
    }



    /**
     * Get job
     * @param jobName
     * @return
     */
    @GetMapping(value = "/jobs/{jobName}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getJob(
            @PathVariable("jobName") String jobName)
    {
        System.out.println("Get job - "+ jobName);
        JSONObject obj = new JSONObject();
        try{
            String url = jenkinsUrl+"/job/"+jobName+urlPadding;

            HttpResponse<JsonNode> response = Unirest.get(url)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asJson();

            JSONObject jsonObject = response.getBody().getObject();
            String name = jsonObject.getString("name");
            String jobUrl = jsonObject.getString("url");
            JSONArray builds = jsonObject.getJSONArray("builds");

            obj.put("name", name);
            obj.put("url", jobUrl);
            obj.put("builds", builds);

        }catch (Exception e) {
            System.out.println(e);
            obj.put("error",e);
        }
        return obj.toString();
    }


    /**
     * Get build
     * @param jobName
     * @return
     */
    @GetMapping(value = "/jobs/{jobName}/builds/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getBuild(
            @PathVariable String jobName, @PathVariable String id)

    {
        System.out.println("Get build "+id+" for job "+ jobName);

        JSONObject obj = new JSONObject();
        try{
            String url = jenkinsUrl+"/job/"+jobName+"/"+id+urlPadding;

            HttpResponse<JsonNode> response = Unirest.get(url)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asJson();

            JSONObject jsonObject = response.getBody().getObject();

            if(jsonObject.has("actions")){
                JSONArray actionsArray = jsonObject.getJSONArray("actions");
                if(actionsArray.length() > 0){
                    JSONObject firstAction = actionsArray.getJSONObject(0);
                    if(firstAction.has("causes")){
                        JSONArray causes = firstAction.getJSONArray("causes");
                        if(causes.length()>0){
                             JSONObject causesObject = causes.getJSONObject(0);
                             if(causesObject.has("shortDescription")){
                                 obj.put("cause", causesObject.get("shortDescription"));
                             }
                        }
                    }
                }
            }

            obj.put("number", jsonObject.getString("number"));
            obj.put("result",jsonObject.getString("result"));
            obj.put("timestamp",jsonObject.getString("timestamp"));
            obj.put("url",jsonObject.getString("url"));
            obj.put("totaltime",jsonObject.getString("duration"));

        }catch (Exception e) {
            System.out.println(e);
            obj.put("error",e);
        }
        return obj.toString();
    }

    /**
     * Get build log
     * @param jobName
     * @return
     */
    @GetMapping(value = "/jobs/{jobName}/builds/{id}/log")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String getBuildLog(
            @PathVariable String jobName, @PathVariable String id)
    {
        System.out.println("Get build "+id+" for job "+ jobName);

        JSONObject obj = new JSONObject();
        try{
            String url = jenkinsUrl+"/job/"+jobName+"/"+id+"/consoleText"+urlPadding;

            HttpResponse<String> response = Unirest.get(url)
                    .header("Accept", "*/*")
                    .basicAuth(username, basicToken)
                    .asString();

            String[] logLines = response.getBody().split("\n");

            obj.put("log",url);
            for(int i = 0 ; i < logLines.length ; i++){
                String line = logLines[i];
                if(line.contains("Tests run:")){
                    for(String item : line.split(",")){
                        String[] metric = item.split(":");
                        if(!metric[0].contains("Time elapsed")) {
                            obj.put(metric[0].trim(), metric[1].trim());
                        }
                    }
                }
                else if(line.indexOf("Finished") == 0){
                    obj.put("status", line.split(":")[1].trim());
                }
                else if(line.contains("Total time")){
                    obj.put("buildTime", line.split(":")[1].trim());
                }
                else if(line.contains("+ git log -1")){
                    obj.put("commit",logLines[i+1].split(" ")[1]);
                    String[] author = logLines[i+2].split(" ");
                    obj.put("author",author[1]+" "+author[2]);
                    obj.put("email",author[3].substring(1,author[3].length()-1));
                    obj.put("timeStamp",logLines[i+3].split(":",2)[1].trim());
                    obj.put("commitMessage",logLines[i+5].trim());
                    i=i+4;
                }else if(line.contains("Commit message")){
                    obj.put("commitMessage",line.split(":",2)[1]);
                }
            }


        }catch (Exception e) {
            e.printStackTrace();
            obj.put("error",e);
        }
        return obj.toString();
    }





    /**
     * Pings the jenkins server
     * @param name
     * @return
     */
    @GetMapping(value = "/ping")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String ping(
            @RequestParam(required = false) String name
    ) {
        System.out.println("Ping");
        JSONObject obj = new JSONObject();
        try {

            JenkinsServer server = Jenkins.getServer();
            if(server.isRunning()){
                System.out.println("Jenkins is running");
                obj.put("status","Jenkins is running");
            }else{
                obj.put("status","Could not connect to Jenkins");
            }
        } catch (Exception e) {
            System.out.println(e);
            obj.put("status",e);
        }
        return obj.toString();
    }


}
