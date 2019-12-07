package com.IntegratedTools.GitHub.Downloads;

import com.IntegratedTools.GitHub.Constants.Constants;
import com.IntegratedTools.GitHub.HttpConnectionAndResponseHandler.HttpConnectionAndResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.Arrays;

@RestController
@RequestMapping("/integratedTools/github")
public class NoOfDownloads extends Constants{

    @Autowired
    static HttpConnectionAndResponseHandler httpConnectionAndResponseHandler;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/noOfDownloads/{userName}/{repoName}")
    public static int getDownloads(@PathVariable("userName") final String user_name, @PathVariable("repoName") String repo_name) throws IOException {
        //Initialize constants
        String URLDownload = BASE_URL+"repos/" + user_name + '/' + repo_name +"/releases";

        HttpURLConnection httpcon = httpConnectionAndResponseHandler.getHttpURLConnection(URLDownload);

        StringBuilder responseSB = httpConnectionAndResponseHandler.getResponseSB(httpcon);

        //Get Git Hub Downloads of XR3Player
        //Arrays.stream(responseSB.toString().split("\"download_count\":")).skip(1).map(l -> l.split(",")[0]).forEach(l -> System.out.println(l));

        //Sum up all download counts
        int total = Arrays.stream(responseSB.toString().split("\"download_count\":")).skip(1).mapToInt(l -> Integer.parseInt(l.split(",")[0])).sum();
        System.out.println("\nTotal Downloads: " + total);

        return total;
    }
}
