import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const TreeViewDiv = styled.div`
  overflow-y: hidden;
  font-size: 12px;
`;

const TreeViewItem = styled.div`
  
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

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.defaultCollapsed
    };
  }

  handleClick = (...args) => {
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
        <TreeViewItem>
          {children &&
            <TreeViewArrow {...rest} collapsed={collapsed} onClick={this.handleClick}>
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
