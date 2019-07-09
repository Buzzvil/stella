import * as React from 'react';
import { Book } from 'proto/booksvc_pb';
import { Typography, Button } from '@material-ui/core';
import Star, { Color } from "../Star/Star";
import styled from 'styled-components';
import { useBookContext } from '../../hooks/BookContext/BookContext';

interface BookDetailProps {
  bookId: null | number;
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

const Author = styled.div`
`;

const Content = styled.div`
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

const CoverImage = styled.img`
  width: 120px;
  height: 170px;
`;

const BookDetail: React.SFC<BookDetailProps> = ({ bookId }) => {
  if (!bookId) return null;
  const [state, dispatch] = useBookContext();
  const book = state[bookId];
  const myRating = 4;
  const avgRating = 3.5;
  const updateRentalState = () => {
    Promise.resolve() // Call API
    .then(status => {
      // Update context
      // book.rentalStatus = status;
      // setBook(book);
    })
  }
  return (
    <Wrapper>
      <Header>
        <Typography variant="h3">{book.getName()}</Typography>
        <Button variant="contained" color="secondary" onClick={updateRentalState}>Book it</Button>
      </Header>
      <Author>
        <Typography variant="subtitle1">by {book.getAuthorsList().join(", ")}</Typography>
        <Typography variant="subtitle2">{book.getPublisher()}</Typography>
      </Author>
      <Content>
        <CoverImage src={book.getCoverImage()} />
        <Ratings>
          <Star value={1} /><RatingLabel variant="body1">{myRating}</RatingLabel>
          <Star color={Color.PRIMARY} value={1} /><RatingLabel>{avgRating}</RatingLabel>
        </Ratings>
        <Typography variant="body1">{book.getContent()}</Typography>
      </Content>
    </Wrapper>
  );
};

export default BookDetail;
