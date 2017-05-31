/**
 * Creates empty state object
 */
export function createEmpty() {
  return {
    dragAndDrop: null,
    enabled: false,
    plugins: [],
    tree: {},
    target: null,
    onInspect: () => null,
    onChange: () => null
  };
}

/**
 * Creates new object based on existed state
 */
export function createFromObject(data) {
  return {
    ...createEmpty(),
    ...data
  };
}

/**
 * Creates new empty state with initial tree object
 */
export function createWithTree(tree) {
  return {
    ...createEmpty(),
    tree
  };
}
