import React from "react";
import renderer from "react-test-renderer";

import Status from "./Status";

it("renders single status", () => {
  const instance = renderer.create(<Status free={true} />).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toEqual(1);
});
