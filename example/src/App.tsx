import React, { useState, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import * as Yup from 'yup';

import { Form, Input, SubmitHandler, FormRef, Scope } from '../../lib';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  bio: Yup.string().required(),
  address: Yup.object().shape({
    street: Yup.string(),
  }),
});

interface Data {
  name: string;
  address: {
    street: string;
  };
  bio: string;
}

function App() {
  const formRef = useRef<FormRef>();

  const [formData] = useState<Data>({
    name: 'Diego',
    address: {
      street: 'Rua Teste',
    },
    bio: 'Testando biografia',
  });

  const handleSubmit: SubmitHandler<Data> = (data, { reset }) => {
    console.log(data);

    reset();
  };

  function getFieldValue() {
    console.log(formRef.current.getFieldValue('name'));
    console.log(formRef.current.getFieldValue('address.street'));
  }

  function setFieldValue() {
    formRef.current.setFieldValue('name', 'Diego');
    formRef.current.setFieldValue('address.street', 'Street 1');
  }

  function setFieldError() {
    formRef.current.setFieldError('name', 'Nome com problemas...');
    formRef.current.setFieldError('address.street', 'Rua com problemas');
  }

  function getFieldError() {
    console.log(formRef.current.getFieldError('name'));
    console.log(formRef.current.getFieldError('address.street'));
  }

  function getFieldRef() {
    console.log(formRef.current.getFieldRef('name'));
    console.log(formRef.current.getFieldRef('address.street'));
  }

  function clearField() {
    formRef.current.clearField('name');
    formRef.current.clearField('address.street');
  }

  function resetForm() {
    formRef.current.reset();
  }

  function getData() {
    console.log(formRef.current.getData());
  }

  function setData() {
    formRef.current.setData({
      name: 'John Doe',
      address: {
        street: 'Test street',
      },
    });
  }

  function getErrors() {
    console.log(formRef.current.getErrors());
  }

  function setErrors() {
    formRef.current.setErrors({
      name: 'Name not cool',
      address: {
        street: 'Problems with address',
      },
    });
  }

  return (
    <Form
      initialData={formData}
      schema={schema}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Input name="name" placeholder="Digite seu nome" />
      <Scope path="address">
        <Input name="street" placeholder="Digite seu endereço" />
      </Scope>
      <Input multiline name="bio" placeholder="Biografia" />

      <button type="button" onClick={getFieldValue}>
        getFieldValue
      </button>
      <button type="button" onClick={setFieldValue}>
        setFieldValue
      </button>
      <button type="button" onClick={setFieldError}>
        setFieldError
      </button>
      <button type="button" onClick={getFieldError}>
        getFieldError
      </button>
      <button type="button" onClick={getFieldRef}>
        getFieldRef
      </button>
      <button type="button" onClick={clearField}>
        clearField
      </button>
      <button type="button" onClick={resetForm}>
        reset
      </button>
      <button type="button" onClick={getData}>
        getData
      </button>
      <button type="button" onClick={setData}>
        setData
      </button>
      <button type="button" onClick={getErrors}>
        getErrors
      </button>
      <button type="button" onClick={setErrors}>
        setErrors
      </button>

      <button type="submit">Enviar</button>
    </Form>
  );
}

export default hot(App);
