import { shallow } from "enzyme";
import * as React from "react";

import { Form } from "../lib";

describe("Form", () => {
  it("should renders", () => {
    const wrapper = shallow(<Form />);

    expect(wrapper.find("form").exists()).toBe(true);
  });
});
