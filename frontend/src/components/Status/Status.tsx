import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { withTheme } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import { string } from "prop-types";

interface StatusProps extends FabProps {
  free: boolean;
  theme: Theme;
}

const Status: React.SFC<StatusProps> = ({ free, theme, style: propsStyle = {}, ...props }) => {
  const style = {
    boxShadow: "none",
    color: "#FFFFFF",
    backgroundColor: free ? theme.palette.primary.main : theme.palette.error.main
  };


  return (
    <Fab variant="round" style={{...style, ...propsStyle}} {...props}>
      {free ? <CheckIcon /> : <CloseIcon />}
    </Fab>)
};

export default withTheme(Status);
