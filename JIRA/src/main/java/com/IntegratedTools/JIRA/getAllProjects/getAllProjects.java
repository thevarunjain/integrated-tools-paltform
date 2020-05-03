package com.IntegratedTools.JIRA.getAllProjects;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@CrossOrigin
@RestController
@RequestMapping("/integratedTools/JIRA")
public class getAllProjects {

    @GetMapping("/allProjectDetails")
    private static List<String> getAllProjectDetails() {
        //Get all the Project details and scrap the project names.
        String URLJIRAIssues = "https://abhijira911.atlassian.net/rest/api/3/project";

        HttpResponse<JsonNode> response = Unirest.get(URLJIRAIssues)
                .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                .header("Accept", "application/json")
                .asJson();

        JSONObject obj = response.getBody().getObject();

        List<String> list = getValuesForGivenKey(response.getBody().toString(), "name");

        System.out.println("names = " +list);

        System.out.println("response body is ======================= " + response.getBody());
        return list;
    }

    public static List<String> getValuesForGivenKey(String jsonArrayStr, String key) {
        JSONArray jsonArray = new JSONArray(jsonArrayStr);
        return IntStream.range(0, jsonArray.length())
                .mapToObj(index -> ((JSONObject)jsonArray.get(index)).optString(key))
                .collect(Collectors.toList());
    }
}
