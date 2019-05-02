import React from "react";
import Styled from "styled-components";

import { storiesOf } from "@storybook/react";

import Star from "./Star";

const SizedContainer = Styled.div`
  font-size: 30px;
`;

storiesOf("Components|Star", module)
  .add("Empty", () => <Star value={0} />)
  .add("Half", () => <Star value={0.5} />)
  .add("Filled", () => <Star value={1} />)
  .add("Resized", () => (
    <SizedContainer>
      <Star value={1} />
    </SizedContainer>
  ));
