import React from "react";
import Styled from "styled-components";

import { storiesOf } from "@storybook/react";

import RatingDropdown from "./RatingDropdown";

const SizedContainer = Styled.div`
  font-size: 30px;
`;

storiesOf("Organisms|RatingDropdown", module)
  .add("Rating: 0", () => <RatingDropdown value={0} />)
  .add("Rating: 2.5", () => <RatingDropdown value={2.5} />)
  .add("Rating: 5", () => <RatingDropdown value={5} />);
