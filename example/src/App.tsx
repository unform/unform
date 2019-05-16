import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import * as Yup from "yup";

import { Form, Input, Textarea, Select, Scope } from "../../lib";
import DatePicker from "./components/DatePicker";
import ReactSelect from "./components/ReactSelect";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  profile: Yup.string().required(),
  tech: Yup.string().required(),
  date: Yup.date().required(),
  people: Yup.array(Yup.string())
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

interface Data {
  name: string;
  profile: string;
  tech: string;
  people: string[];
  date: Date;
  billingAddress: {
    number: number;
  };
}

function App() {
  const [useShippingAsBilling, setUseShippingAsBilling] = useState<boolean>(
    true
  );

  const [formData] = useState<Data>({
    name: "Diego",
    profile: "CTO na Rocketseat",
    tech: "node",
    people: ["1", "3"],
    date: new Date(),
    billingAddress: {
      number: 833
    }
  });

  function handleSubmit(data, { resetForm }) {
    console.log(data);

    resetForm();
  }

  return (
    <Form
      initialData={formData}
      context={{ useShippingAsBilling }}
      schema={schema}
      onSubmit={handleSubmit}
    >
      <Input name="name" label="Nome" />
      <Textarea name="profile" label="Perfil" />

      <ReactSelect
        name="tech"
        options={[
          { id: "react", title: "ReactJS" },
          { id: "node", title: "NodeJS" },
          { id: "rn", title: "React Native" }
        ]}
      />

      <ReactSelect
        name="people"
        multiple
        options={[
          { id: "1", title: "Diego" },
          { id: "2", title: "João" },
          { id: "3", title: "Higo" }
        ]}
      />

      <DatePicker name="date" />

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
