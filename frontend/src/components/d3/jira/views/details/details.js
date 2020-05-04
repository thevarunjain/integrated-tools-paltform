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
    const { data, selectedProject, sprints, activeBoard } = this.props;
    let boards = data;
    let boardOptions = boards.map((board, index) => {
      return (
        <option value={board.boardId} key={index}>
          {board.nameOfTheBoard}
        </option>
      );
    });

    let sprintsContent = "No sprints available.";

    if (sprints.length !== 0) {
      sprintsContent = sprints.map((sprint, index) => {
        let issues = sprint.issues;
        console.log("Sprint in map is: ", sprint);
        return (
          <Collapse accordion defaultActiveKey="0">
            <Panel header={sprint.nameOfSprint} key={index}>
              {issues.map((issue, idx) => {
                return (
                  <Collapse defaultActiveKey="0">
                    <Panel header={issue.nameOfIssue} key={idx}>
                      <p>Issue description {idx}</p>
                    </Panel>
                  </Collapse>
                );
              })}
            </Panel>
          </Collapse>
        );
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
            style={{ height: "30px", marginLeft: "9px" }}
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
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          {sprintsContent}
        </div>
      </div>
    );
  }
}
