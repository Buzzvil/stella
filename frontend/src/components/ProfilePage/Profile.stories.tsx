import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import ProfilePage from "./ProfilePage";
import { User } from "proto/usersvc_pb";
import { Book } from "proto/booksvc_pb";
import { MemoryRouter, withRouter } from "react-router-dom";

const currentUser = (() => {
    const user = new User();
    user.setId(1);
    user.setName("John Doe")
    user.setImage("https://placekitten.com/g/200/300")
    return user;
})();

const TestBook = (() => {
    const book = new Book();
    book.setId(8331);
    book.setName("Test Book");
    book.setAuthorsList(["Me", "Myself", "I"]);
    book.setCoverImage("https://placekitten.com/g/200/300");
    return book;
})();

storiesOf("Pages|ProfilePage", module)
    .add("default", () => (
            <MuiThemeProvider theme={StandardTheme}>
                <CssBaseline />
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </MuiThemeProvider>
    ));
