import React, { Component } from "react";
import styled from 'styled-components';
import theme from 'themes/index';

const ToolbarSectionDiv = styled.div`
  font-family: "sans-serif";
  background-color: ${theme.colors.primary};
  padding-bottom: 2px;
`;

const ToolbarSectionLabel = styled.div`
  text-transform: uppercase;
  color: ${theme.colors.text};
  letter-spacing: 1px;
  font-weight: normal;
  user-select: none;
  font-size: 11px;
  display: block;
  padding: 15px 10px;
  margin: 0;
`;

const ToolbarSectionContent = styled.div`
  background-color: ${theme.colors.background};
  box-sizing: border-box;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  display: block;
  padding: 10px;
  margin: 0 2px;
`;

class ToolbarSection extends Component {
  render() {
    return (
      <ToolbarSectionDiv>
        <ToolbarSectionLabel>{this.props.label}</ToolbarSectionLabel>
        <ToolbarSectionContent>{this.props.children}</ToolbarSectionContent>
      </ToolbarSectionDiv>
    );
  }
}

export default ToolbarSection;
