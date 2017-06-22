import StyleConstants from "constants/StyleConstants";
import theme from "themes/index";

const highlightStyles = {
  transition: "outline 200ms ease",
  outline: `${theme.border.width}px solid ${theme.colors.primaryLight}`,
  outlineOffset: 4,
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
