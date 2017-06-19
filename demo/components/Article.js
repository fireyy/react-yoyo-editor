import React from "react";
import withYoYo, { YoYoTextbox } from "../../src";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import List from "./List";
import Layout from "./Layout";
import "./Article.css";

const Article = ({ title, children }) => (
  <article className="Article">
    <h1>{title}</h1>
    <div>{children}</div>
  </article>
);

export default withYoYo({
  name: "Article",
  label: "文章",
  accepts: [Heading, Paragraph, List, Layout],
  props: {
    title: <YoYoTextbox label="Article Title" maxLength={128} required />
  }
})(Article);
