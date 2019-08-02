import React from "react";
import styled from "styled-components";
import { Avatar, Typography } from "@material-ui/core";
import { useAuthContext } from "../../hooks/AuthContext/AuthContext";
import { makeStyles, createStyles } from '@material-ui/styles';
import { RouteComponentProps, BrowserRouter as withRouter } from "react-router-dom";
import { getUserResourceStatus } from "../../hooks/RentalStatus/RentalStatus";
import RentalActivity from "../RentalActivity/RentalActivity"
import { getBooksList } from "../../hooks/BookLister/BookLister";
import { getUser } from "../../hooks/UserLister/UserLister";
import { User } from "proto/usersvc_pb"

const profileStyle = makeStyles(
    createStyles({
        avatar: {
            width: 100,
            height: 100,
            marginTop: 50,
            marginBottom: 20
        }
    })
)

const ProfileContainer = styled.div`
  display: flex;
  min-height: 652px;
  flex-direction: column;
  align-items: center;
`;

const ProfileContent = styled.div`
 width: 100%;
  max-width: 720px;
`;

const NowReading = styled.div`
  font-weight: bold;
  font-size: 36px;
  line-height: 50px;
  color: white;
`;

const ProfileHeader = styled.div`
  width: 100%;
  max-width: 720px;
`;

const Activities = styled.div`
  width: 100%;
  background-color: #233443;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`;

const TitleColors = ['#FFE76A', '#12B8A5', '#E7841B', '#FFC17A']

interface MatchParams {
    id: string;
}

const ProfilePage: React.SFC<RouteComponentProps<MatchParams>> = ({
    match
}) => {
    const classes = profileStyle();
    const [{ currentUser }] = useAuthContext();
    const id = parseInt(match.params.id)
    let [loading, user] = getUser(id)
    user = user || currentUser
    if (!user) return <></>;
    const [, status, { }] = getUserResourceStatus(
        user.getId()
    );
    const [, heldBooksStatus] = getBooksList(
        status ? status.heldBookIds : []
    )
    const [, rentedBooksStatus] = getBooksList(
        status ? status.rentedBookIds : []
    )
    const readingBooks = heldBooksStatus ? heldBooksStatus.books : null;
    const rentedBooks = rentedBooksStatus ? rentedBooksStatus.books : null;
    return (
        <ProfileContainer>
            <ProfileHeader>
                {!loading && user &&
                    <Avatar alt={user.getName()} src={user.getImage()} className={classes.avatar} />
                }
            </ProfileHeader>
            <ProfileContent>
                {!loading && user && readingBooks && readingBooks.length > 0 &&
                    <NowReading>
                        {user.getName()} is reading&nbsp;
                        {readingBooks.map((book, index) =>
                            <span key={index}>
                                <span style={{ color: (TitleColors[index % TitleColors.length]) }}> {book.getName()}</span>
                                <span>{index == readingBooks.length - 1 ? "." : (index == readingBooks.length - 2 ? " and " : ", ")}</span>
                            </span>
                        )}
                    </NowReading>
                }
                {user && readingBooks && readingBooks.length == 0 &&
                    <NowReading>
                        Oh dear, It seems that {user.getName()} didn’t read any book yet..
                    </NowReading>
                }
            </ProfileContent>
            <Activities>
                <ProfileContent>
                    <Typography variant="h6">
                        {!loading && user && user.getName()}'s activity
                    </Typography>
                    {rentedBooks && rentedBooks.map((book) =>
                        <RentalActivity book={book}></RentalActivity>
                    )}
                </ProfileContent>
            </Activities>
        </ProfileContainer>
    );
};

export default ProfilePage;
