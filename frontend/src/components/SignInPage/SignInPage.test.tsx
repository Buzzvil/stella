import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom';

import SignInPage from "./SignInPage";

it("renders at least one button", () => {
  const instance = renderer.create(
    <MemoryRouter>
      <SignInPage />
    </MemoryRouter>
  ).root;
  const buttons = instance.findAllByType("button");
  expect(buttons.length).toBeGreaterThan(0);
});
