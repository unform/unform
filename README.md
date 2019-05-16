<h1 align="center">

![](assets/logo.png)

</h1>

<h3 align="center">
Create ReactJS uncontrolled form structures with nested fields, validations and much more! 🚀
</h3>

<p align="center">

<img alt="npm" src="https://img.shields.io/npm/v/@rocketseat/unform.svg">

<img alt="dependencies" src="https://travis-ci.org/Rocketseat/unform.svg?branch=master">

</p>

<p align="center">
	<strong>
		<a href="#key-features">Key features</a>
		•
		<a href="#installation">Installation</a>
		•
		<a href="#table-of-contents">Guides</a>
		•
		<a href="#contributing">Contribute</a>
	</strong>
</p>

## Overview

Unform is a performance focused library that helps you creating beautiful forms in React with the power of uncontrolled components performance and React Hooks.

## Key features

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
  - [Reset Form](#reset-form)
  - [Nested fields](#nested-fields)
  - [Initial data](#initial-data)
  - [Validation](#validation)
  - [Manipulate data](#manipulate-data)
  - [Custom Elements](#custom-elements)
    - [React Select](#react-select)
    - [React Datepicker](#react-datepicker)
- [Contributing](#contributing)
  - [Contribution Guidelines](#contributing-guide)
  - [Code of Conduct](#code-of-conduct)
- [License](#license)

## Guides

### Basics

Unform exposes three default form elements: `<Input />`, `<Select />` and `<Textarea />`. Currently, `<Select />` element does not support multiple values, you can use [React Select](#react-select) example to achieve that.

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

### Reset form

```js
import React from "react";
import { Form, Input } from "@rocketseat/unform";

function App() {
  function handleSubmit(data, { resetForm }) {
    resetForm();
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

Below are some examples with [react-select](https://github.com/JedWatson/react-select) and [react-datepicker](https://github.com/Hacker0x01/react-datepicker/).

### React select

```js
import React, { useRef, useEffect } from "react";
import Select from "react-select";

import { useField } from "../../../lib";

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectValue) {
    if (!multiple) {
      return selectValue ? selectValue.id : "";
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "state.value",
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      }
    });
  }, [ref.current, fieldName]);

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
```

### React datepicker

```js
import React, { useRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { useField } from "../../../lib";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "props.selected",
      clearValue: pickerRef => {
        pickerRef.clear();
      }
    });
  }, [ref.current, fieldName]);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

```

## Contributing

Thanks for being interested on making this package better. We encourage everyone to help improving this project with some new features, bug fixes and performance issues. Please take a little bit of your time to read our guides, so this process can be faster and easier.

### Contribution Guidelines

Take a moment to read about our [Contribution Guidelines](/.github/CONTRIBUTING.md) so you can understand how to submit an issue, commit and create pull requests.

### Code of Conduct

We expect you to follow our [Code of Conduct](/.github/CODE_OF_CONDUCT.md). You can read it to understand what kind of behaviour will and will not be tolerated.

## License

MIT © [Rocketseat](https://github.com/Rocketseat)
