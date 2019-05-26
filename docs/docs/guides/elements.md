---
id: elements
title: Elements
sidebar_label: Elements
---

Unform exposes two elements by default, Input and Select.

## Input element

Input elements can receive a `multiline` prop that will render a textarea instead.

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {}

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" />
      <Input multiline name="bio" />

      <button type="submit">Send</button>
    </Form>
  );
}
```

## Select element

```js
import React from "react";
import { Form, Select } from "@rocketseat/unform";

const options = [
  { id: "react", title: "ReactJS" },
  { id: "node", title: "NodeJS" },
  { id: "rn", title: "React Native" }
];

function App() {
  function handleSubmit(data) {}

  return (
    <Form onSubmit={handleSubmit}>
      <Select name="tech" options={options} />

      <button type="submit">Send</button>
    </Form>
  );
}
```
