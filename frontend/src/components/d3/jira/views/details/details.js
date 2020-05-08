import React, { Component } from "react";
import { Collapse } from "antd";
import axios from "axios";
import { IgrPieChartModule, IgrPieChart } from "igniteui-react-charts";
import CanvasJSReact from "../../../../../canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

IgrPieChartModule.register();

const { Panel } = Collapse;

export default class DetailsJIRA extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { jiraAllBoards, activeBoard } = this.props;
    let boardOptions = jiraAllBoards
      ? jiraAllBoards.map((board, index) => {
          return (
            <option value={board.boardId} key={index}>
              {board.nameOfTheBoard}
            </option>
          );
        })
      : "";

    let mainContent = (
      <div style={{ padding: "6px" }}>"No sprints available."</div>
    );

    if (activeBoard !== "") {
      mainContent = jiraAllBoards.map((board, index) => {
        let sprintsInfo = "No active sprints.";
        if (board.sprints) {
          sprintsInfo = board.sprints.map((sprint, idx) => {
            var optionsBar = {
              animationEnabled: true,
              exportEnabled: true,
              animationDuration: 2000,
              title: {
                text: "Story Points in Issues",
              },
              axisX: {
                title: "Issues",
                reversed: true,
              },
              axisY: {
                title: "Story Points",
                labelFormatter: this.addSymbols,
              },
              data: [
                {
                  type: "column",
                  dataPoints: [],
                },
              ],
            };
            var options = {
              animationEnabled: true,
              exportEnabled: true,
              animationDuration: 2000,
              theme: "light1", // "light1", "dark1", "dark2"
              title: {
                text: "Issue by Status",
              },
              data: [
                {
                  type: "pie",
                  indexLabel: "{label}: {y}",
                  startAngle: -90,
                  dataPoints: [],
                },
              ],
            };
            var statusToDo = 0;
            var statusInProgress = 0;
            var statusDone = 0;

            let issuesInfo = "No issues available.";
            if (sprint.issues) {
              issuesInfo = sprint.issues.map((issue, i) => {
                let dataPointsObject = {
                  y:
                    issue.storyPoints === "No Story Points assigned"
                      ? 0
                      : parseFloat(issue.storyPoints),
                  label: issue.nameOfIssue,
                };
                optionsBar.data[0].dataPoints.push(dataPointsObject);
                if (issue.statusName === "To Do") {
                  statusToDo++;
                } else if (issue.statusName === "In Progress") {
                  statusInProgress++;
                } else {
                  statusDone++;
                }

                let commitsInfo = "No commit history available.";
                let branchesInfo = "No branches information available.";
                if (issue.commits) {
                  commitsInfo = issue.commits.map((commit, ci) => {
                    return (
                      <div key={ci}>
                        <p>
                          Github Link:{" "}
                          <a target="blank" href={commit.githubLink}>
                            Click
                          </a>
                        </p>
                        <p>Commit ID: {commit.id}</p>
                        <p>Commit Message: {commit.message}</p>
                        <p>Commit by: {commit.name}</p>
                        <p>
                          Commit URL:{" "}
                          <a href={commit.url} target="blank">
                            Click
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
                      <p>
                        <span
                          style={{
                            backgroundColor: "yellow",
                            color: "black",
                            marginRight: "2px",
                          }}
                        >
                          Priority:
                        </span>{" "}
                        {issue.priority}
                      </p>
                      <p>
                        <span
                          style={{
                            backgroundColor: "yellow",
                            color: "black",
                            marginRight: "2px",
                          }}
                        >
                          Assignee:
                        </span>{" "}
                        {issue.creatorName}
                      </p>
                      <p>
                        <span
                          style={{
                            backgroundColor: "yellow",
                            color: "black",
                            marginRight: "2px",
                          }}
                        >
                          Status:
                        </span>{" "}
                        {issue.statusName}
                      </p>
                      <p>
                        <span
                          style={{
                            backgroundColor: "yellow",
                            color: "black",
                            marginRight: "2px",
                          }}
                        >
                          Story Points:
                        </span>{" "}
                        {issue.storyPoints}
                      </p>
                      <Collapse style={{ fontSize: "20px" }} accordion>
                        <Panel
                          style={{ backgroundColor: "#eee" }}
                          header={
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>Development Section:</div>
                              <div style={{ fontSize: "14px" }}>
                                {issue.commits ? issue.commits.length : 0}{" "}
                                commits{" "}
                                {issue.branchesDetails
                                  ? issue.branchesDetails.length
                                  : 0}{" "}
                                branches
                              </div>
                            </div>
                          }
                        >
                          {" "}
                          <p style={{ color: "#508BC6" }}>
                            Github branches information
                          </p>
                          {branchesInfo}
                          <br />
                          <p style={{ marginTop: "12px", color: "#508BC6" }}>
                            Github commit history
                          </p>
                          {commitsInfo}
                        </Panel>
                      </Collapse>
                    </Panel>
                  </Collapse>
                );
              });
            }

            let obj1 = {
              y: statusToDo,
              label: "To Do",
            };
            let obj2 = {
              y: statusInProgress,
              label: "In Progress",
            };
            let obj3 = {
              y: statusDone,
              label: "Done",
            };
            options.data[0].dataPoints.push(obj1);
            options.data[0].dataPoints.push(obj2);
            options.data[0].dataPoints.push(obj3);
            console.log("Graph options are: ", options);
            return (
              <Collapse style={{ fontSize: "20px" }} accordion>
                <Panel header={"Sprint: " + sprint.nameOfSprint} key={idx}>
                  {issuesInfo}
                  <div style={{ marginTop: "10px" }}></div>
                  <CanvasJSChart
                    options={options}
                    /* onRef={ref => this.chart = ref} */
                  />
                  <div style={{ marginTop: "10px" }}></div>
                  <CanvasJSChart
                    options={optionsBar}
                    /* onRef={ref => this.chart = ref} */
                  />
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
