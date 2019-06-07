---
id: elements
title: Elements
sidebar_label: Elements
---

## Input element

Elementos Input que recebem a prop `multiline` são tratados como um textarea.

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {}

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" />
      <Input multiline name="bio" />

      <button type="submit">Enviar</button>
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

      <button type="submit">Enviar</button>
    </Form>
  );
}
```
