import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import * as Yup from "yup";

import { Form, Field, Scope } from "./unform";

const initialData = {
  name: "Diego",
  address: {
    number: 833
  }
};

const validation = Yup.object().shape({
  name: Yup.string().required(),
  billingAddress: Yup.object().shape({
    street: Yup.string().required(),
    number: Yup.string().required()
  }),
  shippingAddress: Yup.object().when("$useShippingAsBilling", {
    is: false,
    then: Yup.object()
      .shape({
        street: Yup.string().required(),
        number: Yup.string().required()
      })
      .required()
  })
});

const groups = [1, 2, 3, 4, 5];

function App() {
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  return (
    <Form
      initialData={initialData}
      context={{ useShippingAsBilling }}
      validationSchema={validation}
    >
      <Field name="name" label="Nome" />

      <h2>Endereço</h2>

      <Scope path="billingAddress">
        <Field name="street" />
        <Field name="number" />
      </Scope>

      <input
        type="checkbox"
        name="useShippingAsBilling"
        checked={useShippingAsBilling}
        onChange={e => setUseShippingAsBilling(e.target.checked)}
      />

      <Scope path="shippingAddress">
        <Field name="street" />
        <Field name="number" />
      </Scope>

      <button type="submit">Enviar</button>
    </Form>
  );
}

export default hot(App);
