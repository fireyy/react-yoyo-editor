import StyleConstants from "constants/StyleConstants";
import _ from 'lodash'

// TODO: Move colors to constants
export function buildGlobalStyles() {
  return `
        [contenteditable=true]:empty:before {
          content: attr(placeholder);
          display: block;
        }
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scaleY(0)
          }

          100% {
            transform: scaleY(1)
          }
        }
        .inspected {
          position: relative;
        }
        .inspected::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(56, 121, 217, 0.2);
        }
        @keyframes ${StyleConstants.PULSE_ANIMATION_NAME} {
          0% { opacity: 1 }
          50% { opacity: .2; }
          100% { opacity: 1 }
        }

        @keyframes ${StyleConstants.FLASH_ANIMATION_NAME} {
          0% { background-color: rgba(0, 0, 0, 0.1); }
          50% { background-color: rgba(0, 0, 0, 0.2); }
          100% { background-color: rgba(0, 0, 0, 0.1); }
        }

        @keyframes ${StyleConstants.OUTLINE_PULSE_ANIMATION_NAME} {
          0% { outline-color: rgba(66, 129, 244, 0.8); }
          50% { outline-color: rgba(66, 129, 244, 0.2); }
          100% { outline-color: rgba(66, 129, 244, 0.8); }
        }

        .${StyleConstants.DRAG_IN_PROGRESS_CLASS} {
          cursor: move;
          cursor: -webkit-grabbing;
        }

        [${StyleConstants.VOID_COMPONENT_ATTRIBUTE}] * {
          pointer-events: none;
        }

        [${StyleConstants.EMPTY_COMPONENT_ATTRIBUTE}]::before {
          animation: ${StyleConstants.FLASH_ANIMATION_NAME} 2.5s infinite;
          content: 'Empty ' attr(aria-label);
          opacity: 0.5;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-family: sans-serif;
        }
    `;
}

export function createGlobalStyles() {
  if (!document.querySelector(`[${StyleConstants.GLOBAL_STYLES_ATTRIBUTE}]`)) {
    const styles = document.createElement("style");
    styles.setAttribute(StyleConstants.GLOBAL_STYLES_ATTRIBUTE, "true");
    styles.innerHTML = buildGlobalStyles();
    document.head.appendChild(styles);
  }
}

export function destroyGlobalStyles() {
  const globalStylesRef = document.querySelector(
    `[${StyleConstants.GLOBAL_STYLES_ATTRIBUTE}]`
  );

  if (globalStylesRef) {
    document.head.removeChild(globalStylesRef);
  }
}

/**
 * CSS properties that are valid unit-less numbers.
 */
const CSS_NUMBER = {
  'animation-iteration-count': true,
  'box-flex': true,
  'box-flex-group': true,
  'column-count': true,
  'counter-increment': true,
  'counter-reset': true,
  'flex': true,
  'flex-grow': true,
  'flex-positive': true,
  'flex-shrink': true,
  'flex-negative': true,
  'font-weight': true,
  'line-clamp': true,
  'line-height': true,
  'opacity': true,
  'order': true,
  'orphans': true,
  'tab-size': true,
  'widows': true,
  'z-index': true,
  'zoom': true,
  // SVG properties.
  'fill-opacity': true,
  'stroke-dashoffset': true,
  'stroke-opacity': true,
  'stroke-width': true
}

function styleToString (key, value) {
  if (/^(-?\d+)(\.\d+)?$/.test(value) && value !== 0 && !CSS_NUMBER[key]) {
    value = `${value}px`
  }

  return value
}

export function processStyle(properties) {
  if (_.isEmpty(properties)) return

  const result = {}

  for (let name in properties) {
    let value = properties[name]

    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach(function (value) {
          value && (result[name] = styleToString(name, value))
        })
      } else {
        result[name] = styleToString(name, value)
      }
    }
  }

  return result
}
