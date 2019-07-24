import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Typography, TextField, Grid, Modal } from "@material-ui/core";
import { Book } from "proto/booksvc_pb";
import AppHeader from "./AppHeader";
import BookListCard from "../BookListCard/BookListCard";
import BookDetail from "../BookDetail/BookDetail";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

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

const loading = keyframes`
  from { 
    left: 0px;
    width: 0%;
  }
  50% {
    left:0px;
    width: 100%;
  }
  100% {
    left: 0px;
  }
  to {
    left: 100%;
    width:100%;
  }
`;

const SearchInput: any = styled(TextField)`
  width: 738px;
  input {
    font-size: 72px;
    font-weight: 300;
    letter-spacing: -3px;
    text-align: center;
  }

  &.loading {
    overflow: hidden;

    ::before {
      display: block;
      position: absolute;
      z-index: 10;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-top: 2px solid #FFFFFF;
      content: "";
    }
    ::after {
      display: block;
      position: absolute;
      z-index: 100;
      left: -100px;
      right: 0px;
      bottom: 0px;
      width: 100px;
      border-top: 2px solid #12B8A5;
      animation: ${loading} 1.2s ease-in-out infinite;
      content: "";
    }
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
  search?: (query: string) => [boolean, Book[]];
}

const defaultSearch = (q: string): [boolean, Book[]] => [false, []];

const IndexPage: React.SFC<IndexPageProps> = ({ search = defaultSearch }) => {
  const [selectedBook, setSelectedBook] = useState<null | number>(null);
  const [haveSearched, setSearched] = useState(false);
  const [query, setQuery] = useState("");
  if (!search) return null;
  const [loading, books] = search(query);
  return (
    <>
      <AppHeader />
      <SearchContainer>
        <SearchForm
          onSubmit={e => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const input = target.elements.namedItem(
              "search"
            ) as HTMLInputElement;
            input && setQuery(input.value);
            setSearched(true);
          }}
        >
          <SearchInput
            type="search"
            name="search"
            placeholder="Search for a book"
            className={loading && "loading"}
          />
          {!haveSearched && (
            <Typography variant="title" color="textSecondary">
              Try: #All, #English or #popular to filter
            </Typography>
          )}
          <SearchResult container>
            {books.map(b => (
              <Grid item xl={6} xs={6} key={b.getId()}>
                <BookListCard
                  book={b}
                  onClick={() => setSelectedBook(b.getId())}
                />
              </Grid>
            ))}
          </SearchResult>
        </SearchForm>
      </SearchContainer>
      <Modal
        open={selectedBook !== null}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <ModalWrapper close={() => setSelectedBook(null)}>
          <BookDetail bookId={selectedBook} />
        </ModalWrapper>
      </Modal>
    </>
  );
};

export default IndexPage;
