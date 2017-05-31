import invariant from "invariant";

export function validateYoYoConfig(yoyo) {
  // Check `label`
  const hasLabel = yoyo.label;
  const labelIsString = hasLabel && typeof yoyo.label === "string";

  invariant(hasLabel, "Make sure to specify `label` prop for YoYo Component");
  invariant(labelIsString, "`label` prop should be a string");

  // Check `accepts`
  const hasAcceptsProp = Boolean(yoyo.accepts);

  if (hasAcceptsProp) {
    const acceptsPropIsArray = Array.isArray(yoyo.accepts);
    const everyItemIsComponent =
      acceptsPropIsArray && yoyo.accepts.every(c => typeof c === "function");

    invariant(
      acceptsPropIsArray || everyItemIsComponent,
      "`accepts` prop should be an array of components"
    );
  }
}
