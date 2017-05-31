/**
 * Calculates element box position with scroll position included
 */
export function getElementBox(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  return {
    top: Math.floor(rect.top + scrollTop),
    right: rect.right,
    bottom: rect.bottom,
    left: Math.floor(rect.left + scrollLeft),
    width: rect.width,
    height: rect.height
  };
}
