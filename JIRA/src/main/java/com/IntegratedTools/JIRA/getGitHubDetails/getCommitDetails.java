package com.IntegratedTools.JIRA.getGitHubDetails;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/integratedTools/JIRA")
public class getCommitDetails {

    @GetMapping("/commitDetails/{issueKey}")
    private static String getCommitDetails(@PathVariable("issueKey") final String issue_Key) {
        String URLJIRAIssues = "https://abhijira911.atlassian.net/rest/agile/1.0/issue/" + issue_Key;

        HttpResponse<JsonNode> response = Unirest.get(URLJIRAIssues)
                .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                .header("Accept", "application/json")
                .asJson();

        JSONObject res = new JSONObject();
        try {
            if(response.getBody().getObject().has("id")) {
                JSONObject obj = response.getBody().getObject();
                String s = obj.getString("id");
                System.out.println(" s = " + s);

                String URLJIRAISSUES = "https://abhijira911.atlassian.net/rest/dev-status/latest/issue/detail?issueId=" + s + "&applicationType=GitHub&dataType=repository";

                HttpResponse<JsonNode> response1 = Unirest.get(URLJIRAISSUES)
                        .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                        .header("Accept", "application/json")
                        .asJson();

                System.out.println("response body is ======================= " + response1.getBody());

                JSONObject responseObject = response1.getBody().getObject();
                if (responseObject.has("detail")) {
                    JSONArray detail = responseObject.getJSONArray("detail");
                    List<JSONObject> commitsList = new ArrayList<>();
                    for (int j = 0; j < detail.length(); j++) {
                        JSONObject repoObject = detail.getJSONObject(0);
                        if (repoObject.has("repositories")) {
                            JSONArray repositoriesArray = repoObject.getJSONArray("repositories");
                            if (repositoriesArray.length()>0) {
                                JSONObject repositoriesObject = repositoriesArray.getJSONObject(0);
                                if (repositoriesObject.has("name")) {
                                    String name = repositoriesObject.getString("name");
                                    System.out.println("name = = = " + name);
                                    JSONArray commitsArray = repositoriesObject.getJSONArray("commits");
                                    for (int i = 0; i < commitsArray.length(); i++) {
                                        JSONObject commitObject = new JSONObject();
                                        JSONObject commitsObject = commitsArray.getJSONObject(i);
                                        commitObject.put("id", commitsObject.getString("id"));
                                        commitObject.put("url", commitsObject.getString("url"));
                                        commitObject.put("message", commitsObject.getString("message"));
                                        commitObject.put("name", commitsObject.getJSONObject("author").getString("name"));
                                        commitObject.put("githubLink", commitsObject.getJSONObject("author").getString("url"));
                                        commitsList.add(commitObject);
                                    }
                                }else{
                                    return "No name found";
                                }
                            }else{
                                return "No repositories attached found";
                            }
                        }else{
                            return "No repositories attached found";
                        }
                    }
                    res.put("commits", commitsList);
                }
            }else{
                    return "No Such Issue present";
                }
        }catch (Exception e){
            res.put("error", e);
        }
        return res.toString();
    }
}

