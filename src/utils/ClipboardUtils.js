/**
 * Inserts text at current cursor position
 *
 */
export function insertTextAtCursor(text) {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (selection.getRangeAt && selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  } else if (document.selection && document.selection.createRange) {
    // IE9 and less has custom selection API
    document.selection.createRange().text = text;
  }
}

export function convertPastedTextToPlainText(event) {
  if (event.clipboardData && event.clipboardData.getData) {
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  } else if (window.clipboardData && window.clipboardData.getData) {
    const text = window.clipboardData.getData("Text");
    insertTextAtCursor(text);
  }
}
