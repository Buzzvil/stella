import React from "react";
import styled from "styled-components";
import Star, { Color } from "../Star/Star";
import { Card, Typography } from "@material-ui/core";
import { Book } from "proto/booksvc_pb";
import RentalActions from "../RentalActions/RentalActions";

const Container: any = styled(Card)`
  display: flex;
  min-height: 135px;
  margin: 16px;
  padding: 16px;
  border-radius: 24px;
  cursor: pointer;
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
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

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
  book: Book;
  onClick?: () => void;
  rent?: (bookId: number) => [boolean, boolean];
}

export default ({ book, onClick }: BookListCardInterface) => {
  const reads = 12;
  const reviews = 3;
  const myRating = 4;
  const avgRating = 3.5;
  return (
    <a onClick={() => onClick && onClick()}>
      <Container>
        <Img src={book.getCoverImage()} />
        <Content>
          <Typography variant="h5">{book.getName()}</Typography>
          <Typography variant="h6">
            {book.getAuthorsList().join(", ")}
          </Typography>
          <Typography variant="body2">
            {reads} reads - {reviews} reviews
          </Typography>
        </Content>
        <Actions>
          <Ratings>
            <Star value={1} />
            <RatingLabel variant="body1">{myRating}</RatingLabel>
            <Star color={Color.PRIMARY} value={1} />
            <RatingLabel>{avgRating}</RatingLabel>
          </Ratings>
          <RentalActions entityId={book.getId()} />
        </Actions>
      </Container>
    </a>
  );
};
