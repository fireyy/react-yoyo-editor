import React, { createElement } from "react";
import withYoYo, { YoYoSelectbox } from "../../src";

const Heading = ({ children, level = 2 }) =>
  createElement(`h${level}`, {}, children);

const options = {
  2: "2nd",
  3: "3td",
  4: "4th"
};

export default withYoYo({
  name: "Heading",
  label: "标题",
  textEditable: true,
  props: {
    level: <YoYoSelectbox label="Heading Level" options={options} />
  }
})(Heading);
