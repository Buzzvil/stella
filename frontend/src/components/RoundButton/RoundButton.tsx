import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";

const style = {
  paddingLeft: "2.14em",
  paddingRight: "2.14em",
  height: "2.571em",
  boxShadow: "none"
};

const RoundButton: React.SFC<FabProps> = ({ ...props }) => (
  <Fab variant="extended" color="primary" style={style} {...props} />
);

export default RoundButton;
