import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { Paper, Typography, InputBase, IconButton, Icon } from '@material-ui/core';

const theme = createMuiTheme({});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Typography variant="h1">
              Buzzvil Library
            </Typography>
            <Paper>
              <InputBase placeholder="Book Title..." />
              <IconButton aria-label="Search">
                <Icon>search</Icon>
              </IconButton>
            </Paper>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
