import React, { cloneElement } from "react";
import ToolbarSection from "components/EditorToolbar/ToolbarSection";

export default function createPropsPlugin(yoyo, target) {
  if (!yoyo.props || Object.keys(yoyo.props).length === 0) {
    return null;
  }

  const propertyConnectors = Object.keys(yoyo.props).map(propName =>
    cloneElement(yoyo.props[propName], {
      key: `connector-${propName}`,
      nodeKey: target.props.yoyoKey,
      prop: propName,
      value: target.props[propName]
    })
  );

  return (
    <ToolbarSection key="props-plugin" label={`${yoyo.label} 配置属性`}>
      {propertyConnectors}
    </ToolbarSection>
  );
}
