import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import ActivityItem from "./ActivityItem";
import { Book } from "../../../proto/booksvc_pb";

const TestBook = (() => {
    const book = new Book();
    book.setId(8331);
    book.setName('내게 무해한 사람')
    book.setCoverImage("https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F693552%3Ftimestamp%3D20190625101006");
    return book;
})();

storiesOf("Components|ActivityItem", module)
    .add("default", () => (
        <MuiThemeProvider theme={StandardTheme}>
            <ActivityItem book={TestBook} />
        </MuiThemeProvider>
    ))