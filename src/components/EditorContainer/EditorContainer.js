import { Component, cloneElement } from "react";
import {
  createGlobalStyles,
  destroyGlobalStyles
} from "utils/GlobalStyleUtils";
import { deserialize } from "utils/SerializationUtils";
import { createFromObject } from "utils/EditorStateUtils";
import { destroyToolbar } from "../../toolbar";

class EditorContainer extends Component {
  static defaultProps = {
    enabled: false,
    components: {},
    tree: {}
  };

  constructor(props, context) {
    super(props, context);

    if (props.enabled) {
      createGlobalStyles();
    }
  }

  componentDidUpdate() {
    if (this.props.enabled) {
      createGlobalStyles();
    } else {
      destroyGlobalStyles();
      destroyToolbar();
    }
  }

  render() {
    const {
      enabled,
      tree,
      components,
      inspect,
      current,
      setting,
      onChange,
      onInspect,
      setFocusedKey,
      onSetting
    } = this.props;
    const renderedElement = deserialize(tree, components);
    const extraProps = {
      editorState: createFromObject({
        enabled,
        tree,
        inspect,
        current,
        setting,
        onChange,
        onInspect,
        setFocusedKey,
        onSetting
      })
    };

    return cloneElement(renderedElement, extraProps);
  }
}

export default EditorContainer;
