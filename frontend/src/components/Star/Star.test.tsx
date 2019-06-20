import React from "react";
import renderer from "react-test-renderer";

import Star from "./Star";

it("renders single svg element", () => {
  const render = renderer.create(<Star value={0} />);
  const elements = render.root.findAllByType("svg");
  expect(elements.length).toEqual(1);
});

it("displays with empty image when value is 0", () => {
  const render = renderer.create(<Star value={0} />);
  const svg = render.root.findByType("svg");
  expect(svg.props.className).toMatchInlineSnapshot(`"sc-bwzfXH iHgQBh"`);
});

it("displays with half filled image when value is .5", () => {
  const render = renderer.create(<Star value={0.5} />);
  const svg = render.root.findByType("svg");
  expect(svg.props.className).toMatchInlineSnapshot(`"sc-bwzfXH kuAcAi"`);
});

it("displays with filled image when value is 1", () => {
  const render = renderer.create(<Star value={1} />);
  const svg = render.root.findByType("svg");
  expect(svg.props.className).toMatchInlineSnapshot(`"sc-bwzfXH eXPEPj"`);
});
