import React, { Component } from 'react';
import styled from "styled-components";
import { User } from 'proto/usersvc_pb';
import { Toolbar, Button, Avatar } from '@material-ui/core';
import RoundButton from './components/RoundButton/RoundButton';

const Header = styled.div`
  display: flex;
  min-height: 84px;
  padding-left: 32px;
  padding-right: 32px;
  align-items: center;
  justify-content: space-between;
`;

const Actions = styled.div`
  margin-left: auto;
`;

interface AppHeaderProps {
  currentUser?: User | null
}

const AppHeader: React.SFC<AppHeaderProps> = ({ currentUser }) => {
  return (
    <Header>
      <Button variant="contained" color="primary">Request a Book</Button>
      <Actions>
        {currentUser ?
          <Avatar alt={currentUser.getName()} src={currentUser.getImage()} /> :
          <a href="/auth/slack/login"><Button variant="contained" color="primary">Sign In</Button></a>
        }
      </Actions>
    </Header>
  )
}

export default AppHeader;
