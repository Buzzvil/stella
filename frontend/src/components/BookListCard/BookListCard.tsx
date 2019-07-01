import React from "react";
import styled from "styled-components";
import { Book } from "../../../proto/booksvc_pb";
import Star, { Color } from "../Star/Star";
import { Card, Typography, Button } from "@material-ui/core";
import { ResourceStatus } from "proto/rentalsvc_pb";
import { User } from "proto/usersvc_pb";

const Container: any = styled(Card)`
  display: flex;
  min-height: 135px;
  margin: 16px;
  padding: 16px;
  border-radius: 24px;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Img = styled.img`
  width: 97px;
  height: 135px;
  border-radius: 12px;
  flex: 0 0 97px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(100% - 115px);
  margin-left: 18px;
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Ratings = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const RatingLabel: any = styled(Typography)`
  text-align: middle;
  padding: 0 8px 0 4px;
`;

interface BookListCardInterface {
  book: Book
  currentUser?: User
  statusFetcher: (bookId: number) => [boolean, ResourceStatus]
}

export default ({ book, currentUser, statusFetcher }: BookListCardInterface) => {
  const reads = 12;
  const reviews = 3;
  const myRating = 4;
  const avgRating = 3.5;
  const [loadingStatus, status] = statusFetcher(book.getId())
  return (
    <Container>
      <Img src={book.getCoverImage()} />
      <Content>
        <Typography variant="h5">{book.getName()}</Typography>
        <Typography variant="h6">{book.getAuthorsList().join(", ")}</Typography>
        <Typography variant="body2">{reads} reads - {reviews} reviews</Typography>
      </Content>
      <Actions>
        <Ratings>
          <Star value={1} /><RatingLabel variant="body1">{myRating}</RatingLabel>
          <Star color={Color.PRIMARY} value={1} /><RatingLabel>{avgRating}</RatingLabel>
        </Ratings>
        {status && status.getAvailability() === ResourceStatus.Availability.AVAILABLE ?
          <Button variant="contained" color="secondary" disabled={loadingStatus}>Book it</Button> :
          currentUser && currentUser.getId() === status.getHolder() ?
            <Button variant="contained" color="default" disabled={loadingStatus}>Return</Button> :
            <Button variant="contained" color="default" disabled={loadingStatus}>Get Notified</Button>
        }
      </Actions>
    </Container>
  );
};
