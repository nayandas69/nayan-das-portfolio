import { Fragment, h } from 'vue';

/** MDX emits JSX children; Vue components expect lazy slots. */
export function jsx(type, props = {}, key) {
  const { children, ...attributes } = props;
  if (key !== undefined) attributes.key = key;
  const content =
    typeof type === 'string' || type === Fragment || children == null
      ? children
      : { default: () => children };
  return h(type, attributes, content);
}

export { Fragment, jsx as jsxs };
