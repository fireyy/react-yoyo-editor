import React from "react";
import withYoYo from "../../src";

const ListItem = ({ children }) => <li>{children}</li>;

export default withYoYo({
  label: "列表项",
  textEditable: true
})(ListItem);
