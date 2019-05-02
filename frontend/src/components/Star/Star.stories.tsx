import React from "react";
import Styled from "styled-components";

import { storiesOf } from "@storybook/react";

import Star from "./Star";

const SizedContainer = Styled.div`
  font-size: 30px;
`;

storiesOf("Component|Star", module)
  .add("Component|Empty", () => <Star value={0} />)
  .add("Component|Half", () => <Star value={0.5} />)
  .add("Component|Filled", () => <Star value={1} />)
  .add("Component|Resized", () => (
    <SizedContainer>
      <Star value={1} />
    </SizedContainer>
  ));
