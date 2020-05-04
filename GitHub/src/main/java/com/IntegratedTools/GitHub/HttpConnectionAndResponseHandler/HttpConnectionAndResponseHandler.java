package com.IntegratedTools.GitHub.HttpConnectionAndResponseHandler;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class HttpConnectionAndResponseHandler {

    public static StringBuilder getResponseSB(HttpURLConnection httpcon) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(httpcon.getInputStream()));

        //Read line by line
        StringBuilder responseSB = new StringBuilder();
        String line;
        while ( ( line = in.readLine() ) != null) {
            responseSB.append("\n" + line);
            System.out.println("\n" + line);
        }
        in.close();
        return responseSB;
    }

    public static HttpURLConnection getHttpURLConnection(String URLDownload) throws IOException {
        //Create HttpURLConnection
        HttpURLConnection httpcon = (HttpURLConnection) new URL(URLDownload).openConnection();
        httpcon.addRequestProperty("User-Agent", "Mozilla/5.0");
        return httpcon;
    }

    public static HttpResponse<JsonNode> getHttpResponse(String URLGitHubIssues){
        HttpResponse<JsonNode> response = Unirest.get(URLGitHubIssues)
                .basicAuth("abhishekkonduri911@gmail.com","5f2ebddd0afca7f742ad98e899def977c90aceb6")
                .header("Accept", "application/json")
                .asJson();

        return response;
    }

}
