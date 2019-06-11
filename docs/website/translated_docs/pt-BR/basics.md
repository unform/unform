---
id: basics
title: Basics
sidebar_label: Basics
---

Unform te dá dois elementos principais: `<Input />` e `<Select />`. Por enquanto, o elemento `<Select />` não suporte múltiplos valores, então você pode usar o exemplo em [React Select](react-select) para esse resultado.

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {
    console.log(data);

    /**
     * {
     *   email: 'email@examplo.com',
     *   password: '123456'
     * }
     */
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
