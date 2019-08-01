import * as React from "react";
import { Typography, Avatar } from "@material-ui/core";
import Star, { Color } from "../Star/Star";
import styled from "styled-components";
import { useBookContext } from "../../hooks/BookContext/BookContext";
import RentalActions from "../RentalActions/RentalActions";
import { listUsers } from "../../hooks/UserLister/UserLister";

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
  margin-top: 16px;
`;

const Content = styled.div`
  padding-top: 37px;
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

const CoverImage = styled.img`
  width: 120px;
  height: 170px;
`;

const BookDetail: React.SFC<BookDetailProps> = ({ bookId }) => {
  if (!bookId) return null;
  const [state] = useBookContext();
  const book = state[bookId];
  const holderIds = book.rentalStatus ? [book.rentalStatus.getHolder()] : [];
  const [, [holder = undefined]] = listUsers(holderIds);
  const watchingUserIds = book.rentalStatus
    ? book.rentalStatus.getWatchingUserIdsList()
    : [];
  const [, watchers] = listUsers(watchingUserIds);
  const myRating = 4;
  const avgRating = 3.5;

  return (
    <Wrapper>
      <Header>
        <Typography variant="h3">{book.getName()}</Typography>
        <RentalActions entityId={bookId} />
      </Header>
      <Author>
        <Typography variant="subtitle1">
          by {book.getAuthorsList().join(", ")}
        </Typography>
        <Typography variant="subtitle2">{book.getPublisher()}</Typography>
      </Author>
      <Content>
        <div style={{ marginRight: "40px" }}>
          <CoverImage src={book.getCoverImage()} />
          <Ratings>
            <Star value={1} />
            <RatingLabel variant="body1">{myRating}</RatingLabel>
            <Star color={Color.PRIMARY} value={1} />
            <RatingLabel>{avgRating}</RatingLabel>
          </Ratings>
        </div>
        <div>
          {holder &&
            (watchers.length > 0 ? (
              <div>
                <Typography variant="body1">
                  {holder.getName()} is reading it and {watchers.length} more
                  are interested.
                </Typography>
                <Avatar src={holder.getImage()} />
                {watchers.map(w => (
                  <Avatar src={w.getImage()} />
                ))}
              </div>
            ) : (
              <div>
                <Typography variant="body1">
                  {holder.getName()} is reading it
                </Typography>
                <Avatar src={holder.getImage()} />
              </div>
            ))}
          <Typography variant="body1">{book.getContent()}</Typography>
        </div>
      </Content>
    </Wrapper>
  );
};

export default BookDetail;
