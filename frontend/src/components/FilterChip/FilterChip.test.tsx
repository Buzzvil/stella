import React from "react";
import renderer from "react-test-renderer";

import FilterChip from "./FilterChip";

it("displays text when label given", () => {
  const instance = renderer.create(<FilterChip label="test"></FilterChip>).root;
  const chip = instance.findByType(FilterChip);
  expect(chip.props.label).toEqual("test");
});
