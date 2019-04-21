import { shallow } from "enzyme";
import React from "react";

import { Form } from "../lib";

describe("Form", () => {
  it("should register ref when input is created", () => {
    const wrapper = shallow(<Form />);

    expect(wrapper.find("form").exists()).toBe(true);

    // expect(wrapper.instance()).to
  });
});
