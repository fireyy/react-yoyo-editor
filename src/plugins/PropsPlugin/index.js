import React, { cloneElement } from "react";
import ToolbarSection from "components/EditorToolbar/ToolbarSection";

export default function createPropsPlugin(yoyo, target) {
  if (!yoyo.props || Object.keys(yoyo.props).length === 0) {
    return null;
  }

  const processProperty = (props, isStyle) => {
    return Object.keys(props).map(propName => {
      if (propName === "style") {
        return processProperty(props[propName], true)
      }
      return cloneElement(props[propName], {
        key: `connector-${propName}`,
        nodeKey: target.props.yoyoKey,
        prop: propName,
        isStyle: isStyle,
        value: (isStyle) ? (target.props.style && target.props.style[propName]) || '' : target.props[propName]
      })
    });
  }

  const propertyConnectors = processProperty(yoyo.props);

  return (
    <ToolbarSection key="props-plugin" label={`${yoyo.label} 配置属性`}>
      {propertyConnectors}
    </ToolbarSection>
  );
}
