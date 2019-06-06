---
id: validation
title: Validation
sidebar_label: Validation
---

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Custom invalid email message")
    .required("Custom required message"),
  password: Yup.string()
    .min(4)
    .required()
});

function App() {
  function handleSubmit(data) {}

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="email" />
      <Input name="password" type="password" />

      <button type="submit">Save</button>
    </Form>
  );
}
```
