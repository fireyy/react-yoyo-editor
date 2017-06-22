import React, { Component } from "react";
import styled from 'styled-components';

const EditorToolbar = styled.div`
  cursor: default;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 9999;
`

export default class myComponent extends Component {
  render() {
    return (
      <EditorToolbar>
        {this.props.children}
      </EditorToolbar>
    );
  }
}
