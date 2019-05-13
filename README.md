![](assets/logo.png)

[![NPM](https://img.shields.io/npm/v/@rocketseat/unform.svg)](https://www.npmjs.com/package/@rocketseat/unform)
[![Build Status](https://travis-ci.org/Rocketseat/unform.svg?branch=master)](https://travis-ci.org/Rocketseat/unform)

## Overview

Unform is a performance focused library that helps you creating beautiful forms in React with the power of uncontrolled components performance and React Hooks.

## Main advantages

- Beautiful syntax;
- React Hooks 😍;
- Performance focused;
- Use of uncontrolled components;
- Integration with pickers, dropdowns and other libraries;

## Why not Formik, Redux Form or another library?

Formik/Redux Form has a really great syntax while it has a really poor support to uncontrolled components and deep nested data structures. With unform it's easy to create forms with complex relationships without losing performance.

<!-- ADD GIF EXAMPLE -->

## Roadmap

- Native checkbox/radio support;
- Styled components support;
- React Native support (should we?);
- Better docs;

## Installation

Just add unform to your project:

```
yarn add @rocketseat/unform
```

## Table of contents

- [Guides](#guides)
  - [Basics](#basics)
  - [Nested fields](#nested-fields)
  - [Initial data](#initial-data)
  - [Validation](#validation)
  - [Manipulate data](#manipulate-data)
  - [Custom Elements](#custom-elements)
    - [React Select](#react-select)
    - [React Datepicker](#react-datepicker)

## Guides

### Basics

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {
    console.log(data);

    /**
     * {
     *   email: 'email@example.com',
     *   password: "123456"
     * }
     */
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="email" />
      <Input name="password" type="password" />

      <button type="submit">Sign in</button>
    </Form>
  );
}
```

### Nested fields

```js
import React from "react";
import { Form, Input, Scope } from "@rocketseat/unform";

function App() {
  function handleSubmit(data) {
    console.log(data);

    /**
     * {
     *   name: 'Diego',
     *   address: { street: "Name of street", number: 123 }
     * }
     */
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" />

      <Scope path="address">
        <Input name="street" />
        <Input name="number" />
      </Scope>

      <button type="submit">Save</button>
    </Form>
  );
}
```

### Initial data

```js
import React from "react";
import { Form, Input, Scope } from "@rocketseat/unform";

function App() {
  const initialData = {
    name: 'John Doe',
    address: {
      street: 'Sample Avenue',
    },
  }

  function handleSubmit(data) {};

  return (
    <Form onSubmit={handleSubmit} initialData={initialData}>
      <Input name="name" />

      <Scope path="address">
        <Input name="street" />
        <Input name="number" />
      </Scope>

      <button type="submit">Save</button>
    </Form>
  );
}
```

### Validation

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Custom invalid email message')
    .required('Custom required message'),
  password: Yup.string().min(4).required(),
})

function App() {
  function handleSubmit(data) {};

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="email" />
      <Input name="password" type="password" />

      <button type="submit">Save</button>
    </Form>
  );
}
```

### Manipulate data

```js
import React, { useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().when('$updatePassword', {
    is: true,
    then: Yup.string().min(4).required(),
    otherwise: Yup.string().strip(true)
  }),
})

function App() {
  const [updatePassword, setUpdatePassword] = useState(false);

  const initialData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  }

  function handleSubmit(data) {};

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

      <button type="submit">Save</button>
    </Form>
  );
}
```

## Custom elements

Sometimes we need to use third-party component in our forms. But don't you worry, Unform has your back! You can do that via `useField` which provides all the resources you need to use your component with Unform.

### React select

```js
import React, { useState } from "react";
import { Form, useField } from "@rocketseat/unform";
import Select from 'react-select';

/* You can't use your component directly, you have to wrap it
around another component, or you won't be able to use useField properly */
function ReactSelect({ name }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  function getValue() {
    return value.reduce((res, item) => {
      res.push(item.value);
      return res;
    }, []);
  }

  return (
    <>
      <Select
        name="techs"
        isMulti
        options={[
          { value: "react", label: "ReactJS" },
          { value: "node", label: "NodeJS" },
          { value: "rn", label: "React Native" }
        ]}
        value={value}
        onChange={(data) => setValue(data)}
        ref={() => registerField({ name: fieldName, ref: getValue })}
      />

      {error && <span>{error}</span>}
    </>
  )
}

function App() {
  const initialData = {
    techs: [
      {
        value: 'react', label: 'ReactJS'
      },
    ],
  }

  function handleSubmit(data) {};

  return (
    <Form initialData={initialData} onSubmit={handleSubmit}>
      <ReactSelect name="techs" />

      <button type="submit">Save</button>
    </Form>
  );
}
```

### React datepicker

```js
import React, { useState } from "react";
import { Form, useField } from "@rocketseat/unform";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

/* You can't use your component directly, you have to wrap it
around another component, or you won't be able to use useField properly */
function ReactDate({ name }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  function getValue() {
    return value;
  }

  return (
    <>
      <DatePicker
        selected={value}
        onChange={setValue}
        ref={() => registerField({ name: fieldName, ref: getValue })}
      />
      {error && <span>{error}</span>}
    </>
  )
}

function App() {
  function handleSubmit(data) {};

  return (
    <Form onSubmit={handleSubmit}>
      <ReactDate name="birthday" />

      <button type="submit">Save</button>
    </Form>
  );
}
```

## Contribute

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

MIT © [Rocketseat](https://github.com/Rocketseat)
