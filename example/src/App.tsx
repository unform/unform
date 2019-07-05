import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import * as Yup from 'yup';

import {
  Form,
  Input,
  Select,
  Scope,
  SubmitHandler,
  FileInput,
  Check,
  Choice,
} from '../../lib';
import DatePicker from './components/DatePicker';
import ReactSelect from './components/ReactSelect';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  profile: Yup.string().required(),
  theme: Yup.string().required(),
  tech: Yup.string().required(),
  date: Yup.date().required(),
  people: Yup.array(Yup.string())
    .min(2)
    .required(),
  billingAddress: Yup.object().shape({
    street: Yup.string().required(),
    number: Yup.string().required(),
  }),
  shippingAddress: Yup.object().when('$useShippingAsBilling', {
    is: false,
    then: Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string().required(),
    }),
    otherwise: Yup.object().strip(true),
  }),
  attach: Yup.string(),
  termo1: Yup.boolean(),
  termo2: Yup.boolean().oneOf([true], 'Termo 2 é obrigatório'),
  choice1: Yup.array(Yup.string())
    .min(1)
    .required(),
  choice2: Yup.string().required(),
});

interface Data {
  name: string;
  profile: string;
  theme: string;
  tech: string;
  people: string[];
  date: Date;
  billingAddress: {
    number: number;
  };
  attach: string;
  termo1: boolean;
  termo2: boolean;
  choice1: string[];
  choice2: string;
}

function App() {
  const [useShippingAsBilling, setUseShippingAsBilling] = useState<boolean>(
    true
  );

  const [formData] = useState<Data>({
    name: 'Diego',
    profile: 'CTO na Rocketseat',
    theme: 'dracula',
    tech: 'node',
    people: ['1', '3'],
    date: new Date(),
    billingAddress: {
      number: 833,
    },
    attach: '',
    termo1: true,
    termo2: false,
    choice1: ['2', '3'],
    choice2: '',
  });

  const handleSubmit: SubmitHandler<Data> = (data, { resetForm }) => {
    console.log(data);

    resetForm();
  };

  return (
    <Form
      initialData={formData}
      context={{ useShippingAsBilling }}
      schema={schema}
      onSubmit={handleSubmit}
    >
      <Input name="name" label="Nome" />
      <Input multiline name="profile" label="Perfil" />

      <Select
        name="theme"
        placeholder="Selecione..."
        options={[
          { id: 'dracula', title: 'Dracula' },
          { id: 'material', title: 'Material' },
          { id: 'shades-of-purple', title: 'Shades of Purple' },
        ]}
      />

      <ReactSelect
        name="tech"
        options={[
          { id: 'react', title: 'ReactJS' },
          { id: 'node', title: 'NodeJS' },
          { id: 'rn', title: 'React Native' },
        ]}
      />

      <ReactSelect
        name="people"
        multiple
        options={[
          { id: '1', title: 'Diego' },
          { id: '2', title: 'João' },
          { id: '3', title: 'Higo' },
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

      <FileInput name="attach" label="Attachment" />

      <br />
      <Check name="termo1" label="Aceita o Termo 1?" />
      <br />
      <Check name="termo2" label="Aceita o Termo 2 (obrigatório)?" />
      <br />

      <Choice
        name="choice1"
        options={[
          { value: '1', label: 'Um' },
          { value: '2', label: 'Dois' },
          { value: '3', label: 'Três' },
          { value: '4', label: 'Quatro' },
        ]}
        multiple
      />
      <br />

      <Choice
        name="choice2"
        options={[
          { value: '1', label: 'Um' },
          { value: '2', label: 'Dois' },
          { value: '3', label: 'Três' },
          { value: '4', label: 'Quatro' },
        ]}
      />
      <br />

      <br />
      <button type="submit">Enviar</button>
    </Form>
  );
}

export default hot(App);
