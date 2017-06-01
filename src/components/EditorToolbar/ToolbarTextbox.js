import React, { Component } from "react";
import styled from "styled-components";
import {
  ToolbarDiv,
  ToolbarLayout,
  ToolbarLabel,
  ToolbarInput
} from "./ToolbarBase";
import { connectProperty } from "utils/PropertyConnectorUtils";

class ToolbarTextbox extends Component {
  render() {
    const { label, type = "text" } = this.props;

    return (
      <ToolbarDiv>
        <ToolbarLayout htmlFor={this.id}>
          <ToolbarLabel>{label}</ToolbarLabel>
          <ToolbarInput
            id={this.id}
            type={type}
            onChange={this.props.onChange}
            value={this.props.value}
          />
        </ToolbarLayout>
      </ToolbarDiv>
    );
  }
}

export default connectProperty(ToolbarTextbox);
