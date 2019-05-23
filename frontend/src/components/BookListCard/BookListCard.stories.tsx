import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import BookListCard from "./BookListCard";
import { Book } from "../../../proto/booksvc_pb";

const TestBook = (() => {
    const book = new Book();
    book.setId(8331);
    book.setName("Test Book");
    book.setAuthorsList(["Me", "Myself", "I"]);
    book.setCoverImage("https://placekitten.com/g/200/300");
    return book;
})();

storiesOf("Components|BookListCard", module)
  .add("default", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <BookListCard book={TestBook}/>
    </MuiThemeProvider>
  ))
