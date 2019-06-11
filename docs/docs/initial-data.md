---
id: initial-data
title: Initial Data
sidebar_label: Initial Data
---

_Optional_: Here you can set what the initial data for each field will be, you store the initial field values into a variable and load it in the `Form` using the prop `initialData`.

```js
import React from "react";
import { Form, Input, Scope } from "@rocketseat/unform";

function App() {
  const initialData = {
    name: "John Doe",
    address: {
      street: "Sample Avenue"
    }
  };

  function handleSubmit(data) {}

  return (
    <Form onSubmit={handleSubmit} initialData={initialData}>
      <Input name="name" />

      <Scope path="address">
        <Input name="street" />
        <Input name="number" />
      </Scope>

      <button type="submit">Save</button>
    </Form>
  );
}
```
