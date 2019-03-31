import React from "react";
import Styled from "styled-components";

import Star from "../Star/Star";

interface StarRatingProps {
  value: number;
  min?: number;
  max?: number;
  count?: number;
}

const StarRating: React.SFC<StarRatingProps> = ({
  value,
  count = 5,
  min = 0,
  max = count
}) => {
  const normalizedValue =
    (Math.max(min, Math.min(max, value)) - min) / (max - min);
  const starValue = count * normalizedValue;

  return (
    <div>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <Star key={i} value={Math.max(0, Math.min(1, starValue - i))} />
        ))}
    </div>
  );
};

export default StarRating;
