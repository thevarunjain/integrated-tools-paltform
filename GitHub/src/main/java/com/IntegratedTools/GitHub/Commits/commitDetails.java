package com.IntegratedTools.GitHub.Commits;

import com.IntegratedTools.GitHub.Constants.Constants;
import com.IntegratedTools.GitHub.HttpConnectionAndResponseHandler.HttpConnectionAndResponseHandler;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/github")
public class commitDetails extends Constants {

    @Autowired
    private static HttpConnectionAndResponseHandler httpConnectionAndResponseHandler;

    @GetMapping("/commits/{userName}/{repoName}")
    private static String getCommitDetails(@PathVariable("userName") final String user_name, @PathVariable("repoName") String repo_name) throws IOException {
        String URLGitHubIssues = BASE_URL + "repos/" + user_name + '/' + repo_name + "/commits";

        HttpResponse<JsonNode> response = HttpConnectionAndResponseHandler.getHttpResponse(URLGitHubIssues);

        JSONObject result = new JSONObject();
        try{
            JSONArray responseArray = response.getBody().getArray();
            List<JSONObject> resultList = new ArrayList<>();
            for (int i=0; i<responseArray.length(); i++){
                JSONObject commitDetails = new JSONObject();
                JSONObject commitObject = responseArray.getJSONObject(i);
                JSONObject commitInfoObject = commitObject.getJSONObject("commit");
                JSONObject authorInfoObject = commitInfoObject.getJSONObject("author");
                String nameOfAuthor = authorInfoObject.getString("name");
                commitDetails.put("nameOfAuthor", nameOfAuthor);

                String commitTime = authorInfoObject.getString("date");
                commitDetails.put("commitTime", commitTime);

                String commitMessage = commitInfoObject.getString("message");
                commitDetails.put("commitMessage", commitMessage);

                String commitURL = commitInfoObject.getString("url");
                commitDetails.put("commitURL", commitURL);
                resultList.add(commitDetails);
            }
            result.put("CommitDetails", resultList);
        }catch (Exception e){
            result.put("Error", e);
        }
        System.out.println("response==== = = = " + response.getBody());
        return result.toString();
    }
}
