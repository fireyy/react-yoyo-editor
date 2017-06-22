import React, { Component } from "react";
import styled from 'styled-components';
import { getElementBox } from "utils/ElementBoxUtils";
import ControlBarColumn from "./ControlBarColumn";
import ControlPlaceholder from "./ControlPlaceholder";
import Dropdown, { DropdownTrigger, DropdownContent } from '../Dropdown';
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
  color: theme.colors.text,
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
  margin-top: -26px;
  height: 22px;
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
  bottom: 0;
`;

const ControlButton = styled.button`
  transition: background-color 200ms ease, box-shadow 200ms ease;
  color: ${theme.colors.text};
  white-space: nowrap;
  font-size: 11px;
  text-transform: uppercase;
  display: block;
  pointer-events: initial;
  border: none;
  background-color: ${theme.colors.primaryLight};
  min-width: 22px;
  height: 22px;
  line-height: 22px;
  margin: 0;
  cursor: pointer;
`;

const AddButton = styled(ControlButton)`
  padding: 0;
  min-width: 60px;
`;

const DragButton = styled(ControlButton)`
  cursor: -webkit-grab;
  width: 60px;
  text-align: center;
`;

const AcceptsUl = styled.ul`
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.text};
  pointer-events: initial;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  user-select: none;
  > li {
    padding: 0 5px;
    &:hover {
      background-color: ${theme.colors.primary};
    }
  }
`;


class ControlBar extends Component {
  static defaultProps = {
    visible: false,
    acceptVisible: false,
    canDrag: true,
    canRemove: true
  };

  onSetting = event => {
    this.preventFocusLoss(event);
    this.props.onSetting();
  };

  onDragStart = event => {
    event.preventDefault();
    this.props.onDragStart();
  };

  onAdd = (event, component) => {
    this.refs.dropdown.hide();
    this.props.onAdd(component);
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
    const canAdd = this.props.yoyoObj.accepts.length > 0;

    return (
      <ControlBarColumn align="left">
        <ControlPlaceholder onMouseOver={this.onControlMouseOver}>
          {canGoUp &&
            <ControlButton
              onMouseDown={onUp}
              key="upAction"
            >
              <MdArrowUpward {...iconProps} /> {parentLabel}
            </ControlButton>}
          <ControlButton
              onMouseDown={this.onSetting}
              key="settingAction"
            >
              <MdSettings {...iconProps} /> {label}
            </ControlButton>
          {canAdd && <AddButton
            key="addAction"
          >
            <Dropdown ref="dropdown" onMouseDown={this.preventFocusLoss}>
              <DropdownTrigger>
                <MdAdd {...iconProps} /> 添加
              </DropdownTrigger>
              <DropdownContent>
                <AcceptsUl>
                  {this.props.yoyoObj.accepts.map(item=>{
                    return (
                      <li
                        key={item._yoyo.label}
                        onClick={(event) => this.onAdd(event, item._yoyo)}
                      >{item._yoyo.label}</li>
                    )
                  })}
                </AcceptsUl>
              </DropdownContent>
            </Dropdown>
          </AddButton>}
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
