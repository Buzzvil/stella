import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/AuthContext/AuthContext";
import { Button, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

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

interface AppHeaderProps {}

const AppHeader: React.SFC<AppHeaderProps> = () => {
  const [{ currentUser }] = useAuthContext();
  return (
    <Header>
      <Button variant="contained" color="primary">
        Request a Book
      </Button>
      <Actions>
        <Link to="/profile">
        {currentUser && (
          <Avatar alt={currentUser.getName()} src={currentUser.getImage()} />
        )}
        </Link>
      </Actions>
    </Header>
  );
};

export default AppHeader;
