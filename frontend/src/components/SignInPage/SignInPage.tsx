import React from "react";
import styled from "styled-components";
import MainLogo from "../MainLogo/MainLogo";
import { Button } from "@material-ui/core";

const Header = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin: 0 auto;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 244px;
  margin: 0 auto;

  a {
    width: 100%;
    text-decoration: none;
  }

  button {
    margin-bottom: 20px;
  }
`;

interface SignInPageProps {}

const SignInPage: React.SFC<SignInPageProps> = () => {
  return (
    <div>
      <Header>
        <MainLogo />
      </Header>
      <ButtonWrapper>
        <a href="/auth/slack/login">
          <Button variant="contained" color="primary" fullWidth={true}>
            Login
          </Button>
        </a>
        <Button variant="outlined" color="primary" fullWidth={true}>
          Request a Book
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default SignInPage;
