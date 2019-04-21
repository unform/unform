import update from "immutability-helper";
import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import * as Yup from "yup";

import { Form, Input, Textarea, Select, Scope } from "../../dist";

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
  }),
  modules: Yup.array(
    Yup.object().shape({
      id: Yup.string(),
      title: Yup.string().required(),
      lessons: Yup.array(
        Yup.object().shape({
          id: Yup.string(),
          title: Yup.string().required()
        })
      )
    })
  )
});

interface Data {
  name: string;
  profile: string;
  billingAddress: {
    number: number;
  };
  modules: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
    }[];
  }[];
}

function App() {
  const [useShippingAsBilling, setUseShippingAsBilling] = useState<boolean>(
    true
  );
  const [formData, setData] = useState<Data>({
    name: "Diego",
    profile: "CTO na Rocketseat",
    billingAddress: {
      number: 833
    },
    modules: [
      {
        id: "1",
        title: "Módulo 1",
        lessons: [
          { id: "1", title: "Aula 1" },
          { id: "2", title: "Aula 2" },
          { id: "3", title: "Aula 3" }
        ]
      },
      {
        id: "2",
        title: "Módulo 2",
        lessons: [
          { id: "4", title: "Aula 4" },
          { id: "5", title: "Aula 5" },
          { id: "6", title: "Aula 6" }
        ]
      }
    ]
  });

  function addLesson(moduleIndex) {
    const newData = update(formData, {
      modules: { [moduleIndex]: { lessons: { $push: {} } } }
    });

    setData(newData);
  }

  function up() {}

  function down() {}

  function handleSubmit(data) {
    console.log(data);
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

      <br />
      <br />
      <br />

      <button type="button" onClick={() => addLesson(0)}>
        Adicionar lesson
      </button>

      {formData.modules.map((module, moduleIndex) => (
        <Scope key={module.id} path={`modules[${moduleIndex}]`}>
          <Input name="id" type="hidden" />
          <hr />
          <Input name="title" />
          <br />
          <strong>Aulas</strong>
          {module.lessons.map((lesson, lessonIndex) => (
            <Scope key={lesson.id} path={`lessons[${lessonIndex}]`}>
              <Input name="id" type="hidden" />
              <br />
              <Input name="title" />
              <button type="button" onClick={() => up()}>
                Up
              </button>
              <button type="button" onClick={() => down()}>
                Down
              </button>
            </Scope>
          ))}
        </Scope>
      ))}

      <button type="submit">Enviar</button>
    </Form>
  );
}

export default hot(App);
