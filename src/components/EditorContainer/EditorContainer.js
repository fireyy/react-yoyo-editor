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
      target,
      onChange,
      onInspect
    } = this.props;
    const renderedElement = deserialize(tree, components);
    const extraProps = {
      editorState: createFromObject({
        enabled,
        tree,
        target,
        onChange,
        onInspect
      })
    };

    return cloneElement(renderedElement, extraProps);
  }
}

export default EditorContainer;
