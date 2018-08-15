![](assets/logo.png)

[![NPM](https://img.shields.io/npm/v/unform.svg)](https://www.npmjs.com/package/unform) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Overview

Unform is a performance focused library that helps you creating beautifull forms in React with the power of uncontrolled components performance.

## Main advantages

- Beautifull syntax;
- Performance focused;
- Use of uncontrolled components;
- Integration with pickers, dropdowns and other libraries;

## Why not Formik, Redux Form or another library?

Formik/Redux Form has a really great syntax while it has a really poor support to uncontrolled components and deep nested data structures. With unform it's easy to create forms with complex relationships without loosing performance.

<!-- ADD GIF EXAMPLE -->

## Roadmap

- Native checkbox/radio support;
- Unit tests;
- Typescript support;
- Add more examples;
- Styled components support;
- Error handling support;
- Validation;

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
import React, { Component } from "react";
import Form, { Field } from "unform";

export default class App extends Component {
  handleSubmit = data => {
    console.log(data);

    /**
     * {
     *   email: 'email@example.com',
     *   password: "123456"
     * }
     */
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Field name="email" />
        <Field name="password" type="password" />

        <button type="submit">Sign in</button>
      </Form>
    );
  }
}
```

### Nested fields

```js
import React, { Component } from "react";
import Form, { Field } from "unform";

export default class App extends Component {
  handleSubmit = data => {
    console.log(data);

    /**
     * {
     *   name: 'Diego',
     *   address: { street: "Name of street", number: 123 }
     * }
     */
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Field name="name" />

        <Scope path="address">
          <Field name="street" />
          <Field name="number" />
        </Scope>

        <button type="submit">Save</button>
      </Form>
    );
  }
}
```

### Initial data

```js
import React, { Component } from "react";
import Form, { Field } from "unform";

export default class App extends Component {
  state = {
    data: {
      address: { street: "Example street" }
    }
  };

  handleSubmit = () => {};

  render() {
    return (
      <Form onSubmit={this.handleSubmit} initialValues={this.state.data}>
        <Field name="name" />

        <Scope path="address">
          <Field name="street" />
          <Field name="number" />
        </Scope>

        <button type="submit">Save</button>
      </Form>
    );
  }
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
