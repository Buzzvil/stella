import React from "react";
import Typography from "@material-ui/core/Typography";
import RoundButton from "../RoundButton/RoundButton";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  min-height: 84px;
  padding-left: 32px;
  padding-right: 32px;
  align-items: center;
  justify-content: space-between;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  min-height: 652px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const SearchInput = styled.input`
  width: 750px;
  font-size: 96px;
  font-weight: 300;
  border: none;
`;

interface IndexPageProps {}

const IndexPage: React.SFC<IndexPageProps> = () => {
  return (
    <div>
      <Header>
        <RoundButton>REQUEST A BOOK</RoundButton>
        <RoundButton>Test</RoundButton>
      </Header>
      <SearchContainer>
        <SearchForm
          onSubmit={e => {
            e.preventDefault();
            console.log("Searching");
          }}
        >
          <SearchInput name="search" placeholder="Search for a book" />
          <Typography variant="title">
            Try: #All, #English or #popular to filter
          </Typography>
        </SearchForm>
      </SearchContainer>
    </div>
  );
};

export default IndexPage;
