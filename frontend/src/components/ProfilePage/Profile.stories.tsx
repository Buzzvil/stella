import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import ProfilePage from "./ProfilePage";
import { User } from "proto/usersvc_pb";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

const history = createMemoryHistory();
const path = `/profile/:id`;

const profilematch: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1'),
    params: { id: "1" }
};

const location = createLocation(profilematch.url);

storiesOf("Pages|ProfilePage", module)
    .add("default", () => (
        <MuiThemeProvider theme={StandardTheme}>
            <CssBaseline />
            <MemoryRouter>
                <ProfilePage
                    history={history}
                    location={location}
                    match={profilematch} />
            </MemoryRouter>
        </MuiThemeProvider>
    ));
