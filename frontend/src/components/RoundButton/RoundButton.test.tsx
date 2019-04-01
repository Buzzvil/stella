import React from "react";
import renderer from "react-test-renderer";

import RoundButton from "./RoundButton";

it("renders single button", () => {
  const instance = renderer.create(<RoundButton>Test</RoundButton>).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toEqual(1);
});
