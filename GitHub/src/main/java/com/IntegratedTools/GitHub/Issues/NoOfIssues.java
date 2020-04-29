package com.IntegratedTools.GitHub.Issues;

import com.IntegratedTools.GitHub.Constants.Constants;
import com.IntegratedTools.GitHub.HttpConnectionAndResponseHandler.HttpConnectionAndResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/integratedTools/github")
public class NoOfIssues extends Constants {

    @Autowired
    static HttpConnectionAndResponseHandler httpConnectionAndResponseHandler;

    @GetMapping("/noOfIssues/{userName}/{repoName}")
    private static int getNoOfGitHubIssues(@PathVariable("userName") final String user_name, @PathVariable("repoName") String repo_name) throws IOException {
        String URLGitHubIssues = BASE_URL + "repos/" + user_name + '/' + repo_name + "/issues";
        List<Integer> list = new ArrayList<>();

        HttpURLConnection httpcon = httpConnectionAndResponseHandler.getHttpURLConnection(URLGitHubIssues);
        StringBuilder responseSB = httpConnectionAndResponseHandler.getResponseSB(httpcon);

        Arrays.stream(responseSB.toString().split("\"number\":")).skip(1).mapToInt(l -> Integer.parseInt(l.split(",")[0])).forEach(l -> list.add(l));

        return list.get(0);

        //OptionalInt total = Arrays.stream(responseSB.toString().split("\"number\":")).skip(1).mapToInt(l -> Integer.parseInt(l.split(",")[0])).max();
        //System.out.println("\nTotal numbers: " + total);
    }

    @GetMapping("/IssueDetails/{userName}/{repoName}")
    private static List<String> getGitHubIssuesDescription(@PathVariable("userName") final String user_name, @PathVariable("repoName") String repo_name) throws IOException {
        String URLGitHubIssues = BASE_URL + "repos/" + user_name + '/' + repo_name + "/issues";
        List<String> list1 = new ArrayList<>();

        HttpURLConnection httpcon = httpConnectionAndResponseHandler.getHttpURLConnection(URLGitHubIssues);
        StringBuilder responseSB = httpConnectionAndResponseHandler.getResponseSB(httpcon);

//        System.out.println("----------------------------------");
        Arrays.stream(responseSB.toString().split("\"body\":")).skip(1).map(l -> l.split("}")[0]).forEach(l -> list1.add(l));

//        for (String line: list1)
//            System.out.println(line);

        return list1;
    }
}
