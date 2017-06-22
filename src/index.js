import EditorContainer from "./components/EditorContainer";
import EditorSwitcher from "./components/EditorSwitcher";
import EditorTextbox from "./components/EditorToolbar/ToolbarTextbox";
import EditorSelectbox from "./components/EditorToolbar/ToolbarSelectbox";
import createPropsPlugin from "./plugins/PropsPlugin";
import createTreesPlugin from "./plugins/TreesPlugin";
import configDefaults from "./constants/ConfigDefaults";
import createEnhancer from "./enhancer";
import createWrapper from "./wrapper";

export const YoYoEditor = EditorContainer;
export const YoYoSwitcher = EditorSwitcher;
export const YoYoTextbox = EditorTextbox;
export const YoYoSelectbox = EditorSelectbox;
export const plugins = {
  createPropsPlugin,
  createTreesPlugin
};

export default function withYoYo(yoyo) {
  return component => {
    const config = { ...configDefaults, ...yoyo };
    const enhance = createEnhancer(config);
    const wrap = createWrapper(config);
    return wrap(enhance(component));
  };
}
