import React, { Component } from "react";
import styled from 'styled-components';
import themes from 'themes/index';

const ToolbarDraggableItem = styled.div`
  user-select: none;
  font-size: 12px;
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  border-radius: 2px;
  cursor: pointer;
  padding-left: 26px;
  transition: box-shadow 100ms ease;
  box-sizing: border-box;
  position: relative;
  ${props => (props.draggable) && 'cursor: -webkit-grab;'}
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.075);
  }
`;

const textShadow = `
  0 5px ${themes.icon.color},
  0 10px ${themes.icon.color},
  5px 0 ${themes.icon.color},
  10px 0 ${themes.icon.color},
  10px 5px ${themes.icon.color},
  5px 5px ${themes.icon.color},
  5px 10px ${themes.icon.color},
  10px 10px ${themes.icon.color}
`;

const ToolbarDraggableItemIcon = styled.span`
  color: ${themes.icon.color};
  position: absolute;
  font-family: "serif",
  font-size: 8px;
  left: 6px;
  top: 6px;
  text-shadow: ${textShadow};
`;

export default class myComponent extends Component {
  render() {
    return (
      <ToolbarDraggableItem
        draggable={this.props.draggable}
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
      >
        <ToolbarDraggableItemIcon aria-hidden="true">•</ToolbarDraggableItemIcon>
        {this.props.children}
      </ToolbarDraggableItem>
    );
  }
};
