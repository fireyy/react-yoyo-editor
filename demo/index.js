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
      setting: null,
      current: null,
      inspect: null
    };
  }

  onToggle = enabled => {
    this.setState({ enabled });
  };

  onChange = tree => {
    this.setState({ tree });
  };

  onInspect = inspect => {
    this.setState({ inspect });
  };

  onSetting = setting => {
    this.setState({ setting })
  };

  setFocusedKey = current => {
    this.setState({ current });
  };

  render() {
    return (
      <main className="yue">
        <YoYoSwitcher onToggle={this.onToggle} toggled={this.state.enabled} />
        <YoYoEditor
          onChange={this.onChange}
          onInspect={this.onInspect}
          onSetting={this.onSetting}
          setFocusedKey={this.setFocusedKey}
          components={editorComponents}
          enabled={this.state.enabled}
          inspect={this.state.inspect}
          current={this.state.current}
          setting={this.state.setting}
          tree={this.state.tree}
        />
      </main>
    );
  }
}

render(<Editor />, document.querySelector("[data-approot]"));
