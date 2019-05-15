import React from "react";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import { act, render, fireEvent, wait } from "react-testing-library";
import * as Yup from "yup";

import { Form, Choice } from "../../lib";

describe("Form", () => {
  it("should return undefined if no option select when multiple", () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <Form onSubmit={submitMock}>
        <Choice
          name="tech"
          multiple
          options={[
            { id: "node", label: "NodeJS" },
            { id: "react", label: "ReactJS" },
            { id: "rn", label: "React Native" }
          ]}
        />
      </Form>
    );

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith({
      tech: undefined
    });
  });

  it("should return undefined if no option select", () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <Form onSubmit={submitMock}>
        <Choice
          name="tech"
          options={[
            { id: "node", label: "NodeJS" },
            { id: "react", label: "ReactJS" },
            { id: "rn", label: "React Native" }
          ]}
        />
      </Form>
    );

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith({
      tech: undefined
    });
  });

  it("should return value as array if multiple", () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={submitMock}>
        <Choice
          name="tech"
          multiple
          options={[
            { id: "node", label: "NodeJS" },
            { id: "react", label: "ReactJS" },
            { id: "rn", label: "React Native" }
          ]}
        />
      </Form>
    );

    act(() => {
      fireEvent.click(getByLabelText("NodeJS"));
      fireEvent.click(getByLabelText("ReactJS"));
    });

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith({
      tech: ["node", "react"]
    });
  });

  it("should return value as string unless multiple", () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={submitMock}>
        <Choice
          name="tech"
          options={[
            { id: "node", label: "NodeJS" },
            { id: "react", label: "ReactJS" },
            { id: "rn", label: "React Native" }
          ]}
        />
      </Form>
    );

    act(() => {
      fireEvent.click(getByLabelText("NodeJS"));
      fireEvent.click(getByLabelText("React Native"));
    });

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith({
      tech: "rn"
    });
  });

  it("should return value as string if only one option supplied", () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={submitMock}>
        <Choice name="tech" options={[{ id: "node", label: "NodeJS" }]} />
      </Form>
    );

    act(() => {
      fireEvent.click(getByLabelText("NodeJS"));
    });

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith({
      tech: "node"
    });
  });

  it("should display labels if specified", () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Choice options={[{ id: "node", label: "NodeJS" }]} name="tech" />
      </Form>
    );

    expect(getByText("NodeJS")).toBeDefined();
  });

  it("should not display labels unless specified", () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Choice options={[{ id: "node" }]} name="tech" />
      </Form>
    );

    expect(() => getByText("NodeJS")).toThrow(/^Unable to find an element.*/);
  });

  it("should display errors", async () => {
    const schema = Yup.object().shape({
      tech: Yup.string().required("Tech is required")
    });

    const { getByText, getByTestId } = render(
      <Form schema={schema} onSubmit={jest.fn()}>
        <Choice options={[{ id: "node", label: "NodeJS" }]} name="tech" />
      </Form>
    );

    act(() => {
      fireEvent.submit(getByTestId("form"));
    });

    await wait(() => expect(!!getByText("Tech is required")).toBe(true));
  });
});
