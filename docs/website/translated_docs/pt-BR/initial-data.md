---
id: initial-data
title: Initial Data
sidebar_label: Initial Data
---

**Opcional**: Você pode decidir os dados iniciais de cada campo, armazenando cada valor em uma variável e as carregando no `Form` usando a prop `initialData`.

```js
import React from "react";
import { Form, Input, Scope } from "@rocketseat/unform";

function App() {
  const initialData = {
    name: "João",
    address: {
      street: "Rua Exemplo"
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

      <button type="submit">Salvar</button>
    </Form>
  );
}
```
