import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import * as Yup from "yup";

import { Form, Input, Textarea, Select, Scope } from "../../dist";

const initialData = {
  name: "Diego",
  profile: "CTO na Rocketseat",
  billingAddress: {
    number: 833
  }
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  profile: Yup.string().required(),
  tech: Yup.array(Yup.string())
    .min(2)
    .required(),
  billingAddress: Yup.object().shape({
    street: Yup.string().required(),
    number: Yup.string().required()
  }),
  shippingAddress: Yup.object().when("$useShippingAsBilling", {
    is: false,
    then: Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string().required()
    }),
    otherwise: Yup.object().strip(true)
  })
});

function App() {
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Form
      initialData={initialData}
      context={{ useShippingAsBilling }}
      schema={schema}
      onSubmit={handleSubmit}
    >
      <Input name="name" label="Nome" />
      <Textarea name="profile" label="Perfil" />

      <Select
        name="tech"
        multiple
        options={[
          { id: "react", title: "ReactJS" },
          { id: "node", title: "NodeJS" },
          { id: "rn", title: "React Native" }
        ]}
      />

      <h2>Endereço</h2>

      <Scope path="billingAddress">
        <Input name="street" />
        <Input name="number" />
      </Scope>

      <input
        type="checkbox"
        name="useShippingAsBilling"
        checked={useShippingAsBilling}
        onChange={e => setUseShippingAsBilling(e.target.checked)}
      />

      <Scope path="shippingAddress">
        <Input name="street" />
        <Input name="number" />
      </Scope>

      <button type="submit">Enviar</button>
    </Form>
  );
}

export default hot(App);
