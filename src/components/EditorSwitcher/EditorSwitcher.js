import React, { Component } from "react";
import styled from 'styled-components';
import theme from "themes/index";

const EditorSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EditorSwitcherButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  outline: none;
  font-family: "sans-serif";
  font-size: 14px;
  cursor: ${props => (props.active) ? 'default' : 'pointer'};
  user-select: none;
  color: #777;
  &:hover {
    color: ${props => (props.active) ? '#777' : '#4281f4'};
  }
`;

const EditorSwitcherToggle = styled.div`
  border-width: 2px;
  border-style: solid;
  border-color: rgba(68, 68, 68, 0.5);
  border-radius: 20px;
  margin-left: 6px;
  margin-right: 6px;
  position: relative;
  height: 12px;
  width: 40px;
  ${props => (props.toggled) ? 'border-color: ' + theme.colors.primary : ''}
`;

const EditorSwitcherBullet = styled.div`
  transition: margin 200ms ease;
  background-color: rgba(68, 68, 68, 0.4);
  box-sizing: border-box;
  border-radius: 12px;
  display: block;
  width: 10px;
  height: 10px;
  margin-top: 1px;
  margin-left: 28px;
  ${props => (props.toggled) ? 'background-color: ' + theme.colors.primary + '; margin-left: 2px' : ''}
`;

class EditorSwitcher extends Component {
  static defaultProps = {
    toggled: false,
    leftLabel: "编辑模式",
    rightLabel: "预览模式"
  };

  onToggle = state => {
    this.props.onToggle(state);
  };

  onSwitchOn = () => {
    this.onToggle(true);
  };

  onSwitchOff = () => {
    this.onToggle(false);
  };

  render() {
    const { toggled } = this.props;

    return (
      <EditorSwitcherWrapper>
        <EditorSwitcherButton
          onClick={this.onSwitchOn}
          active={toggled}
          key="leftLabel"
        >
          {this.props.leftLabel}
        </EditorSwitcherButton>
        <EditorSwitcherToggle toggled={toggled}>
          <EditorSwitcherBullet toggled={toggled} />
        </EditorSwitcherToggle>
        <EditorSwitcherButton
          onClick={this.onSwitchOff}
          active={!toggled}
          key="rightLabel"
        >
          {this.props.rightLabel}
        </EditorSwitcherButton>
      </EditorSwitcherWrapper>
    );
  }
}

export default EditorSwitcher;
