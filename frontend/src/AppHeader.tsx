import React, { Component } from 'react';
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
            <Button variant="contained">Request a book</Button>
          </div>
          <Button variant="contained"><a href="/auth/slack/login">Sign In</a></Button>
          {/* <IconButton>
            <Icon>account_circle</Icon>
          </IconButton> */}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(AppHeader);
