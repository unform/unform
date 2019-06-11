---
id: manipulate-data
title: Manipulate Data
sidebar_label: Manipulate Data
---

```js
import React, { useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().when("$updatePassword", {
    is: true,
    then: Yup.string()
      .min(4)
      .required(),
    otherwise: Yup.string().strip(true)
  })
});

function App() {
  const [updatePassword, setUpdatePassword] = useState(false);

  const initialData = {
    name: "John Doe",
    email: "johndoe@exemplo.com"
  };

  function handleSubmit(data) {}

  return (
    <Form
      schema={schema}
      initialData={initialData}
      context={{ updatePassword }}
      onSubmit={handleSubmit}
    >
      <Input name="name" />
      <Input name="email" />

      <input
        type="checkbox"
        name="Update Password"
        checked={updatePassword}
        onChange={e => setUpdatePassword(e.target.checked)}
      />

      <Input name="password" type="password" />

      <button type="submit">Salvar</button>
    </Form>
  );
}
```
