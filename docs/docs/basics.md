---
id: basics
title: Basics
sidebar_label: Basics
---

Unform exposes two default form elements: `<Input />` and `<Select />`. Currently, `<Select />` element does not support multiple values, you can use [React Select](react-select) example to achieve that.

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {
    console.log(data);

    /**
     * {
     *   email: 'email@example.com',
     *   password: '123456'
     * }
     */
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="email" />
      <Input name="password" type="password" />

      <button type="submit">Sign in</button>
    </Form>
  );
}
```
