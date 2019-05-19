import React from "react";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import { act, render, fireEvent, wait } from "react-testing-library";
import * as Yup from "yup";

import { Form, Input, Textarea, Select, Scope } from "../lib";
import CustomInputClear from "./utils/CustomInputClear";
import CustomInputParse from "./utils/CustomInputParse";

describe("Form", () => {
  it("should render form elements", () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <Input name="name" />
        <Textarea name="bio" />
        <Select name="tech" options={[{ id: "node", title: "Node" }]} />
      </Form>
    );

    expect(!!container.querySelector("input[name=name]")).toBe(true);
    expect(!!container.querySelector("textarea[name=bio]")).toBe(true);
    expect(!!container.querySelector("select[name=tech]")).toBe(true);
  });

  it("should load initial data inside form elements", () => {
    const { container } = render(
      <Form onSubmit={jest.fn()} initialData={{ name: "Diego" }}>
        <Input name="name" />
      </Form>
    );

    expect(container.querySelector("input[name=name]")).toHaveAttribute(
      "value",
      "Diego"
    );
  });

  it("should return form elements data on submit", () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form
        onSubmit={submitMock}
        initialData={{ address: { street: "John Doe Avenue" } }}
      >
        <Input name="name" />
        <Scope path="address">
          <Input name="street" />
        </Scope>
      </Form>
    );

    fireEvent.change(getByLabelText("name"), {
      target: { value: "Diego" }
    });

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith(
      {
        name: "Diego",
        address: {
          street: "John Doe Avenue"
        }
      },
      {
        resetForm: expect.any(Function)
      }
    );
  });

  it("should remove unmounted elements from refs", () => {
    const submitMock = jest.fn();

    const { getByTestId, rerender } = render(
      <Form onSubmit={submitMock} initialData={{ name: "Diego" }}>
        <Input name="name" />
      </Form>
    );

    rerender(
      <Form onSubmit={submitMock} initialData={{ another: "Diego" }}>
        <Input name="another" />
      </Form>
    );

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith(
      {
        another: "Diego"
      },
      {
        resetForm: expect.any(Function)
      }
    );
  });

  it("should update data to match schema", async () => {
    const submitMock = jest.fn();
    const schema = Yup.object().shape({
      name: Yup.string(),
      bio: Yup.string().when("$stripBio", {
        is: true,
        then: Yup.string().strip(true)
      })
    });

    const { getByTestId } = render(
      <Form
        schema={schema}
        context={{ stripBio: true }}
        onSubmit={submitMock}
        initialData={{ name: "Diego", bio: "Testing" }}
      >
        <Input name="name" />
        <Input name="bio" />
      </Form>
    );

    act(() => {
      fireEvent.submit(getByTestId("form"));
    });

    await wait(() => {
      expect(submitMock).toHaveBeenCalledWith(
        { name: "Diego" },
        {
          resetForm: expect.any(Function)
        }
      );
    });
  });

  it("should reset form data when resetForm helper is dispatched", () => {
    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={(_, { resetForm }) => resetForm()}>
        <Input name="name" />
        <Select name="tech" options={[{ id: "node", title: "NodeJS" }]} />
      </Form>
    );

    getByLabelText("name").setAttribute("value", "Diego");

    fireEvent.change(getByLabelText("tech"), { target: { value: "node" } });

    fireEvent.submit(getByTestId("form"));

    expect((getByLabelText("name") as HTMLInputElement).value).toBe("");
    expect((getByLabelText("tech") as HTMLSelectElement).value).toBe("");
  });

  it("should be able to have custom value parser", () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <Form onSubmit={submitMock} initialData={{ name: "Diego" }}>
        <CustomInputParse name="name" />
      </Form>
    );

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith(
      {
        name: "Diego-test"
      },
      {
        resetForm: expect.any(Function)
      }
    );
  });

  it("should be able to have custom value clearer", () => {
    const { getByTestId, getByLabelText } = render(
      <Form
        onSubmit={(_, { resetForm }) => resetForm()}
        initialData={{ name: "Diego" }}
      >
        <CustomInputClear name="name" />
      </Form>
    );

    fireEvent.submit(getByTestId("form"));

    expect((getByLabelText("name") as HTMLInputElement).value).toBe("test");
  });
});
