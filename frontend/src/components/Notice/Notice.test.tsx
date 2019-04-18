import React from "react";
import renderer from "react-test-renderer";

import Notice from "./Notice";

it("renders single notice", () => {
  const instance = renderer.create(<Notice label={"test notice"} />).root;
  const buttons = instance.findAllByType(Notice);
  expect(buttons.length).toEqual(1);
});
