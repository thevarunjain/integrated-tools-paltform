import React, { Component } from "react";
import { Collapse } from "antd";
import axios from "axios";

const { Panel } = Collapse;

export default class DetailsGit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { branchDetails, allIssues, commitHistory } = this.props;
    console.log("All commits:", commitHistory);

    let branchesInfo = allIssues.map((issue, index) => {
      let branches = [];
      branchDetails.map((branch, idx) => {
        if (issue.keyAssociatedWithIssue === branch.issueId) {
          branches.push(branch.branches);
        }
      });

      return (
        <Collapse defaultActiveKey="0">
          <Panel header={issue.nameOfIssue} key={index}>
            {branches.map((b, i) => {
              console.log("br is: ", b);
              return b.map((br, id) => {
                return (
                  <Collapse defaultActiveKey="0" key={id}>
                    <Panel header={br.nameOfBranch}>
                      <p>Repository: {br.nameOfRepository}</p>
                      <p>Latest Commit Id: {br.lastCommitId}</p>
                      <p>Author of Commit: {br.authorOfCommit}</p>
                    </Panel>
                  </Collapse>
                );
              });
            })}
          </Panel>
        </Collapse>
      );
    });

    let commitsInfo = allIssues.map((issue, index) => {
      let commits = [];
      commitHistory.map((commit, idx) => {
        if (issue.keyAssociatedWithIssue === commit.issueId) {
          console.log("commit is: ", commit);
          commits.push(commit.commits);
        }
      });
      return (
        <Collapse defaultActiveKey="0">
          <Panel header={issue.nameOfIssue} key={index}>
            {commits.map((c, i) => {
              return c.map((cr, id) => {
                return (
                  <Collapse defaultActiveKey="0" key={id}>
                    <Panel header={cr.message}>
                      <p>
                        URL:{" "}
                        <a target="blank" href={cr.url}>
                          {cr.url}
                        </a>
                      </p>
                      <p>
                        Github Link:{" "}
                        <a target="blank" href={cr.githubLink}>
                          {cr.githubLink}
                        </a>
                      </p>
                      <p>Name: {cr.name}</p>
                    </Panel>
                  </Collapse>
                );
              });
            })}
          </Panel>
        </Collapse>
      );
    });

    // if (sprints.length !== 0) {
    //   sprintsContent = sprints.map((sprint, index) => {
    //     let issues = sprint.issues;
    //     console.log("Sprint in map is: ", sprint);
    //     return (
    //       <Collapse accordion defaultActiveKey="0">
    //         <Panel header={sprint.nameOfSprint} key={index}>
    //           {issues.map((issue, idx) => {
    //             return (
    //               <Collapse defaultActiveKey="0">
    //                 <Panel header={issue.nameOfIssue} key={idx}>
    //                   <p>Issue description {idx}</p>
    //                 </Panel>
    //               </Collapse>
    //             );
    //           })}
    //         </Panel>
    //       </Collapse>
    //     );
    //   });
    // }

    return (
      <div id="viewBarChart" className="pane">
        <div className="header">GitHub branches and Repository Information</div>
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          {branchesInfo}
        </div>
        <div className="header" style={{ marginTop: "20px" }}>
          GitHub Commit History
        </div>
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          {commitsInfo}
        </div>
      </div>
    );
  }
}
