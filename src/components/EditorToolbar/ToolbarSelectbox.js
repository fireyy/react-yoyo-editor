import React, { Component } from "react";
import styled from 'styled-components';
import { ToolbarDiv, ToolbarLayout, ToolbarLabel, ToolbarSelect } from './ToolbarBase';
import { connectProperty } from "utils/PropertyConnectorUtils";

class ToolbarSelectbox extends Component {
  renderOption = optionCode => (
    <option value={optionCode} key={optionCode}>
      {this.props.options[optionCode]}
    </option>
  );

  render() {
    const { label, value, options } = this.props;

    return (
      <ToolbarDiv>
        <ToolbarLayout htmlFor={this.id}>
          <ToolbarLabel>{label}</ToolbarLabel>
          <ToolbarSelect
            id={this.id}
            value={value}
            onChange={this.props.onChange}
          >
            {Object.keys(options).map(this.renderOption)}
          </ToolbarSelect>
        </ToolbarLayout>
      </ToolbarDiv>
    );
  }
}

export default connectProperty(ToolbarSelectbox);
