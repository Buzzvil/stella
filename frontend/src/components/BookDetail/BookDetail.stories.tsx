import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { Book } from "../../../proto/booksvc_pb";

import StandardTheme from "../../theme/StandardTheme";
import { BookProvider } from "../../hooks/BookContext/BookContext";
import BookDetail from "./BookDetail";
import { User } from "proto/usersvc_pb";
import { ResourceStatus } from "proto/rentalsvc_pb";
import { UserProvider } from "../../hooks/UserContext/UserContext";

const TestBook = (() => {
  const book = new Book();
  book.setId(8331);
  book.setName("죽고싶지만 떡볶이는 먹고싶어");
  book.setAuthorsList(["백세희"]);
  book.setPublisher("O RLY?");
  book.setContent("시작하며 별일 없이 사는데 왜 마음은 허전할까");
  book.setCoverImage("https://placekitten.com/g/200/300");
  return book;
})();

const TestHolder = (() => {
  const user = new User();
  user.setId(211);
  user.setName("Alexander");
  user.setImage("https://picsum.photos/200");
  return user;
})();

const TestStatus = (() => {
  const status = new ResourceStatus();
  status.setAvailability(ResourceStatus.Availability.UNAVAILABLE);
  status.setHolder(TestHolder.getId());
  return status;
})();

storiesOf("Organisms|BookDetail", module).add("default", () => {
  return (
    <BookProvider
      initial={{
        [TestBook.getId()]: Object.assign(TestBook, {
          rentalStatus: TestStatus
        })
      }}
    >
      <MuiThemeProvider theme={StandardTheme}>
        <CssBaseline />
        <BookDetail bookId={TestBook.getId()} />
      </MuiThemeProvider>
    </BookProvider>
  );
});
