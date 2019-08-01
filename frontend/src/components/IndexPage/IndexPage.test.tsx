import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom';

import IndexPage from "./IndexPage";

it("renders at least one button", () => {
  const instance = renderer.create(
    <MemoryRouter>
      <IndexPage />
    </MemoryRouter>
  ).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toBeGreaterThan(0);
});

it("renders at least one input", () => {
  const instance = renderer.create(
    <MemoryRouter>
      <IndexPage />
    </MemoryRouter>
  ).root;
  const inputs = instance.findAllByType("input");
  expect(inputs.length).toBeGreaterThan(0);
});
