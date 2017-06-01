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
      target: null,
      addAccept: false
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

  onAdd = target => {
    this.setState({ addAccept: !this.state.addAccept });
  };

  render() {
    return (
      <main className="yue">
        <YoYoSwitcher onToggle={this.onToggle} toggled={this.state.enabled} />
        <YoYoEditor
          onChange={this.onChange}
          onInspect={this.onInspect}
          onAdd={this.onAdd}
          addAccept={this.state.addAccept}
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
