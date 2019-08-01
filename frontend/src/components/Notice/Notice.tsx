import React, { useContext } from "react";
import {
  Snackbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Typography
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import NotificationContext, {
  NextMsg
} from "../../hooks/NotificationContext/NotificationContext";
import CatFace from "../../img/billy-face.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    icon: {
      width: "50px",
      height: "50px",
      marginRight: "20px"
    }
  })
);

const Notice: React.SFC = () => {
  const classes = useStyles();
  const [[noti], dispatch] = useContext(NotificationContext);
  const handleClose = () => NextMsg(dispatch);
  if (!noti) return <></>;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={!!noti}
      autoHideDuration={4000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={
        <span className={classes.message}>
          <img className={classes.icon} src={noti.icon || CatFace} />
          <Typography variant="h4" id="message-id">
            {noti.msg}
          </Typography>
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      ]}
    />
  );
};

export default Notice;
