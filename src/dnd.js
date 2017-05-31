import { getElementBox } from "utils/ElementBoxUtils";
import { renderPlaceholder, destroyPlaceholder } from "./placeholder";
import { getNodePath, moveNodeAtPath, getNodeIndex } from "./tree";

/**
 * Creates new DND state
 */
export function createDndState(instance) {
  const targetPath = getNodePath(
    instance.context.yoyo.tree,
    instance.props.yoyoKey
  );

  if (!targetPath) {
    return null;
  }

  return {
    targetPath,
    targetInstance: instance,
    targetRef: instance._childrenRef,
    dropIndex: -1,
    depth: targetPath.length,
    acceptableComponents: [],
    lastDragOverNodeKey: null
  };
}

/**
 * Update DND state on drag over
 */
export function updateDndStateOnOver(instance, yoyo, event) {
  const { tree, dragAndDrop } = instance.context.yoyo;
  const {
    targetPath,
    targetInstance,
    lastDragOverNodeKey,
    lastDragOverRef
  } = dragAndDrop;
  const hasWhiteList = yoyo.accepts && Array.isArray(yoyo.accepts);
  const hasChildNodeKey = lastDragOverNodeKey !== null;
  const targetIsAllowedHere =
    hasWhiteList &&
    yoyo.accepts.some(
      type => type._yoyoEnhancer === targetInstance.constructor
    );
  const isDragOverOnSelf =
    targetPath[targetPath.length - 1] === instance.props.yoyoKey;

  // Do nothing then self-drop
  if (isDragOverOnSelf) {
    return dragAndDrop;
  }

  // Once drag event reaches yoyo component with
  // white-list prop `accepts`, keep that list for
  // next check "if element is allowed here"
  if (targetIsAllowedHere && hasChildNodeKey) {
    event.stopPropagation();
    const childNodePath = getNodePath(tree, lastDragOverNodeKey);
    const dropPath = getNodePath(tree, instance.props.yoyoKey);
    const acceptableComponents = yoyo.accepts;
    const { top, left, height, width } = getElementBox(lastDragOverRef);

    // Prevent DND if target or dropzone are empty
    if (!childNodePath || !dropPath) {
      return dragAndDrop;
    }

    let dropIndex = getNodeIndex(tree, childNodePath);
    let willDropAfter = false;

    // Negative drop index may happen on root component
    if (dropIndex < 0) {
      return dragAndDrop;
    }

    // Increase drop index to move element after target
    if (event.pageY > top + height / 2) {
      willDropAfter = true;
      dropIndex += 1;
    }

    renderPlaceholder(left, top + (willDropAfter ? height : 0), width);

    return {
      ...dragAndDrop,
      dropPath,
      dropIndex,
      acceptableComponents
    };
  }

  return {
    ...dragAndDrop,
    lastDragOverNodeKey: instance.props.yoyoKey,
    lastDragOverRef: instance._childrenRef
  };
}

/**
 * Update DND state on drop
 */
export function updateDndStateOnDrop(instance, event) {
  const { tree, dragAndDrop, onChange } = instance.context.yoyo;
  const { targetPath, targetInstance, dropPath, dropIndex } = dragAndDrop;

  const newDndState = {
    ...dragAndDrop,
    depth: dragAndDrop.depth - 1
  };

  const isDropOnSelf =
    targetPath[targetPath.length - 1] === instance.props.yoyoKey;
  const hasWhiteList = newDndState.acceptableComponents.length > 0;
  const hasAchievedRoot = newDndState.depth <= 1;
  const isAllowedHere = newDndState.acceptableComponents.some(
    type => type._yoyoEnhancer === targetInstance.constructor
  );

  // Proceed drop
  if (isAllowedHere && hasWhiteList && !isDropOnSelf) {
    onChange(moveNodeAtPath(tree, targetPath, dropPath, dropIndex));
  }

  destroyPlaceholder();

  // Stop event from bubbling up
  if (isAllowedHere || isDropOnSelf || hasAchievedRoot) {
    event.stopPropagation();
    targetInstance.onDragEnd();
    return null;
  }

  return newDndState;
}
