import React from "react";

// import Star from "../Star/Star";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import styled from "styled-components";
import { ReactComponent as StarSVG } from "../../img/Star.svg";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  width: 230px;
  height: 48px;
  background: #3D5163;
  box-shadow: 0px 15.7925px 21.5352px rgba(0, 0, 0, 0.2), 0px 12.9211px 66.0412px rgba(0, 0, 0, 0.12), 0px 34.4563px 54.5557px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
`
const RatingBox = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const ValueBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 62px;
  background: #12B8A5;
  color: #FFFFFF;
  font-size: 21px;
  font-weight: bold;
  letter-spacing: 0.25px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

interface RatingDropdownProps {
  value: number;
  min?: number;
  max?: number;
  count?: number;
}

const RatingDropdown: React.SFC<RatingDropdownProps> = ({
  value,
  count = 5,
  min = 0,
  max = count
}) => {
  const normalizedValue =
    (Math.max(min, Math.min(max, value)) - min) / (max - min);
  const starValue = count * normalizedValue;

  return (
    <Container>
      <RatingBox>
        {/* <Rating value={value} precision={0.5} icon={<StarSVG />} /> */}
        <Rating value={value} precision={0.5} />
      </RatingBox>
      <ValueBox>{starValue}</ValueBox>
    </Container>
  );
};

export default RatingDropdown;
