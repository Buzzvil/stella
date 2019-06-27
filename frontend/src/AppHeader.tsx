import React, { Component } from 'react';
import RoundButton from './components/RoundButton/RoundButton';
import { AppBar, Toolbar, Button, IconButton, Icon, withStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
});

class AppHeader extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <div className="grow">
            <RoundButton color="secondary">Request a book</RoundButton>
          </div>
          <RoundButton color="secondary"><a href="/auth/slack/login">Sign In</a></RoundButton>
          {/* <IconButton>
            <Icon>account_circle</Icon>
          </IconButton> */}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(AppHeader);
