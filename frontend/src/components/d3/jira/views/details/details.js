import React, { Component } from "react";
import { Collapse } from "antd";
import axios from "axios";

const { Panel } = Collapse;

export default class DetailsJIRA extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { jiraAllBoards, activeBoard } = this.props;
    let boardOptions = jiraAllBoards.map((board, index) => {
      return (
        <option value={board.boardId} key={index}>
          {board.nameOfTheBoard}
        </option>
      );
    });

    let mainContent = (
      <div style={{ padding: "6px" }}>"No sprints available."</div>
    );

    if (activeBoard !== "") {
      mainContent = jiraAllBoards.map((board, index) => {
        let sprintsInfo = "No active sprints.";
        if (board.sprints) {
          sprintsInfo = board.sprints.map((sprint, idx) => {
            let issuesInfo = "No issues available.";
            if (sprint.issues) {
              issuesInfo = sprint.issues.map((issue, i) => {
                let commitsInfo = "No commit history available.";
                let branchesInfo = "No branches information available.";
                if (issue.commits) {
                  commitsInfo = issue.commits.map((commit, ci) => {
                    console.log("Single commit info is: ", commit);
                    return (
                      <div key={ci}>
                        <p>
                          Github Link:{" "}
                          <a target="blank" href={commit.githubLink}>
                            Go
                          </a>
                        </p>
                        <p>Commit ID: {commit.id}</p>
                        <p>Commit Message: {commit.message}</p>
                        <p>Commit by: {commit.name}</p>
                        <p>
                          Commit URL:{" "}
                          <a href={commit.url} target="blank">
                            Go
                          </a>
                        </p>
                      </div>
                    );
                  });
                }

                if (issue.branchesDetails) {
                  branchesInfo = issue.branchesDetails.map((branch, bi) => {
                    return (
                      <div key={bi}>
                        <p>Author of Commit: {branch.authorOfCommit}</p>
                        <p>Last Commit ID: {branch.lastCommitId}</p>
                        <p>Branch Name: {branch.nameOfBranch}</p>
                        <p>Repository Name: {branch.nameOfRepository}</p>
                      </div>
                    );
                  });
                }
                return (
                  <Collapse style={{ fontSize: "20px" }} accordion>
                    <Panel header={"Issue: " + issue.nameOfIssue} key={i}>
                      <p>Priority: {issue.priority}</p>
                      <br />
                      <p>Assignee: {issue.creatorName}</p>
                      <br />
                      <p>Status: {issue.statusName}</p>
                      <br />
                      <p>Story Points: {issue.storyPoints}</p>
                      <br />
                      <h5
                        style={{
                          fontWeight: "600",
                          textDecoration: "underline",
                          color: "white",
                          background: "#282c34",
                          padding: "6px",
                          borderRadius: "10px",
                        }}
                      >
                        DEVELOPMENT SECTION:
                      </h5>
                      <br />
                      <p style={{ color: "#508BC6" }}>
                        Github branches information
                      </p>
                      {branchesInfo}
                      <br />
                      <p style={{ marginTop: "20px", color: "#508BC6" }}>
                        Github commit history
                      </p>
                      {commitsInfo}
                    </Panel>
                  </Collapse>
                );
              });
            }
            return (
              <Collapse style={{ fontSize: "20px" }} accordion>
                <Panel header={"Sprint: " + sprint.nameOfSprint} key={idx}>
                  {issuesInfo}
                </Panel>
              </Collapse>
            );
          });
        }
        return <div key={index}>{sprintsInfo}</div>;
      });
    }

    return (
      <div id="viewBarChart" className="pane">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "justify-center",
            alignItems: "center",
            marginBottom: "10px",
            padding: "20px",
          }}
        >
          <div>
            <h6>Select JIRA Board: </h6>
          </div>
          <select
            style={{ height: "30px", marginLeft: "9px", width: "200px" }}
            onChange={this.props.handleBoardChange}
            value={activeBoard}
          >
            <option value="" defaultChecked>
              Select Board
            </option>
            {boardOptions}
          </select>
        </div>
        <div className="header">Active Sprints in JIRA</div>
        <div style={{ overflow: "scroll" }}>{mainContent}</div>
      </div>
    );
  }
}
