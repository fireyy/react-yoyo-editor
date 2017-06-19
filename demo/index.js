import React, { Component } from "react";
import { render } from "react-dom";
import { YoYoEditor, YoYoSwitcher } from "../src";
import initialTree from "./data/tree";
import "./yue.css";

import * as editorComponents from "./components";

class Editor extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      enabled: true,
      tree: initialTree,
      target: null
    };
  }

  onToggle = enabled => {
    this.setState({ enabled });
  };

  onChange = tree => {
    this.setState({ tree });
  };

  onInspect = target => {
    this.setState({ target });
  };

  render() {
    return (
      <main className="yue">
        <YoYoSwitcher onToggle={this.onToggle} toggled={this.state.enabled} />
        <YoYoEditor
          onChange={this.onChange}
          onInspect={this.onInspect}
          components={editorComponents}
          enabled={this.state.enabled}
          target={this.state.target}
          tree={this.state.tree}
        />
      </main>
    );
  }
}

render(<Editor />, document.querySelector("[data-approot]"));
