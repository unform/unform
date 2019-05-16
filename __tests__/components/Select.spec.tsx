import React from "react";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import { act, render, fireEvent, wait } from "react-testing-library";
import * as Yup from "yup";

import { Form, Select } from "../../lib";

describe("Form", () => {
  it("should display label", () => {
    const { getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Select
          options={[{ id: "node", title: "NodeJS" }]}
          name="tech"
          label="Tech"
        />
      </Form>
    );

    expect(!!getByText("Tech")).toBe(true);
  });

  it("should display error", async () => {
    const schema = Yup.object().shape({
      tech: Yup.string().required("Tech is required")
    });

    const { getByText, getByTestId } = render(
      <Form schema={schema} onSubmit={jest.fn()}>
        <Select
          options={[{ id: "node", title: "NodeJS" }]}
          name="tech"
          label="Tech"
        />
      </Form>
    );

    act(() => {
      fireEvent.submit(getByTestId("form"));
    });

    await wait(() => expect(!!getByText("Tech is required")).toBe(true));
  });

  it("should return correct selected value", () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={submitMock}>
        <Select
          options={[
            { id: "node", title: "NodeJS" },
            { id: "react", title: "ReactJS" }
          ]}
          name="tech"
          label="Tech"
        />
      </Form>
    );

    act(() => {
      fireEvent.change(getByLabelText("tech"), { target: { value: "react" } });
    });

    fireEvent.submit(getByTestId("form"));

    expect(submitMock).toHaveBeenCalledWith(
      {
        tech: "react"
      },
      {
        resetForm: expect.any(Function)
      }
    );
  });

  // it("should be able to return multiple values", () => {
  //   const submitMock = jest.fn();

  //   const options = [
  //     { id: "node", title: "NodeJS" },
  //     { id: "react", title: "ReactJS" }
  //   ];

  //   const { getByTestId, getByLabelText } = render(
  //     <Form onSubmit={submitMock}>
  //       <Select options={options} multiple name="tech" label="Tech" />
  //     </Form>
  //   );

  //   act(() => {
  //     fireEvent.change(getByLabelText("tech"), {
  //       target: {
  //         value: "tech",
  //         options:
  //       }
  //     });
  //   });

  //   fireEvent.submit(getByTestId("form"));

  //   expect(submitMock).toHaveBeenCalledWith({
  //     tech: ["node", "react"]
  //   });
  // });
});
