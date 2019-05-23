import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';

import {
 Form, Input, useSubmit, Scope,
} from '../../lib/native';

const Submit = () => {
  const handleSubmit = useSubmit();
  return (
    <TouchableOpacity onPress={handleSubmit}>
      <Text>Send</Text>
    </TouchableOpacity>
  );
};

const schema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  email: Yup.string()
    .email('Email needs to be valid')
    .required('This field is required'),
  profile: Yup.string().required('This field is required'),
  address: Yup.object().shape({
    street: Yup.string().required('This field is required'),
    number: Yup.string().required('This field is required'),
  }),
});

const initialData = {
  name: 'Italo Menezes',
  email: 'italo@email.com',
  profile: 'Omnistack developer',
  address: {
    street: 'A nice street',
    number: '100',
  },
};

export default function App() {
  return (
    <SafeAreaView>
      <Form
        initialData={initialData}
        schema={schema}
        onSubmit={(data, { resetForm }) => {
          console.log(data);
          resetForm();
        }}
      >
        <Input name="name" label="Name" />
        <Input name="profile" label="Profile" />
        <Input name="email" label="Email" />
        <Scope path="address">
          <Input name="state" label="State" />
          <Input name="country" label="Country" />
        </Scope>
        <Submit />
      </Form>
    </SafeAreaView>
  );
}
