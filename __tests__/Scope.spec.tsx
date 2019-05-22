import React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { render } from 'react-testing-library';

import { Form, Scope, Input } from '../lib';

describe('Form', () => {
  it('should name form elements based on scope', () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <Scope path="profile">
          <Input name="name" />
        </Scope>
      </Form>,
    );

    expect(!!container.querySelector("input[name='profile.name']")).toBe(true);
  });

  it('should concat scope paths', () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <Scope path="profile">
          <Scope path="user">
            <Input name="name" />
          </Scope>
        </Scope>
      </Form>,
    );

    expect(!!container.querySelector("input[name='profile.user.name']")).toBe(
      true,
    );
  });
});
