package com.IntegratedTools.GitHub.PullRequests;

import com.IntegratedTools.GitHub.HttpConnectionAndResponseHandler.HttpConnectionAndResponseHandler;
import com.IntegratedTools.GitHub.Constants.Constants;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/github")
public class pullRequestDetails extends Constants {

    @Autowired
    static HttpConnectionAndResponseHandler httpConnectionAndResponseHandler;

    @GetMapping("/pullRequests/{userName}/{repoName}")
    private static String getPullRequestDetails(@PathVariable("userName") final String user_name, @PathVariable("repoName") String repo_name) throws IOException {
        String URLGitHubIssues = BASE_URL + "repos/" + user_name + '/' + repo_name + "/issues";

        HttpResponse<JsonNode> response = HttpConnectionAndResponseHandler.getHttpResponse(URLGitHubIssues);

        JSONObject result = new JSONObject();
        try{
            JSONArray responseArray = response.getBody().getArray();
            List<JSONObject> resultList = new ArrayList<>();
            for (int i=0; i<responseArray.length(); i++){
                JSONObject issueDetails = new JSONObject();
                JSONObject issueObject = responseArray.getJSONObject(i);
                if (issueObject.has("pull_request")) {
                    String issueTitle = issueObject.getString("title");
                    issueDetails.put("issueTitle", issueTitle);

                    JSONObject userObject = issueObject.getJSONObject("user");
                    String issueBy = userObject.getString("login");
                    issueDetails.put("issueBy", issueBy);

                    String issueCreatedAt = issueObject.getString("created_at");
                    issueDetails.put("issueCreatedAt", issueCreatedAt);

                    String issueDescription = issueObject.getString("body");
                    issueDetails.put("issueDescription", issueDescription);

                    resultList.add(issueDetails);
                }
            }
            result.put("CommitDetails", resultList);
        }catch (Exception e){
            result.put("Error", e);
        }
        System.out.println("response==== = = = " + response.getBody());
        return result.toString();
    }
}
