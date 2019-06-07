---
id: reset-form
title: Reset Form
sidebar_label: Reset Form
---

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data, { resetForm }) {
    resetForm();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="email" />
      <Input name="password" type="password" />

      <button type="submit">Entrar</button>
    </Form>
  );
}
```
