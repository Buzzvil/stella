import React from "react";
import renderer from "react-test-renderer";

import Star from "./Star";

it("displays with empty image when value is 0", () => {
  const instance = renderer.create(<Star value={0} />).root;
  const element = instance.findByType("img");
  expect(element.props.src).toEqual("Star-empty.svg");
});

it("displays with half filled image when value is .5", () => {
  const instance = renderer.create(<Star value={0.5} />).root;
  const element = instance.findByType("img");
  expect(element.props.src).toEqual("Star-half.svg");
});

it("displays with filled image when value is 1", () => {
  const instance = renderer.create(<Star value={1} />).root;
  const element = instance.findByType("img");
  expect(element.props.src).toEqual("Star-filled.svg");
});
