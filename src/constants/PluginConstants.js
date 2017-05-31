import createPropsPlugin from "plugins/PropsPlugin";
import createContentsPlugin from "plugins/ContentsPlugin";
import createTreesPlugin from "plugins/TreesPlugin";

export default {
  DEFAULT_PLUGINS: [createPropsPlugin, createContentsPlugin, createTreesPlugin]
};
