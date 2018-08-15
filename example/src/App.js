import React, { Component } from "react";
import Form, { Field, Scope } from "unform";

export default class App extends Component {
  state = {
    data: {
      address: {
        street: "Rua Teste"
      }
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={console.log} initialValues={this.state.data}>
          <Field label="Name" name="name" />

          <Scope path="address">
            <Field label="Street" name="street" />
            <Field type="number" label="Number" name="number" />
          </Scope>

          <button type="submit">Save</button>
        </Form>
      </div>
    );
  }
}
