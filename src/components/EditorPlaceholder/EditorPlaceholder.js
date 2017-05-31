import React, { Component } from "react";
import styled from 'styled-components';
import theme from "themes/index";
import StyleConstants from "constants/StyleConstants";

const EditorPlaceholderWrapper = styled.div`
  transition: top 100ms ease, left 100ms ease, width 100ms ease;
  animation: ${StyleConstants.PULSE_ANIMATION_NAME} 1s infinite;
  position: absolute;
  pointer-events: none;
  text-align: center;
  user-select: none;
`;

const EditorPlaceholderHr = styled.hr`
  display: block;
  background-color: ${theme.colors.primary};
  width: 100%;
  border: none;
  padding: 0;
  margin: 0;
  height: ${theme.border.width}
`;

const EditorPlaceholderArrow = styled.span`
  border-style: solid;
  border-color: rgba(66, 129, 244, 0);
  border-width: ${theme.border.arrowSize};
  position: absolute;
  margin-top: ${-1 * theme.border.arrowSize};
  top: 50%;
  content: "";
  height: 0;
  width: 0;
  ${props => (props.border === "left") ? "border-left-color: " + theme.colors.primary + "; left: 0;" : "border-right-color: " + theme.colors.primary + "; right: 0;"};
`;

class EditorPlaceholder extends Component {
  render() {
    const positionAndSize = {
      left: this.props.x,
      top: this.props.y,
      width: this.props.width
    };

    return (
      <EditorPlaceholderWrapper style={positionAndSize}>
        <EditorPlaceholderArrow border="left" />
        <EditorPlaceholderHr />
        <EditorPlaceholderArrow border="right" />
      </EditorPlaceholderWrapper>
    );
  }
}

export default EditorPlaceholder;
