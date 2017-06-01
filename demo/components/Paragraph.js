import React from "react";
import withYoYo, { YoYoTextbox } from "../../src";
import { processStyle } from "utils/GlobalStyleUtils";

const Paragraph = ({ children, style = {} }) => {
  let styles = processStyle(style);

  return (
    <p style={styles}>{children}</p>
  )
};

export default withYoYo({
  label: "段落",
  textEditable: true,
  props: {
    style: {
      fontSize: <YoYoTextbox label="文字大小" type="number" maxLength={4} required />
    }
  }
})(Paragraph);
