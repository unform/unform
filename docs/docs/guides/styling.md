---
id: styling
title: Styling
sidebar_label: Styling
---

The `Form` component exposes two props for that: `style` and `className`. You can use any `CSS-in-JS` library to style your form or just pass the class name string, or even the `style` object directly! For example:

```js
import styled from "styled-components"; // or emotion, for example

// weird choice for a background color, huh?
export default styled(MyForm)`
  background: red;
`;
```
