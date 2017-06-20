import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const TreeViewDiv = styled.div`
  overflow-y: hidden;
  font-size: 12px;
`;

const TreeViewArrow = styled.div`
  cursor: pointer;
  margin-right: 6px;
  display: inline-block;
  user-select: none;
  ${props => (props.collapsed) && 'transform: rotate(-90deg);'};
`;

const TreeViewChildren = styled.div`
  margin-left: 16px;
  ${props => (props.collapsed) && 'height: 0;'};
`;

const TreeViewItem = ({ children, refKey, onItemHover, onItemClick }) => {
  const handleClick = (event) => {
    onItemClick(event, refKey)
  }
  const handleOver = (event) => {
    onItemHover(event, refKey)
  }
  const handleOut = (event) => {
    onItemHover(event, null)
  }
  return (
    <div onClick={handleClick} onMouseOver={handleOver} onMouseOut={handleOut}>
      {children}
    </div>
  )
}

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.defaultCollapsed
    };
  }

  handleClick = (...args) => {
    if (this.props.onItemClick) {
      this.props.onItemClick(...args);
    }
  };

  handleOver = (...args) => {
    if (this.props.onItemHover) {
      this.props.onItemHover(...args);
    }
  };

  handleArrowClick = (...args) => {
    this.setState({ collapsed: !this.state.collapsed });
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  };

  render() {
    const {
      collapsed = this.state.collapsed,
      nodeLabel,
      children,
      defaultCollapsed,
      ...rest
    } = this.props;

    return (
      <TreeViewDiv>
        <TreeViewItem refKey={this.props.refKey} onItemClick={this.handleClick} onItemHover={this.handleOver}>
          {children &&
            <TreeViewArrow {...rest} collapsed={collapsed} onClick={this.handleArrowClick}>
              ▾
            </TreeViewArrow>}
          {nodeLabel}
        </TreeViewItem>
        <TreeViewChildren collapsed={collapsed}>
          {collapsed ? null : children}
        </TreeViewChildren>
      </TreeViewDiv>
    );
  }
}

TreeView.propTypes = {
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  nodeLabel: PropTypes.node.isRequired
};

export default TreeView;
