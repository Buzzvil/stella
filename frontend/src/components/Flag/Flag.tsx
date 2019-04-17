import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";
import FlagIcon from "@material-ui/icons/Flag";

interface FlagProps extends FabProps {
  active?: Boolean;
}

const baseStyle = {
  height: 40,
  minWidth: 40,
  padding: 0,
  boxShadow: "none"
};

const offStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  color: "black"
};

const iconStyle = {
  height: 24
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
    <FlagIcon style={iconStyle} />
  </Fab>
);

export default RoundButton;
