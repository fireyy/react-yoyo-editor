import React from "react";
import {
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
  unmountComponentAtNode
} from "react-dom";
import EditorToolbar from "components/EditorToolbar";

let toolbarContainer = null;

/**
 * Renders toolbar with specific contents
 */
export function renderToolbar(parentComponent, connectors) {
  if (!toolbarContainer) {
    const placeholder = document.createElement("div");
    placeholder.dataset.yoyo = "toolbar";
    document.body.appendChild(placeholder);
    toolbarContainer = placeholder;
  }

  renderSubtreeIntoContainer(
    parentComponent,
    <EditorToolbar>{connectors}</EditorToolbar>,
    toolbarContainer
  );
}

/**
 * Destroys toolbar
 */
export function destroyToolbar() {
  if (toolbarContainer) {
    unmountComponentAtNode(toolbarContainer);
    document.body.removeChild(toolbarContainer);
    toolbarContainer = null;
  }
}
