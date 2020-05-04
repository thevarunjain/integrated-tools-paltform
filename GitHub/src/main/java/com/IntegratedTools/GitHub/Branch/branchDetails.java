package com.IntegratedTools.GitHub.Branch;

import com.IntegratedTools.GitHub.Constants.Constants;
import com.IntegratedTools.GitHub.HttpConnectionAndResponseHandler.HttpConnectionAndResponseHandler;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/github")
public class branchDetails extends Constants {

    @Autowired
    private static HttpConnectionAndResponseHandler httpConnectionAndResponseHandler;

    @GetMapping("/branch/{userName}/{repoName}")
    private static String getBranchDetails(@PathVariable("userName") final String user_name, @PathVariable("repoName") String repo_name) throws IOException {
        String URLGitHubIssues = BASE_URL + "repos/" + user_name + '/' + repo_name + "/branches";

        HttpResponse<JsonNode> response = HttpConnectionAndResponseHandler.getHttpResponse(URLGitHubIssues);

        JSONObject result = new JSONObject();
        try{
            JSONArray responseArray = response.getBody().getArray();
            List<JSONObject> resultList = new ArrayList<>();
            for (int i=0; i<responseArray.length(); i++){
                JSONObject branchDetails = new JSONObject();
                JSONObject branchObject = responseArray.getJSONObject(i);

                String branchName = branchObject.getString("name");
                branchDetails.put("branchName", branchName);

                JSONObject branchCommitObject = branchObject.getJSONObject("commit");
                String branchCommitUrl = branchCommitObject.getString("url");
                branchDetails.put("branchCommitUrl", branchCommitUrl);
                resultList.add(branchDetails);
            }
            result.put("branchDetails", resultList);
        }catch (Exception e){
            result.put("Error", e);
        }
        System.out.println("response==== = = = " + response.getBody());
        return result.toString();
    }
}
