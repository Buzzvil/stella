import React from "react";
import styled from "styled-components";
import { ReactComponent as MainLogo } from "../../img/logo-main.svg";
import { Button } from "@material-ui/core";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  display: flex;
  min-height: 652px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

interface SignInPageProps {}

const SignInPage: React.SFC<SignInPageProps> = () => {
  return (
    <div>
      <Header>
        <MainLogo />
      </Header>
      <Button>Login</Button>
      <Button variant="outlined">Request a Book</Button>
    </div>
  );
};

export default SignInPage;
