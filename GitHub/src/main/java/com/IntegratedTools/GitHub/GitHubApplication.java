package com.IntegratedTools.GitHub;

import com.IntegratedTools.GitHub.Issues.IssueDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class GitHubApplication {

	@Autowired
	static IssueDetails issues;

	public static void main(String[] args) throws IOException {
		SpringApplication.run(GitHubApplication.class, args);
	}

}
