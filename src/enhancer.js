import invariant from "invariant";
import React, { cloneElement } from "react";
import PropTypes from 'prop-types';
import {
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from "react-dom";
import { convertPastedTextToPlainText } from "utils/ClipboardUtils";
import { validateYoYoConfig } from "utils/YoYoConfigUtils";
import { saveSelection, restoreSelection } from "utils/SelectionUtils";
import EditorControlBar from "components/EditorControlBar";
import StyleConstants from "constants/StyleConstants";
import PluginConstants from "constants/PluginConstants";
import styles from "constants/EnhancerStyles";
import { renderToolbar } from "./toolbar";
import { convertToClassComponent, getDisplayName } from "./helpers";
import {
  createDndState,
  updateDndStateOnOver,
  updateDndStateOnDrop
} from "./dnd";
import {
  getNodePath,
  getNode,
  updateNodeAtPath,
  removeNodeAtPath,
  mergeNodes,
  addChildToPath
} from "./tree";

export default function createEnhancer(yoyo) {
  return function enhance(component) {
    const ComposedComponent = convertToClassComponent(component);

    return class YoYoEnhancer extends ComposedComponent {
      static displayName = getDisplayName(ComposedComponent);

      static contextTypes = {
        ...ComposedComponent.contextTypes,
        yoyo: PropTypes.object
      };

      static childContextTypes = {
        ...ComposedComponent.childContextTypes,
        yoyo: PropTypes.object
      };

      constructor(props, context) {
        super(props, context);

        this.state = {
          ...super.state,
          _yoyoIsRoot: Boolean(this.props.editorState),
          _yoyoHasFocus: false,
          _yoyoHasPointerOver: false,
          _yoyoIsBeingDragged: false,
          _yoyoIsBeingSetting: false,
          _yoyoAcceptIsVisible: false,
          _yoyoInspectedKey: null
        };

        // Pass down `editorState` prop as context on mount
        if (!context.yoyo && props.editorState) {
          this.context.yoyo = props.editorState;
        }

        invariant(
          this.context.yoyo,
          "Make sure to pass `editorStore` prop to YoYoEditor"
        );

        invariant(
          this.props.yoyoKey,
          `Required \`yoyoKey\` prop is missing on ${this.constructor.displayName}`
        );

        validateYoYoConfig(yoyo);
      }

      componentWillReceiveProps(nextProps, nextContext) {
        if (super.componentWillReceiveProps) {
          super.componentWillReceiveProps(nextProps, nextContext);
        }

        // Pass down `editorState` prop as context on updates
        if (nextProps.editorState) {
          this.context.yoyo = nextProps.editorState;
        }

        // Set state if current component being inspected
        this.setState({
          _yoyoInspectedKey: nextContext.yoyo.inspect,
          _yoyoIsBeingSetting: nextContext.yoyo.setting === this.props.yoyoKey
        });

        // Focus current component
        if (nextContext.yoyo.current && nextContext.yoyo.current === this.props.yoyoKey) {
          this.setFocus()
        }
      }

      componentDidUpdate(prevProps, prevState, prevContext) {
        if (super.componentDidUpdate) {
          super.componentDidUpdate(prevProps, prevState, prevContext);
        }

        if (this.context.yoyo.enabled) {
          this.renderControlbar();
          this.renderToolbar();

          // Restore selection for textEditable component,
          // this is required for IE (Edge?) and Firefox
          // Chrome and Safari handles this by default
          const hasChanged = prevProps.children !== this.props.children;
          const canRestoreSelection = this._childrenRef && this._yoyoSelection;

          if (yoyo.textEditable && hasChanged && canRestoreSelection) {
            restoreSelection(this._childrenRef, this._yoyoSelection);
            this._yoyoSelection = null;
          }
        } else {
          this.destroyControlBar();
        }
      }

      componentWillUnmount() {
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }

        this.destroyControlBar();
      }

      shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!this.context.yoyo.enabled && super.shouldComponentUpdate) {
          return super.shouldComponentUpdate(nextProps, nextState, nextContext);
        }

        return true;
      }

      getChildContext() {
        const superChildContext = super.getChildContext
          ? super.getChildContext()
          : {};

        return {
          ...superChildContext,
          yoyo: this.props.editorState || this.context.yoyo
        };
      }

      destroyControlBar() {
        if (!this._controlBarRef) {
          return;
        }

        const controlBar = this._controlBarRef;
        unmountComponentAtNode(controlBar);
        document.body.removeChild(controlBar);
        this._controlBarRef = null;
      }

      renderControlbar() {
        if (!this._childrenRef) {
          return;
        }

        // Create portal for control bar
        if (!this._controlBarRef) {
          this._controlBarRef = document.createElement("div");
          this._controlBarRef.dataset.yoyo = "controls";
          document.body.appendChild(this._controlBarRef);
        }

        const isNotRoot = !this.state._yoyoIsRoot;
        const acceptVisible = this.state._yoyoAcceptIsVisible;
        let isVisible =
          !this.context.yoyo.dragAndDrop &&
          (this.state._yoyoHasFocus || this.state._yoyoHasPointerOver);

        renderSubtreeIntoContainer(
          this,
          <EditorControlBar
            label={yoyo.label}
            parentLabel={this.props.parentLabel}
            yoyoObj={yoyo}
            targetRef={this._childrenRef}
            visible={isVisible}
            acceptVisible={acceptVisible}
            canGoUp={isNotRoot}
            canDrag={isNotRoot}
            canRemove={isNotRoot}
            onUp={this.onParentFocus}
            onSetting={this.onSetting}
            onAdd={this.onAdd}
            onShowAdd={this.onShowAdd}
            onRemove={this.onRemove}
            onDragStart={this.onDragStart}
          />,
          this._controlBarRef
        );
      }

      renderToolbar() {
        if (!this.state._yoyoIsBeingSetting) {
          return;
        }

        const plugins = [
          ...PluginConstants.DEFAULT_PLUGINS,
          ...(yoyo.plugins || [])
        ];

        renderToolbar(this, plugins.map(plugin => plugin(yoyo, this)));
      }

      onParentFocus = event => {
        event.preventDefault();

        if (this.props.onParentFocus) {
          this.props.onParentFocus();
        }
      };

      onInspect = (key) => {
        this.context.yoyo.onInspect(key);
      };

      onSetting = () => {
        this.context.yoyo.onSetting(this.props.yoyoKey);
      };

      setFocus = () => {
        this.onInspect(null);
        this.setFocusedKey(null);
        setTimeout(() => {
          this._yoyoFocus();
          this.onFocus();
        }, 0)
      };

      setFocusedKey = (key) => {
        this.context.yoyo.setFocusedKey(key);
      };

      onDragStart = () => {
        this.setState({ _yoyoIsBeingDragged: true });
        this.context.yoyo.dragAndDrop = createDndState(this);

        document.documentElement.classList.add(
          StyleConstants.DRAG_IN_PROGRESS_CLASS
        );
        document.addEventListener("mouseup", this.onDrop);
      };

      onDragOver = event => {
        if (!this.context.yoyo.dragAndDrop) {
          return;
        }

        this.context.yoyo.dragAndDrop = updateDndStateOnOver(this, yoyo, event);
      };

      onDragEnd = () => {
        document.documentElement.classList.remove(
          StyleConstants.DRAG_IN_PROGRESS_CLASS
        );
        document.removeEventListener("mouseup", this.onDrop);

        this.setState({ _yoyoIsBeingDragged: false });

        // Focus on node on drop
        if (this._childrenRef) {
          this._childrenRef.focus();
        }
      };

      onDrop = event => {
        if (!this.context.yoyo.dragAndDrop) {
          return;
        }

        this.context.yoyo.dragAndDrop = updateDndStateOnDrop(this, event);
        this.setState({ _yoyoHasPointerOver: false });
      };

      onAdd = (component) => {
        this.setState({ _yoyoAcceptIsVisible: false });
        const { tree, onChange } = this.context.yoyo;
        const { yoyoKey } = this.props;

        onChange(addChildToPath(tree, yoyoKey, component));
      };

      onShowAdd = (bool) => {
        const _yoyoAcceptIsVisible = bool === undefined ? !this.state._yoyoAcceptIsVisible : bool;

        this.setState({ _yoyoAcceptIsVisible: _yoyoAcceptIsVisible });
      };

      onRemove = () => {
        const { tree, onChange } = this.context.yoyo;
        const { yoyoKey } = this.props;
        const targetPath = getNodePath(tree, yoyoKey);

        if (targetPath) {
          onChange(removeNodeAtPath(tree, targetPath));
        }
      };

      onPointerOver = event => {
        event.stopPropagation();

        // Prevent control bar to appear inside of focused component
        if (this.props.parentHasFocus) {
          return;
        }

        this.setState({ _yoyoHasPointerOver: true });
      };

      onPointerOut = event => {
        event.stopPropagation();
        this.setState({
          _yoyoHasPointerOver: false
        });
      };

      onFocus = event => {
        event && event.stopPropagation();
        this.setState({ _yoyoHasFocus: true });

        if (this.props.onFocus) {
          this.props.onFocus();
        }
      };

      onBlur = event => {
        event.stopPropagation();
        this.setState({
          _yoyoHasFocus: false
        });

        if (this.props.onBlur) {
          this.props.onBlur();
        }
      };

      onInput = event => {
        if (!this._childrenRef) {
          return;
        }

        this._yoyoSelection = saveSelection(this._childrenRef);

        const { tree, onChange } = this.context.yoyo;
        const { yoyoKey } = this.props;
        const diff = { props: { children: event.target.innerText } };
        const node = getNode(tree, yoyoKey);
        const targetPath = getNodePath(tree, yoyoKey);

        if (targetPath) {
          onChange(updateNodeAtPath(tree, targetPath, mergeNodes(node, diff)));
        }
      };

      onPaste = event => {
        event.stopPropagation();
        event.preventDefault();

        convertPastedTextToPlainText(event);
      };

      onKeyPress = event => {
        // Prevent junk on Enter
        if (event.which === 13) {
          event.preventDefault();
        }
      };

      _yoyoFocus = () => {
        if (this._childrenRef) {
          this._childrenRef.focus();
        }
      };

      _yoyoKeepRef = node => {
        this._childrenRef = node;
      };

      render() {
        const renderedElement = super.render();

        if (this.context.yoyo.enabled) {
          const isDragAndDropActive = Boolean(this.context.yoyo.dragAndDrop);
          const isBeingDragged = this.state._yoyoIsBeingDragged;
          const hasFocus = this.state._yoyoHasFocus;
          const hasPointerOver = this.state._yoyoHasPointerOver;
          const hasChildren =
            yoyo.void ||
            (this.props.children && this.props.children.length > 0);
          const addHoverStyles = !isDragAndDropActive && hasPointerOver;
          const extendedProps = { ...renderedElement.props };
          const isInspected = this.state._yoyoInspectedKey === this.props.yoyoKey;

          Object.assign(extendedProps, {
            "aria-label": yoyo.label,
            "aria-grabbed": isBeingDragged,
            tabIndex: extendedProps.tabIndex || 0,
            style: extendedProps.style || {},
            ref: node => {
              if (typeof renderedElement.ref === "function") {
                renderedElement.ref(node);
              }

              this._yoyoKeepRef(node);
            }
          });

          // Set additional styles
          Object.assign(extendedProps.style, {
            ...styles.active,
            ...(addHoverStyles && styles.hover),
            ...(hasFocus && styles.focus),
            ...(isBeingDragged && styles.drag),
            ...(isInspected && styles.inspect)
          });

          // Bind common events
          Object.assign(extendedProps, {
            // onMouseOver: this.onPointerOver,
            // onMouseOut: this.onPointerOut,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onMouseMove: this.onDragOver,
            onMouseUp: this.onDrop
          });

          // Bind `texteditable` events and attributes
          if (yoyo.textEditable) {
            Object.assign(extendedProps, {
              onInput: this.onInput,
              onPaste: this.onPaste,
              onKeyPress: this.onKeyPress,
              contentEditable: true,
              placeholder: "请输入文字...",
              suppressContentEditableWarning: true,
              spellCheck: yoyo.spellCheck
            });
          }

          // Mark void components
          if (yoyo.void) {
            Object.assign(extendedProps, {
              [StyleConstants.VOID_COMPONENT_ATTRIBUTE]: true
            });
          }

          // Mark empty components
          if (!hasChildren) {
            Object.assign(extendedProps, {
              [StyleConstants.EMPTY_COMPONENT_ATTRIBUTE]: true
            });
          }

          return cloneElement(renderedElement, extendedProps);
        }

        return renderedElement;
      }
    };
  };
}
