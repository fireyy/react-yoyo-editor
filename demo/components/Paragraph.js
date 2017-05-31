import React from "react";
import withYoYo from "../../src";

const Paragraph = ({ lead = false, children }) => (
  <p className={lead ? "lead" : null}>{children}</p>
);

export default withYoYo({
  label: "段落",
  textEditable: true
})(Paragraph);
