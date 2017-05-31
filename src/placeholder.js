import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import EditorPlaceholder from "components/EditorPlaceholder";

let placeholderContainer = null;

/**
 * Renders placeholder at specific position and width
 */
export function renderPlaceholder(x, y, width) {
  if (!placeholderContainer) {
    const placeholder = document.createElement("div");
    placeholder.dataset.yoyo = "placeholder";
    document.body.appendChild(placeholder);
    placeholderContainer = placeholder;
  }

  render(<EditorPlaceholder x={x} y={y} width={width} />, placeholderContainer);
}

/**
 * Destroys placeholder
 */
export function destroyPlaceholder() {
  if (placeholderContainer) {
    unmountComponentAtNode(placeholderContainer);
    document.body.removeChild(placeholderContainer);
    placeholderContainer = null;
  }
}
