package com.IntegratedTools.JIRA.getActiveSprint;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@CrossOrigin
@RestController
@RequestMapping("/integratedTools/JIRA")
public class getActiveSprints {

    @GetMapping("/ActiveSprintDetails/{boardId}")
    private static String getActiveSprintDetails(@PathVariable("boardId") final String board_id) {
        //Get board id first and then active sprint from that.
        //Replace 1 with the board id to lose couple
        String URLJIRAIssues = "https://abhijira911.atlassian.net/rest/agile/1.0/board/" + board_id + "/sprint?state=active";

        HttpResponse<JsonNode> response = Unirest.get(URLJIRAIssues)
                .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                .header("Accept", "application/json")
                .asJson();

        System.out.println("Response is =========" + response.getBody());
        JSONObject result = new JSONObject();
        try {
            JSONObject responseObject = response.getBody().getObject();
            if (responseObject.has("values")) {
                JSONArray valuesArray = responseObject.getJSONArray("values");
                List<JSONObject> allSprints = new ArrayList<>();
                if (valuesArray.length() > 0) {
                    for (int i = 0; i < valuesArray.length(); i++) {
                        JSONObject sprintDetails = new JSONObject();
                        JSONObject valuesObject = valuesArray.getJSONObject(i);
                        sprintDetails.put("sprintId", valuesObject.getString("id"));
                        sprintDetails.put("originBoardId", valuesObject.getString("originBoardId"));
                        sprintDetails.put("nameOfSprint", valuesObject.getString("name"));
                        allSprints.add(sprintDetails);
                    }
                } else {
                    return "No Sprint present for the selected board";
                }
                result.put("sprintDetails", allSprints);
            }else{
                return "No such board present";
            }
            System.out.println("Response is =========" + response.getBody());
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
