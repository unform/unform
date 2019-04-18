import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import * as Yup from 'yup';

import { Form, Field, Scope } from './unform';

const initialData = {
  name: 'Diego',
  address: {
    number: 833,
  },
}

const validation = Yup.object().shape({
  name: Yup.string().required(),
  address: Yup.object().shape({
    number: Yup.string().required()
  }),
});

function App() {
  return (
    <Form initialData={initialData} validationSchema={validation}>
      <Field name="name" label="Nome" /> 

      <Scope path="address">
        <Field name="street" />
        <Field name="number" />
      </Scope>

      <button type="submit">Enviar</button>
    </Form>
  ); 
}

export default hot(App);
