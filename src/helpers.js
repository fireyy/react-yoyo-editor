import { Component } from "react";

/**
 * Check if component is stateless function
 */
export function isStateless(component) {
  return (
    !component.render && !(component.prototype && component.prototype.render)
  );
}

/**
 * Returns display name of target component
 */
export function getDisplayName(component) {
  return component.displayName || component.name || "Component";
}

/**
 * Checks if element is enhanced with yoyo
 */
export function isYoYoEnhanced(child) {
  return child.type && child.type._isYoYoEnhanced;
}

/**
 * Converts (possibly) statelss function to class component
 */
export function convertToClassComponent(component) {
  if (isStateless(component)) {
    return class extends Component {
      static displayName = getDisplayName(component);

      render() {
        return component(this.props, this.context);
      }
    };
  }

  return component;
}
