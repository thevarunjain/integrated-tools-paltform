package com.IntegratedTools.GitHub.Commits;

import com.IntegratedTools.GitHub.Constants.Constants;
import com.IntegratedTools.GitHub.HttpConnectionAndResponseHandler.HttpConnectionAndResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/integratedTools/github")
public class Commits extends Constants {

    @Autowired
    static HttpConnectionAndResponseHandler httpConnectionAndResponseHandler;

    @GetMapping("/noOfCommits/{userName}/{repoName}")
    private static int getNoOfGitHubCommits(@PathVariable("userName") final String user_name, @PathVariable("repoName") String repo_name) throws IOException {
        String URLGitHubIssues = BASE_URL + "repos/" + user_name + '/' + repo_name + "/commits";
        List<String> list = new ArrayList<>();

        HttpURLConnection httpcon = httpConnectionAndResponseHandler.getHttpURLConnection(URLGitHubIssues);
        StringBuilder responseSB = httpConnectionAndResponseHandler.getResponseSB(httpcon);

        Arrays.stream(responseSB.toString().split("\"sha\":")).skip(1).map(l -> l.split(",")[0]).forEach(l -> list.add(l));

        return (list.size()+1)/3;
    }
}
