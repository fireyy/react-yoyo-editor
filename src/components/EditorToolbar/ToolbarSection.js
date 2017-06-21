import React, { Component } from "react";
import styled, { css } from 'styled-components';
import theme from 'themes/index';

const ToolbarSectionDiv = styled.div`
  font-family: "sans-serif";
  background-color: ${theme.colors.primary};
  padding-bottom: 2px;
  width: 100%;
  ${props => props.flex && css`
    align-items: start;
    flex: 1;
    display: flex;
    flex-direction: column;
  `}
`;

const ToolbarSectionLabel = styled.div`
  text-transform: uppercase;
  color: ${theme.colors.text};
  box-sizing: border-box;
  letter-spacing: 1px;
  font-weight: normal;
  user-select: none;
  font-size: 11px;
  display: block;
  padding: 15px 10px;
  width: 100%;
  margin: 0;
`;

const ToolbarSectionContent = styled.div`
  background-color: ${theme.colors.background};
  box-sizing: border-box;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  overflow-y: auto;
  display: block;
  padding: 10px;
  width: calc(100% - 4px);
  margin: 0 2px;
  ${props => props.flex && css`
    flex: 1;
  `}
`;

class ToolbarSection extends Component {
  render() {
    return (
      <ToolbarSectionDiv flex={this.props.flex}>
        <ToolbarSectionLabel>{this.props.label}</ToolbarSectionLabel>
        <ToolbarSectionContent flex={this.props.flex}>{this.props.children}</ToolbarSectionContent>
      </ToolbarSectionDiv>
    );
  }
}

export default ToolbarSection;
