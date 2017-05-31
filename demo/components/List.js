import React, { createElement } from "react";
import withYoYo, { YoYoSelectbox } from "../../src";
import ListItem from "./ListItem";

const List = ({ children, type = "unordered" }) =>
  createElement(type === "ordered" ? "ol" : "ul", {}, children);

const orderOptions = {
  unordered: "Unordered",
  ordered: "Ordered"
};

export default withYoYo({
  label: "列表",
  accepts: [ListItem],
  props: {
    type: <YoYoSelectbox label="Type" options={orderOptions} />
  }
})(List);
