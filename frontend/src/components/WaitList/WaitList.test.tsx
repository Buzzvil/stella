import React from "react";
import renderer from "react-test-renderer";

import WaitList from "./WaitList";

it("renders with one button", () => {
  const instance = renderer.create(<WaitList />).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toEqual(1);
});
