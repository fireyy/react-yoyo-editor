import React from "react";
import withYoYo, { YoYoTextbox } from "../../src";
import { processStyle } from "utils/GlobalStyleUtils";

const ListItem = ({ children, style = {} }) => {
  let styles = processStyle(style);

  return <li style={styles}>{children}</li>
};

export default withYoYo({
  name: "ListItem",
  label: "列表项",
  textEditable: true,
  props: {
    style: {
      padding: <YoYoTextbox label="下边距" type="range" min="0" max="20" required />
    }
  }
})(ListItem);
