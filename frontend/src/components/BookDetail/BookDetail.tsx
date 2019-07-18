import * as React from "react";
import { Typography } from "@material-ui/core";
import Star, { Color } from "../Star/Star";
import styled from "styled-components";
import { useBookContext } from "../../hooks/BookContext/BookContext";
import RentalActions from "../RentalActions/RentalActions";
import {
  ResourceStatusIfc,
  defaultStatusFetcher
} from "../../hooks/RentalStatus/RentalStatus";
import { User } from "proto/usersvc_pb";

interface BookDetailProps {
  bookId: null | number;
  statusFetcher?: ResourceStatusIfc;
  close?: () => void;
}

const Wrapper = styled.div`
  margin: 40px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-left: auto;
  }
`;

const Author = styled.div``;

const Content = styled.div``;

const Ratings = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const RatingLabel: any = styled(Typography)`
  text-align: middle;
  padding: 0 8px 0 4px;
`;

const CoverImage = styled.img`
  width: 120px;
  height: 170px;
`;

const BookDetail: React.SFC<BookDetailProps> = ({
  bookId,
  statusFetcher = defaultStatusFetcher
}) => {
  if (!bookId) return null;
  const [state] = useBookContext();
  const book = state[bookId];
  const myRating = 4;
  const avgRating = 3.5;

  return (
    <Wrapper>
      <Header>
        <Typography variant="h3">{book.getName()}</Typography>
        <RentalActions statusFetcher={statusFetcher} entityId={bookId} />
      </Header>
      <Author>
        <Typography variant="subtitle1">
          by {book.getAuthorsList().join(", ")}
        </Typography>
        <Typography variant="subtitle2">{book.getPublisher()}</Typography>
      </Author>
      <Content>
        <CoverImage src={book.getCoverImage()} />
        <Ratings>
          <Star value={1} />
          <RatingLabel variant="body1">{myRating}</RatingLabel>
          <Star color={Color.PRIMARY} value={1} />
          <RatingLabel>{avgRating}</RatingLabel>
        </Ratings>
        <Typography variant="body1">{book.getContent()}</Typography>
      </Content>
    </Wrapper>
  );
};

export default BookDetail;
