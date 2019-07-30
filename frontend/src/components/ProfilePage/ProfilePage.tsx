import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { Book } from "proto/booksvc_pb";
import { useAuthContext } from "../../hooks/AuthContext/AuthContext";
import { makeStyles, createStyles } from '@material-ui/styles';
import { RouteComponentProps, BrowserRouter as withRouter } from "react-router-dom";
import { getUserResourceStatus } from "../../hooks/RentalStatus/RentalStatus";

const profileStyle = makeStyles(
    createStyles({
        avatar: {
            width: 100,
            height: 100,
            marginTop: 50,
            marginBottom: 20
        },
        lastItem: {
            display: 'none'
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
  font-wiehgt: bold;
  font-size: 36px;
  line-height: 50px;
  color: white;
`;

const ProfileHeader = styled.div`
  width: 100%;
  max-width: 720px;
`;

const TitleColors = ['#FFE76A', '#12B8A5', '#E7841B', '#FFC17A']

interface ProfilePageProps {
    userId?: number
}

const ProfilePage: React.SFC<ProfilePageProps & RouteComponentProps> = ({
    userId,
}) => {
    const classes = profileStyle();
    const [{ currentUser }] = useAuthContext();
    const user = currentUser;
    const [loading, status, { }] = getUserResourceStatus(
        user ? user.getId() : 1
    );
    const readingBooks = status ? status.heldBooks : [];
    return (
        <ProfileContainer>
            <ProfileHeader>
                {user &&
                    <Avatar alt={user.getName()} src={user.getImage()} className={classes.avatar} />
                }
            </ProfileHeader>
            <ProfileContent>
                {user &&
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
            </ProfileContent>
        </ProfileContainer>
    );
};

export default ProfilePage;
