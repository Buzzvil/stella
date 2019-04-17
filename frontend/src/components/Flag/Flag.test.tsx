import React from "react";
import renderer from "react-test-renderer";

import Flag from "./Flag";

it("renders single button", () => {
  const instance = renderer.create(<Flag />).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toEqual(1);
});
