package com.IntegratedTools.JIRA.Issue;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/integratedTools/JIRA")
public class Issue {

    @GetMapping("/IssueDetails")
    private static String getJiraIssueDetails(){
        String URLJIRAIssues = "https://abhijira911.atlassian.net/rest/agile/1.0/issue/ID-2";
        List<String> list1 = new ArrayList<>();
        List<String> list2 = new ArrayList<>();

        HttpResponse<JsonNode> response = Unirest.get(URLJIRAIssues)
                .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                .header("Accept", "application/json")
                .asJson();

        System.out.println(response.getBody());

        Arrays.stream(response.getBody().toString().split("\"sprint\":")).skip(1).map(l -> l.split("}")[0]).forEach(l -> list1.add(l));
        Arrays.stream(list1.get(0).split("\"name\":")).skip(1).map(l -> l.split(",")[0]).forEach(l -> list2.add(l));

        System.out.println(list1.get(0));
        return list2.get(0);
    }




}
