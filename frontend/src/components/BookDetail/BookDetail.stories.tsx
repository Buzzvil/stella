import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { Book } from "../../../proto/booksvc_pb";

import StandardTheme from "../../theme/StandardTheme";
import { BookProvider } from "../../hooks/BookContext/BookContext";
import BookDetail from "./BookDetail";

const TestBook = (() => {
  const book = new Book();
  book.setId(8331);
  book.setName("죽고싶지만 떡볶이는 먹고싶어");
  book.setAuthorsList(["백세희"]);
  book.setPublisher("O RLY?")
  book.setContent("시작하며 별일 없이 사는데 왜 마음은 허전할까")
  book.setCoverImage("https://placekitten.com/g/200/300");
  return book;
})();

storiesOf("Organisms|BookDetail", module)
  .add("default", () => {
    return (
      <BookProvider initial={{
        [TestBook.getId()]: TestBook,
      }}>
        <MuiThemeProvider theme={StandardTheme}>
          <CssBaseline />
          <BookDetail bookId={TestBook.getId()} />
        </MuiThemeProvider>
      </BookProvider>
    );
  });
