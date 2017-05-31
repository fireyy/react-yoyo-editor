import StyleConstants from "constants/StyleConstants";
import theme from "themes/index";

const isSafari =
  navigator.userAgent.toLowerCase().indexOf("safari") > -1 &&
  navigator.userAgent.toLowerCase().indexOf("chrome") === -1;

const highlightStyles = {
  transition: "outline 200ms ease",
  outline: `${theme.border.width}px dashed ${theme.colors.primaryLight}`,
  outlineOffset: isSafari ? 0 : 4, // Safari has rendering issues with outline-offset
  zIndex: 999
};

export default {
  active: {
    outline: `${theme.border.width}px solid transparent`
  },
  hover: highlightStyles,
  focus: highlightStyles,
  drag: {
    ...highlightStyles,
    animation: `${StyleConstants.PULSE_ANIMATION_NAME} 1s infinite`,
    pointerEvents: "none"
  },
  inspect: {
    ...highlightStyles,
    animation: `${StyleConstants.OUTLINE_PULSE_ANIMATION_NAME} 1s infinite`
  }
};
