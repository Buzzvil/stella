import React from "react";
import Styled from "styled-components";

import { storiesOf } from "@storybook/react";

import StarRating from "./StarRating";

const SizedContainer = Styled.div`
  font-size: 30px;
`;

storiesOf("StarRating", module)
  .add("Rating: 0", () => <StarRating value={0} />)
  .add("Rating: 2.5", () => <StarRating value={2.5} />)
  .add("Rating: 5", () => <StarRating value={5} />)
  .add("Rating: 48.1%, count: 6", () => <StarRating value={.481} max={1} count={6} />)
  .add("Resized", () => (
    <SizedContainer>
      <StarRating value={2.5} />
    </SizedContainer>
  ));
