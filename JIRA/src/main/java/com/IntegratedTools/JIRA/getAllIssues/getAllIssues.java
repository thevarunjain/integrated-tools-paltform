package com.IntegratedTools.JIRA.getAllIssues;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@CrossOrigin
@RestController
@RequestMapping("/integratedTools/JIRA")
public class getAllIssues {

    //get all the issues in an active sprint.
    @GetMapping("/allIssues/{boardId}/{sprintId}")
    private static String getAllIssuesDetailsInActiveSprint(@PathVariable("boardId") final String board_Id,
                                                            @PathVariable("sprintId") String sprint_Id) {
        //Get all the board details and scrap all the board names from the response.
        String URLJIRAIssues = "https://abhijira911.atlassian.net/rest/agile/1.0/board/" + board_Id + "/sprint/" + sprint_Id + "/issue";

        HttpResponse<JsonNode> response = Unirest.get(URLJIRAIssues)
                .basicAuth("abhishekkonduri911@gmail.com", "radi6QQvKHUd7StA7xcnE11B")
                .header("Accept", "application/json")
                .asJson();

        System.out.println("response body is ======================= " + response.getBody());
        JSONObject result = new JSONObject();

        try {
            if (response.getBody().getObject().has("issues")) {
                JSONObject responseObject = response.getBody().getObject();
                JSONArray issuesArray = responseObject.getJSONArray("issues"); //Response consists of an array of JSON objects out of which we are selecting the object issues.
                if (issuesArray.length()>0) {
                    List<JSONObject> issueDetails = new ArrayList<>();
                    //The JSON array consists of multiple JSON objects, so we iterate over each of the JSON object till we get the required JSON object.
                    for (int i = 0; i < issuesArray.length(); i++) {
                        JSONObject allIssuesInSprint = new JSONObject();
                        allIssuesInSprint.put("keyAssociatedWithIssue", issuesArray.getJSONObject(i).getString("key"));

                        if (issuesArray.getJSONObject(i).has("fields")) {
                            JSONObject fieldObjects = issuesArray.getJSONObject(i).getJSONObject("fields"); //Iterate over all objects one by one
                            //Iterating nested JSON Object.
                            String issueTitle = fieldObjects.getString("summary"); //While you iterate over the objects, the object with name "fields" will be fetched
                            allIssuesInSprint.put("nameOfIssue", issueTitle);

                            if (fieldObjects.has("priority")){
                                JSONObject priorityObject = fieldObjects.getJSONObject("priority");
                                String priorityName = priorityObject.getString("name");
                                allIssuesInSprint.put("priority", priorityName);
                            }

                            if (fieldObjects.has("assignee") && !fieldObjects.has("description")){
                                try {

                                    System.out.println(fieldObjects.getString("assignee"));
                                    JSONObject assigneeObject = fieldObjects.getJSONObject("assignee");
                                    String assigneeName = assigneeObject.getString("displayName");
                                    allIssuesInSprint.put("NameOfAssignee", assigneeName);
                                    System.out.println("Assignee ===== " + assigneeName);
                                }catch (Exception e){

                                    allIssuesInSprint.put("NameOfAssignee", "Abhishek Konduri");
                                }
                            }
                            if (fieldObjects.has("status")){
                                JSONObject statusObject = fieldObjects.getJSONObject("status");
                                String statusName = statusObject.getString("name");
                                allIssuesInSprint.put("statusName", statusName);
                            }
//                            if (fieldObjects.has("description")){
//                                if (fieldObjects.getString("description") != null) {
//                                    String description = fieldObjects.getString("description");
//                          v          allIssuesInSprint.put("descriptionOfIssue", description);
//                                }
//                            }
                            if (fieldObjects.has("creator")){
                                JSONObject creatorObject = fieldObjects.getJSONObject("creator");
                                String creatorName = creatorObject.getString("displayName");
                                allIssuesInSprint.put("creatorName", creatorName);
                            }
                            if (fieldObjects.has("customfield_10024")){
                                String storyPoints = fieldObjects.getString("customfield_10024");
                                allIssuesInSprint.put("storyPoints", storyPoints);
                            }else{
                                allIssuesInSprint.put("storyPoints", "No Story Points assigned");
                            }
                        } else {
                            return "Field object not found";
                        }
                        issueDetails.add(allIssuesInSprint);
                    }
                    result.put("allIssueDetails", issueDetails);
                }else{
                    return "No Issues present in this Board";
                }
            }else{
                return "InValid Sprint/BoardId";
            }
            System.out.println("response body is ======================= " + response.getBody());
        }catch (Exception e){
            e.printStackTrace();
            result.put("Error", e);
        }
        return result.toString();

    }
}
