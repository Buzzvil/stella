import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";

const style = {
  padding: 0,
  boxShadow: "none"
};

const RoundButton: React.SFC<FabProps> = ({ style: propsStyle = {}, ...props }) => (
  <Fab variant="extended" color="primary" style={{...style, ...propsStyle}} {...props} />
);

export default RoundButton;
