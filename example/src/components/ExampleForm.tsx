import React, { useState } from 'react';
import * as Yup from 'yup';

import { Form, Scope, SubmitHandler } from '../../../lib';
import { Input, Select, FileInput } from '../../../lib/styled';
import { Button, ReactSelect, DatePicker } from '../styled';

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
}

function ExampleForm({ className = '' }) {
  const [useShippingAsBilling, setUseShippingAsBilling] = useState<boolean>(
    true
  );

  const [formData] = useState<Data>({
    name: '',
    profile: '',
    theme: '',
    tech: 'node',
    people: ['1', '3'],
    date: new Date(),
    billingAddress: {
      number: 833,
    },
    attach: '',
  });

  const handleSubmit: SubmitHandler<Data> = (data, { resetForm }) => {
    // eslint-disable-line no-cosole
    console.log(data);
    resetForm();
  };

  return (
    <Form
      initialData={formData}
      context={{ useShippingAsBilling }}
      schema={schema}
      onSubmit={handleSubmit}
      className={className}
    >
      <Input name="name" label="Nome" placeholder="Prencha seu nome" />
      <Input
        multiline
        name="profile"
        label="Perfil"
        placeholder="Fale um pouco sobre você"
      />

      <Select
        name="theme"
        label="Tema"
        placeholder="Selecione..."
        options={[
          { id: 'dracula', title: 'Dracula' },
          { id: 'material', title: 'Material' },
          { id: 'shades-of-purple', title: 'Shades of Purple' },
        ]}
      />

      <ReactSelect
        name="tech"
        label="Tecnologia"
        options={[
          { id: 'react', title: 'ReactJS' },
          { id: 'node', title: 'NodeJS' },
          { id: 'rn', title: 'React Native' },
        ]}
      />

      <ReactSelect
        name="people"
        label="Equipe"
        multiple
        options={[
          { id: '1', title: 'Diego' },
          { id: '2', title: 'João' },
          { id: '3', title: 'Higo' },
        ]}
      />

      <DatePicker name="date" label="Data" />

      <h2 className="section-title">Endereço de Cobrança</h2>

      <Scope path="billingAddress">
        <Input name="street" label="Logradouro" placeholder="Nome da rua" />
        <Input name="number" label="Número" placeholder="Número do endereço" />
      </Scope>

      <div className="useShippingAsBilling">
        <label htmlFor="useShippingAsBilling">
          Usar endereço de cobrança para entrega
        </label>
        <input
          type="checkbox"
          id="useShippingAsBilling"
          name="useShippingAsBilling"
          checked={useShippingAsBilling}
          onChange={e => setUseShippingAsBilling(e.target.checked)}
        />
      </div>

      <h2 className="section-title">Endereço de Entrega</h2>

      <Scope path="shippingAddress">
        <Input
          name="street"
          label="Logradouro"
          placeholder="Nome da rua"
          disabled={useShippingAsBilling}
        />
        <Input
          name="number"
          label="Número"
          placeholder="Número do endereço"
          disabled={useShippingAsBilling}
        />
      </Scope>

      <FileInput
        name="attach"
        label="Anexo"
        placeholder="Procurar arquivos"
        selectedText="arquivos selecionados"
        customController
        multiple
      />

      <Button type="submit">Enviar</Button>
    </Form>
  );
}

export default ExampleForm;
