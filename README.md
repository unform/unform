![](assets/logo.png)

[![NPM](https://img.shields.io/npm/v/unform.svg)](https://www.npmjs.com/package/unform)

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
- Unit tests;
- Setup CI;
- Add more examples;
- Styled components support;
- React Native support (should we?);
- Better docs;
- Storybook?
- Good messages by default;

## Installation

Just add unform to your project:

```
yarn add unform
```

## Table of contents

- [Guides](#guides)
  - [Basics](#basics)
  - [Nested fields](#nested-fields)
  - [Initial data](#initial-data)

## Guides

### Basics

```js
import React from "react";
import { Form, Input } from "unform";

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
import { Form, Input } from "unform";

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
    <Form onSubmit={this.handleSubmit}>
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
import { Form, Input } from "unform";

function App() {
  const initialData = {
    name: 'John Doe',
    address: {
      street: 'Sample Avenue',
    },
  }

  function handleSubmit(data) {};

  return (
    <Form onSubmit={this.handleSubmit} initialData={initialData}>
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

## Contribute

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

MIT © [Rocketseat](https://github.com/Rocketseat)
