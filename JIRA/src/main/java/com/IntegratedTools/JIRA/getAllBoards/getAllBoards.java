package com.IntegratedTools.JIRA.getAllBoards;

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
public class getAllBoards {

    @GetMapping("/allBoardDetails")
    private static String getAllBoardDetails() {
        //Get all the board details and scrap all the board names from the response.
        String URLJIRAIssues = "https://abhijira911.atlassian.net/rest/agile/1.0/board";

        HttpResponse<JsonNode> response = Unirest.get(URLJIRAIssues)
                .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                .header("Accept", "application/json")
                .asJson();

        JSONObject result = new JSONObject();

        try {
            JSONObject responseObject = response.getBody().getObject();
            JSONArray valuesArray = responseObject.getJSONArray("values");
            List<JSONObject> boardDetails = new ArrayList<>();
            for (int i=0; i<valuesArray.length(); i++){
                JSONObject boardDetailsObject = new JSONObject();
                JSONObject valuesObject = valuesArray.getJSONObject(i);
                if (valuesObject.has("name")){
                    boardDetailsObject.put("boardId", valuesObject.getString("id"));
                    boardDetailsObject.put("nameOfTheBoard ",valuesObject.getString("name"));
                    boardDetailsObject.put("typeOfBoard", valuesObject.getString("type"));

                    JSONObject locationObject = valuesObject.getJSONObject("location");
                    boardDetailsObject.put("nameOfTheProject", locationObject.getString("projectName"));
                }else{
                    return "No boards present";
                }
                boardDetails.add(boardDetailsObject);
            }
//            JSONArray jsonarray = obj1.getJSONArray("values");
//            List<String> list = getValuesForGivenKey(jsonarray.toString(), "name");
            result.put("detailsOfBoardsPresent", boardDetails);
            System.out.println("response body is ======================= " + response.getBody());
        }catch (Exception e){
            result.put("Error", e);
        }
        return result.toString();

    }
    public static List<String> getValuesForGivenKey(String jsonArrayStr, String key) {
        JSONArray jsonArray = new JSONArray(jsonArrayStr);
        return IntStream.range(0, jsonArray.length())
                .mapToObj(index -> ((JSONObject)jsonArray.get(index)).optString(key))
                .collect(Collectors.toList());
    }
}
