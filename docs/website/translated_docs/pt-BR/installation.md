---
id: installation
title: Installation
sidebar_label: Installation
---

Adicione o Unform em seu projeto:

```
yarn add @rocketseat/unform
```

E é isso! Você já pode sair utilizando como nesse seguinte exemplo:

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {
    console.log(data) // { message: 'Minha mensagem' }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="message" />

      <button type="submit">Enviar mensagem</button>
    </Form>
  );
}
```
