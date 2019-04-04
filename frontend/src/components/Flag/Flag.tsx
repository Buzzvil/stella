import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";
import FlagIcon from "@material-ui/icons/Flag";

interface FlagProps extends FabProps {
  active?: Boolean;
}

const baseStyle = {
  padding: 0,
  boxShadow: "none"
};

const offStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  color: "black"
};

const RoundButton: React.SFC<FlagProps> = ({
  active = false,
  style: propStyles = {},
  ...props
}) => (
  <Fab
    variant="extended"
    color="primary"
    style={{ ...baseStyle, ...(active ? {} : offStyle), ...propStyles }}
    {...props}
  >
    <FlagIcon />
  </Fab>
);

export default RoundButton;
