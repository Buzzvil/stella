import React, { SFC, ReactComponentElement } from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { withTheme } from '@material-ui/core/styles';
import styled from "styled-components";

import { ReactComponent as StarSVG } from "../../img/Star.svg";

enum Color {
  DEFAULT = 1,
  PRIMARY,
}

interface StarProps {
  value: number;
  style?: React.CSSProperties;
  color?: Color;
  theme: Theme;
}

interface StarColorProps {
  theme?: Theme;
  color?: Color;
  fillWidth: number;
}

const Container = styled.div`
  position: relative;
  height: 1.5em;
  width: 1.5em;
`;

const baseStyle = ({theme, color = Color.DEFAULT, fillWidth}: StarColorProps) => {
  let resolvedColor;
  switch (color) {
    case Color.PRIMARY:
      resolvedColor = theme && theme.palette.primary.main;
      break;
  }
  resolvedColor = resolvedColor || "#FFE76A";
return `
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  g path {
    fill: ${color};
  };
  rect {
    width: ${24 * fillWidth}px;
  };
`
};

const StyledStar = styled(({theme, color, fillWidth, ...props}) => <StarSVG {...props}/>)<StarColorProps>`${baseStyle}`;

const Star: React.SFC<StarProps> = ({ value, color, theme, ...props }) => {
  const clampedValue = value >= 1 ? 1 : value >= 0.5 ? 0.5 : 0;
  return (
    <Container>
      <StyledStar theme={theme} fillWidth={clampedValue} color={color} {...props} />
    </Container>
  );
};

export default withTheme()(Star);
