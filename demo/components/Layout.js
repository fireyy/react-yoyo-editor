import React from "react";
import withYoYo from "../../src";
import LayoutColumn from "./LayoutColumn";
import "./Layout.css";

const Layout = ({ children }) => <div className="Layout">{children}</div>;

export default withYoYo({
  label: "布局",
  accepts: [LayoutColumn]
})(Layout);
