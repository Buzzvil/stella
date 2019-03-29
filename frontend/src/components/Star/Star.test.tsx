import React from "react";
import renderer from "react-test-renderer";

import Star from "./Star";

it("displays with empty image when value is 0", () => {
  expect(renderer.create(<Star value={0} />)).toMatchSnapshot();
});

it("displays with empty image when value is .5", () => {
  expect(renderer.create(<Star value={0.5} />)).toMatchSnapshot();
});

it("displays with empty image when value is 1", () => {
  expect(renderer.create(<Star value={0.5} />)).toMatchSnapshot();
});
