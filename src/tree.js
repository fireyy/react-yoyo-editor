import _ from "lodash";

/**
 * Checks if two nodes has same key
 */
function isSameNode(firstNode, secondNode) {
  return firstNode.props.key === secondNode.props.key;
}

/**
 * Merges two nodes into single one
 */
export function mergeNodes(leftNode, rightNode) {
  const leftNodeChildren = leftNode.props.children || [];
  const rightNodeChildren = rightNode.props.children || [];
  const children = [leftNodeChildren, rightNodeChildren].every(Array.isArray)
    ? _.uniqwith([...leftNodeChildren, ...rightNodeChildren], isSameNode)
    : leftNode.props.children || rightNode.props.children;

  return {
    ...leftNode,
    ...rightNode,
    props: {
      ...leftNode.props,
      ...rightNode.props,
      children
    }
  };
}

/**
 * Returns parent index in `props.children` of node by path
 */
export function getNodeIndex(tree, path) {
  const stack = [...path].reverse();
  let targetIndex = -1;
  let node = tree;

  stack.pop();

  while (stack.length > 0) {
    const key = stack.pop();

    node = Array.isArray(node.props.children)
      ? node.props.children.find((child, index) => {
          targetIndex = index;
          return child.props.key === key;
        })
      : node.props.children;
  }

  return targetIndex;
}

/**
 * Returns node object
 */
export function getNode(node, key) {
  const stack = [node];

  while (stack.length > 0) {
    const currentNode = stack.pop();

    if (currentNode.props.key === key) {
      return currentNode;
    }

    if (Array.isArray(currentNode.props.children)) {
      stack.push(...currentNode.props.children);
    }
  }

  return null;
}

/**
 * Returns path of target node by key
 */
export function getNodePath(
  node,
  key,
  path = []
) {
  path.push(node.props.key);

  // Return path if node is found
  if (node.props.key === key) {
    return path;
  }

  // Proceed children nodes
  if (Array.isArray(node.props.children)) {
    let foundChildPath = null;

    node.props.children.every((child) => {
      const childPath = getNodePath(child, key, path);

      // Keep path and stop iteration
      if (childPath) {
        foundChildPath = childPath;
        return false;
      }

      // Clean up path
      path.pop();
      return true;
    });

    return foundChildPath;
  }

  // If no node were found
  return null;
}

/**
 * Updates node at path
 */
export function updateNodeAtPath(
  tree,
  path,
  node
) {
  const stack = [...path].reverse();
  let parentNode = null;
  let currentNode = tree;
  let targetIndex = -1;

  // Update root node if only one path key passed
  if (stack.length === 1 && stack[0] === tree.props.key) {
    return node;
  }

  // Skip root element
  stack.pop();

  while (stack.length > 0) {
    const currentKey = stack.pop();

    // Keep reference to parent node
    parentNode = currentNode;

    // Move onto next node
    currentNode = Array.isArray(currentNode.props.children)
      ? currentNode.props.children.find(
          (child, index) => {
            if (child.props.key === currentKey) {
              targetIndex = index;
              return true;
            }

            return false;
          }
        )
      : currentNode.props.children;
  }

  if (!parentNode) {
    return tree;
  }

  // Update reference on parent of target node
  // and remove empty children after
  parentNode.props.children[targetIndex] = node;
  parentNode.props.children = parentNode.props.children.filter(
    (child) => child
  );

  return tree;
}

/**
 * Removes node in tree
 */
export function removeNodeAtPath(tree, path) {
  return updateNodeAtPath(tree, path, null);
}

/**
 * Returns node by path
 */
export function getNodeAtPath(tree, path) {
  const stack = [...path].reverse();
  let node = tree;

  stack.pop();

  while (stack.length > 0) {
    const key = stack.pop();

    node = Array.isArray(node.props.children)
      ? node.props.children.find(
          (child) => child.props.key === key
        )
      : node.props.children;
  }

  return node;
}

/**
 * Moves node in tree
 */
export function moveNodeAtPath(
  tree,
  targetPath,
  dropPath,
  dropIndex = 0
) {
  const dropStack = [...dropPath].reverse();
  const targetNode = getNodeAtPath(tree, targetPath);
  let parentNode = tree;

  dropStack.pop();

  while (dropStack.length > 0) {
    const key = dropStack.pop();

    parentNode = Array.isArray(parentNode.props.children)
      ? parentNode.props.children.find(
          (child) => child.props.key === key
        )
      : parentNode.props.children;
  }

  if (!parentNode) {
    return tree;
  }

  // Some magic happens here:
  // First, we need to prevent two nodes with same
  // key to appear in tree, so we change old one to
  // add prefix to key, then we move node to new index
  // and finally remove prefixed before node
  const originalKey = targetNode.props.key;
  const markedKey = `__tmp__${originalKey}`;
  const markedPath = [...targetPath];
  const markedNode = mergeNodes(targetNode, {
    props: { key: markedKey }
  });

  markedPath.pop();
  markedPath.push(markedKey);

  let newTree = updateNodeAtPath(tree, targetPath, markedNode);
  parentNode.props.children.splice(dropIndex, 0, targetNode);
  newTree = removeNodeAtPath(newTree, markedPath);

  return newTree;
}

/**
 * Create new Node
 */
function createNewNode(data) {
  return {
    type: data.name,
    props: {
      isNew: true,
      style: data.props.style,
      children: ""
    }
  }
}

/**
 * Add child to target Path
 */
export function addChildToPath(tree, key, component) {
  const node = getNode(tree, key);
  if (Array.isArray(node.props.children)) {
    const child = createNewNode(component);
    node.props.children.push(child);
  }
  const targetPath = getNodePath(tree, key);
  return updateNodeAtPath(tree, targetPath, node);
}
