import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";

const style = {
  paddingLeft: "2.14em",
  paddingRight: "2.14em",
  height: "2.571em",
  boxShadow: "none"
};

const RoundButton: React.SFC<FabProps> = ({ style: propsStyle = {}, ...props }) => (
  <Fab variant="extended" color="primary" style={{...style, ...propsStyle}} {...props} />
);

export default RoundButton;
