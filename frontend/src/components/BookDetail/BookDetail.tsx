import * as React from 'react';
import { Book } from 'proto/booksvc_pb';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';

interface BookDetailProps {
  book: Book
}

const BookDetailHeader = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-left: auto;
  }
`;

const BookDetailAuthor = styled.div`
`;

const BookDetailContent = styled.div`
`;

const BookCoverImage = styled.img`
  width: 120px;
  height: 170px;
`;

const BookDetail: React.SFC<BookDetailProps> = ({ book }) => {
  return (
    <div>
      <BookDetailHeader>
        <Typography variant="h3">{book.getName()}</Typography>
        <Button variant="contained" color="primary">Book it</Button>
      </BookDetailHeader>
      <BookDetailAuthor>
        <Typography variant="subtitle1">by {book.getAuthorsList().join(", ")}</Typography>
        <Typography variant="subtitle2">{book.getPublisher()}</Typography>
      </BookDetailAuthor>
      <BookDetailContent>
        <BookCoverImage src={book.getCoverImage()} />
        <Typography variant="body1">{book.getContent()}</Typography>
      </BookDetailContent>
    </div>
  );
};

export default BookDetail;
