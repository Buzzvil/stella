import React from "react";
import renderer from "react-test-renderer";

import CircleButton from "./CircleButton";

it("renders single button", () => {
  const instance = renderer.create(<CircleButton><img/></CircleButton>).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toEqual(1);
});
