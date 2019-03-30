import React from "react";
import Styled from "styled-components";

import StarEmpty from "../../img/Star-empty.svg";
import StarHalf from "../../img/Star-half.svg";
import StarFilled from "../../img/Star-filled.svg";

interface StarProps {
  value: number;
}

const StarImg = Styled.img`
  height: 1em;
`;

const Star: React.SFC<StarProps> = ({ value }) => {
  const img = value >= 1 ? StarFilled : value >= 0.5 ? StarHalf : StarEmpty;
  return <StarImg src={img} />;
};

export default Star;
