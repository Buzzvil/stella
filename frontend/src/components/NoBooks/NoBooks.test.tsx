import React from "react";
import renderer from "react-test-renderer";

import NoBooks from "./NoBooks";

it("renders with one button", () => {
  const instance = renderer.create(<NoBooks />).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toEqual(1);
});
