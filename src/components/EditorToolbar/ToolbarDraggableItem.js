import React, { Component } from "react";
import styled from 'styled-components';
import themes from 'themes/index';

const ToolbarDraggableItem = styled.div`
  user-select: none;
  font-size: 12px;
  padding: 8px;
  border-radius: 2px;
  cursor: pointer;
  border: ${themes.border.width}px solid transparent;
  transition: border-color 100ms ease;
  box-sizing: border-box;
  position: relative;
  ${props => (props.draggable) && 'cursor: -webkit-grab;'}
  &:hover {
    border-color: ${themes.colors.primary};
  }
`;

export default class myComponent extends Component {
  render() {
    return (
      <ToolbarDraggableItem
        draggable={this.props.draggable}
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
      >
        {this.props.children}
      </ToolbarDraggableItem>
    );
  }
};
