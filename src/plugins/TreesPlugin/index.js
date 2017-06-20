import React from "react";
import ToolbarSection from "components/EditorToolbar/ToolbarSection";
import TreeView from "components/EditorToolbar/ToolbarTree";

export default function createTreesPlugin(yoyo, target) {
  if (!yoyo.accepts || yoyo.accepts.length === 0) {
    return null;
  }
  const treeItemClick = (event, key) => {
    target.setFocusedKey(key)
  }
  const treeItemOver = (event, key) => {
    target.onInspect(key)
  }
  let renderTree = trees => {
    return trees.map((child, i) => (
      <TreeView
        key={child.key}
        refKey={child.key}
        onItemClick={treeItemClick}
        onItemHover={treeItemOver}
        nodeLabel={child.type._yoyo.label}
        defaultCollapsed={false}
      >
        {Array.isArray(child.props.children) &&
          renderTree(child.props.children)}
      </TreeView>
    ));
  };
  let trees = renderTree(target.props.children);

  return (
    <ToolbarSection key="trees-plugin" label={`${yoyo.label} 子元素`}>
      {trees}
    </ToolbarSection>
  );
}
