import React, { Component, cloneElement } from "react";
import { getDisplayName, isYoYoEnhanced } from "./helpers";

export default function createWrapper(yoyo) {
  return function wrap(YoYoEnhancer) {
    return class YoYoHOC extends Component {
      static displayName = `YoYo(${getDisplayName(YoYoEnhancer)})`;

      // Mark as enhanced
      static _isYoYoEnhanced = true;

      // Keep reference to original YoYoEnhancer for quick comparison
      // then doing drag and drop dropzone check
      static _yoyoEnhancer = YoYoEnhancer;

      // Keep yoyo config for plugins
      static _yoyo = yoyo;

      constructor(props, context) {
        super(props, context);

        this.state = {
          hasNodeRef: false,
          hasFocus: false
        };
      }

      _keepRef = node => {
        if (node) {
          this.setState({ hasNodeRef: true });
          if (node.props.isNew === true) {
            node._yoyoFocus();
          }
          this._node = node;
        }
      };

      _onParentFocus = () => {
        this._node._yoyoFocus();
      };

      _onFocus = () => {
        this.setState({ hasFocus: true });
      };

      _onBlur = () => {
        this.setState({ hasFocus: false });
      };

      render() {
        const props = {};
        const parentLabel = yoyo.label;
        const parentHasFocus = this.props.parentHasFocus || this.state.hasFocus;

        // Once ref is received, extend children props
        // with parent label, parent focus flag and
        // callback on parent focus request
        if (this.state.hasNodeRef && Array.isArray(this.props.children)) {
          props.children = this.props.children.map(
            child =>
              isYoYoEnhanced(child)
                ? cloneElement(child, {
                    parentLabel,
                    parentHasFocus,
                    onParentFocus: this._onParentFocus
                  })
                : child
          );
        }

        return (
          <YoYoEnhancer
            {...this.props}
            {...props}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            ref={this._keepRef}
          />
        );
      }
    };
  };
}
