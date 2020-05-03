package com.IntegratedTools.JIRA.getGitHubDetails;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/integratedTools/JIRA")
public class getBranchDetails {

    @GetMapping("/branchDetails/{issueKey}")
    private static String getBranchDetails(@PathVariable("issueKey") final String issue_Key) {
        String URLJIRAIssues = "https://abhijira911.atlassian.net/rest/agile/1.0/issue/" + issue_Key;

        HttpResponse<JsonNode> response = Unirest.get(URLJIRAIssues)
                .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                .header("Accept", "application/json")
                .asJson();
        JSONObject result = new JSONObject();
        try {
            if(response.getBody().getObject().has("id")) {
                JSONObject obj = response.getBody().getObject();
                String s = obj.getString("id");
                System.out.println(" s = " + s);


            String URLJIRAISSUES = "https://abhijira911.atlassian.net/rest/dev-status/latest/issue/detail?issueId="+s+"&applicationType=GitHub&dataType=branch";

            HttpResponse<JsonNode> response1 = Unirest.get(URLJIRAISSUES)
                    .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                    .header("Accept", "application/json")
                    .asJson();

            System.out.println("response body is ======================= " + response1.getBody());


                JSONObject responseObject = response1.getBody().getObject();
                if (responseObject.has("detail")) {
                    JSONArray detail = responseObject.getJSONArray("detail");
                    List<JSONObject> branchList = new ArrayList<>();
                    for (int j = 0; j < detail.length(); j++) {
                        JSONObject repoObject = detail.getJSONObject(0);
                        if (repoObject.has("branches")) {
                            JSONArray branchesArray = repoObject.getJSONArray("branches");
                            if (branchesArray.length() > 0) {
                                for (int i=0; i<branchesArray.length(); i++) {
                                    JSONObject branchObject = branchesArray.getJSONObject(i);
                                    if (branchObject.has("name")) {
                                        JSONObject branchDetails = new JSONObject();
                                        String name = branchObject.getString("name");
                                        branchDetails.put("Name of Branch", name);
                                        System.out.println("name = = = " + name);
                                        JSONObject repositories = branchObject.getJSONObject("repository");
                                        branchDetails.put("Name of Repository", repositories.getString("name"));

                                        JSONObject lastCommit = branchObject.getJSONObject("lastCommit");
                                        branchDetails.put("lastCommit id", lastCommit.getString("id"));

                                        JSONObject author = lastCommit.getJSONObject("author");
                                        branchDetails.put("Author of Commit", author.getString("name"));
                                        branchList.add(branchDetails);
                                    } else {
                                        return "No name found";
                                    }
                                }
                            }else {
                                return "No repositories attached found";
                            }
                        }else{
                            return "No repositories attached found";
                        }
                    }
                    result.put("Branch Details", branchList);
                }

            }else{
                return "No Such Issue present";
            }
        }catch (Exception e){
            result.put("error", e);
        }
    return result.toString();
    }
}
