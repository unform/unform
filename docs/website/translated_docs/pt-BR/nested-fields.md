---
id: nested-fields
title: Nested Fields
sidebar_label: Nested Fields
---

```js
import React from "react";
import { Form, Input, Scope } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {
    console.log(data);

    /**
     * {
     *   name: 'Diego',
     *   address: { street: "Nome da rua", number: 123 }
     * }
     */
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" />

      <Scope path="address">
        <Input name="street" />
        <Input name="number" />
      </Scope>

      <button type="submit">Salvar</button>
    </Form>
  );
}
```
