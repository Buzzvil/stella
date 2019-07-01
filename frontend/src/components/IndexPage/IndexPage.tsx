import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Card, TextField, Grid } from "@material-ui/core";
import { Book } from "proto/booksvc_pb";
import { User } from "proto/usersvc_pb";
import { ResourceStatus } from "proto/rentalsvc_pb";
import AppHeader from "./AppHeader";
import BookListCard from "../BookListCard/BookListCard";

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

const SearchInput: any = styled(TextField)`
  width: 738px;
  input {
    font-size: 72px;
    font-weight: 300;
    letter-spacing: -3px;
    text-align: center;
  }
`;

const SearchResult: any = styled(Grid)`
  max-width: 960px;

  & > div {
    width: 50%;
    box-sizing: border-box;
  }
`;

interface IndexPageProps {
  currentUser?: User
  search?: (query: string) => [boolean, Book[]]
  statusFetcher?: (bookId: number) => [boolean, ResourceStatus]
}

const defaultSearch = (q: string) : [boolean, Book[]] => ([false, []])
const defaultStatusFetcher = (bookId: number) : [boolean, ResourceStatus] => ([false, new ResourceStatus])

const IndexPage: React.SFC<IndexPageProps> = ({
  search = defaultSearch,
  statusFetcher = defaultStatusFetcher,
  currentUser
}) => {
  const [haveSearched, setSearched] = useState(false);
  const [query, setQuery] = useState('');
  if (!search) return null;
  const [loading, books] = search(query)
  return (
    <div>
      <AppHeader currentUser={currentUser} />
      <SearchContainer>
        <SearchForm
          onSubmit={e => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const input = target.elements.namedItem('search') as HTMLInputElement;
            input && setQuery(input.value);
            setSearched(true);
          }}
        >
          <SearchInput type="search" name="search" placeholder="Search for a book" />
          {!haveSearched &&
            <Typography variant="title" color="textSecondary">
              Try: #All, #English or #popular to filter
            </Typography>
          }
          {loading && <Typography>Loading</Typography>}
          <SearchResult container>
            {books.map(b => (
              <Grid item xl={6} xs={6} key={b.getId()}>
                <BookListCard book={b} currentUser={currentUser} statusFetcher={statusFetcher} />
              </Grid>
            ))}
          </SearchResult>
        </SearchForm>
      </SearchContainer>
    </div>
  );
};

export default IndexPage;
