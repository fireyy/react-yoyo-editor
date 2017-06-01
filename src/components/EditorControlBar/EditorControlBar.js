import React, { Component } from "react";
import styled from 'styled-components';
import { getElementBox } from "utils/ElementBoxUtils";
import ControlBarColumn from "./ControlBarColumn";
import ControlPlaceholder from "./ControlPlaceholder";
import theme from "themes/index";
import {
  MdAdd,
  MdArrowUpward,
  MdClose,
  MdKeyboardArrowDown,
  MdOpenWith,
  MdSettings
} from "react-icons/lib/md";

const iconProps = {
  size: 14,
  color: theme.colors.primary,
  style: {
    verticalAlign: "text-top"
  }
};

const ControlBarWrapper = styled.div`
  transform: translateZ(0);
  transition: opacity 200ms ease;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  pointer-events: none;
  position: absolute;
  user-select: none;
  margin-top: -32px;
  height: 32px;
  opacity: ${props => props.visible ? 1 : 0};
  ${props => props.visible && 'z-index: 9999;'};
`;

const ControlBarInner = styled.div`
  display: flex;
  align-items: center;
  transition: top 0.2s ease;
  position: relative;
  height: inherit;
  width: inherit;
  bottom: -10px;
`;

const ControlButton = styled.button`
  transition: background-color 200ms ease, box-shadow 200ms ease;
  color: ${theme.colors.primary};
  white-space: nowrap;
  font-size: 11px;
  text-transform: uppercase;
  display: block;
  pointer-events: initial;
  border: 1px solid ${theme.colors.primary};
  background-color: ${theme.colors.background};
  min-width: 22px;
  height: 22px;
  line-height: 1;
  box-sizing: border-box;
  border-radius: 2px;
  margin: 0;
  cursor: pointer;
  ${props => (props.roundedLeft) && 'border-left-width: 0; border-radius: 0 2px 2px 0;'};
  ${props => (props.roundedRight) && 'border-right-width: 0; border-radius: 2px 0 0 2px;'};
  &:hover {
    background-color: ${theme.colors.backgroundHover};
  }
`;

const DragButton = styled(ControlButton)`
  cursor: -webkit-grab;
  width: 60px;
  text-align: center;
`;

const AcceptsUl = styled.ul`
  border: 1px solid ${theme.colors.primary};
  border-top: 0;
  background-color: ${theme.colors.background};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  pointer-events: none;
  position: absolute;
  top: 21px;
  right: 0;
  margin: 0;
  padding: 0;
  box-sizing: border;
  list-style: none;
  user-select: none;
  border-radius: 0 0 2px 2px;
  opacity: ${props => props.visible ? 1 : 0};
  ${props => props.visible && 'z-index: 9999;'};
  > li {
    padding: 0 5px;
  }
`;

class ControlBar extends Component {
  static defaultProps = {
    visible: false,
    canDrag: true,
    canRemove: true
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      acceptVisible: false
    };
  }

  onInspect = event => {
    this.preventFocusLoss(event);
    this.props.onInspect();
  };

  onDragStart = event => {
    event.preventDefault();
    this.props.onDragStart();
  };

  onAdd = event => {
    this.preventFocusLoss(event);
    this.setState({
      acceptVisible: !this.state.acceptVisible
    });
    // this.props.onAdd();
  };

  onRemove = event => {
    this.preventFocusLoss(event);
    this.props.onRemove();
  };

  onControlMouseOver = () => {
    this.props.targetRef.focus();
  };

  preventFocusLoss = event => {
    event.preventDefault();
    this.props.targetRef.focus();
  };

  renderLeftControls() {
    const { canGoUp, onUp, label, parentLabel } = this.props;

    return (
      <ControlBarColumn align="left">
        <ControlPlaceholder onMouseOver={this.onControlMouseOver}>
          {canGoUp &&
            <ControlButton
              roundedRight={true}
              onMouseDown={onUp}
              key="upAction"
            >
              <MdArrowUpward {...iconProps} /> {parentLabel}
            </ControlButton>}
          <ControlButton
            roundedLeft={canGoUp}
            roundedRight={true}
            onMouseDown={this.onInspect}
            key="inspectAction"
          >
            <MdSettings {...iconProps} /> {label}
          </ControlButton>
          <ControlButton
            roundedLeft={true}
            onMouseDown={this.onAdd}
            key="addAction"
          >
            <MdAdd {...iconProps} /> 添加
          </ControlButton>
          <AcceptsUl visible={this.state.acceptVisible}>
            {this.props.yoyoObj.accepts.map(component => (
              <li
                key={component._yoyo.label}
                draggable={false}
                onDragStart={() => {}}
                onDragEnd={() => {}}
              >
                {component._yoyo.label}
              </li>
            ))}
          </AcceptsUl>
        </ControlPlaceholder>
      </ControlBarColumn>
    );
  }

  renderMiddleControls() {
    return (
      this.props.canDrag &&
      <ControlBarColumn align="center">
        <ControlPlaceholder onMouseOver={this.onControlMouseOver}>
          <DragButton
            onMouseDown={this.props.onDragStart}
            draggable
            key="dragAction"
          >
            <MdOpenWith {...iconProps} size="14" /> 移动
          </DragButton>
        </ControlPlaceholder>
      </ControlBarColumn>
    );
  }

  renderRightControls() {
    return (
      this.props.canRemove &&
      <ControlBarColumn align="right">
        <ControlPlaceholder onMouseOver={this.onControlMouseOver}>
          <ControlButton
            onMouseDown={this.onRemove}
            key="removeAction"
          >
            <MdClose {...iconProps} />
          </ControlButton>
        </ControlPlaceholder>
      </ControlBarColumn>
    );
  }

  render() {
    const { top, left, width } = getElementBox(this.props.targetRef);
    const position = { top, left, width };

    return (
      <ControlBarWrapper visible={this.props.visible} style={position}>
        <ControlBarInner>
          {this.renderLeftControls()}
          {this.renderMiddleControls()}
          {this.renderRightControls()}
        </ControlBarInner>
      </ControlBarWrapper>
    );
  }
}

export default ControlBar;
