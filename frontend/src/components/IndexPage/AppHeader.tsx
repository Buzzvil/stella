import React from 'react';
import styled from "styled-components";
import { User } from 'proto/usersvc_pb';
import { Button, Avatar } from '@material-ui/core';

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
  currentUser?: User
}

const AppHeader: React.SFC<AppHeaderProps> = ({ currentUser }) => {
  return (
    <Header>
      <Button variant="contained" color="primary">Request a Book</Button>
      <Actions>
        {currentUser &&
          <Avatar alt={currentUser.getName()} src={currentUser.getImage()} />
        }
      </Actions>
    </Header>
  )
}

export default AppHeader;
