import React, { Component } from "react";
import styled from "styled-components";
import {
  ToolbarDiv,
  ToolbarLayout,
  ToolbarLabel
} from "./ToolbarBase";
import { connectProperty } from "utils/PropertyConnectorUtils";

class ToolbarTextbox extends Component {
  render() {
    const { label, type = "text" } = this.props;

    return (
      <ToolbarDiv>
        <ToolbarLayout htmlFor={this.id}>
          <ToolbarLabel>{label}</ToolbarLabel>
          <div>
            {this.props.value}
          </div>
        </ToolbarLayout>
      </ToolbarDiv>
    );
  }
}

export default connectProperty(ToolbarTextbox);
