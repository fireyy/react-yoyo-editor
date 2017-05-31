import React from "react";
import ToolbarSection from "components/EditorToolbar/ToolbarSection";
import ToolbarDraggableItem
  from "components/EditorToolbar/ToolbarDraggableItem";

export default function createContentsPlugin(yoyo, target) {
  if (!yoyo.accepts || yoyo.accepts.length === 0) {
    return null;
  }

  return (
    <ToolbarSection key="contents-plugin" label={`${yoyo.label} 可添加内容`}>
      {yoyo.accepts.map(component => (
        <ToolbarDraggableItem
          key={component._yoyo.label}
          draggable={false}
          onDragStart={() => {}}
          onDragEnd={() => {}}
        >
          {component._yoyo.label}
        </ToolbarDraggableItem>
      ))}
    </ToolbarSection>
  );
}
