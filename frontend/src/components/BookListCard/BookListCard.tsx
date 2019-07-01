import React from "react";
import styled from "styled-components";
import { Book } from "../../../proto/booksvc_pb";
import Star, { Color } from "../Star/Star";
import { Card, Typography } from "@material-ui/core";

const Img = styled.img`
  height: 135px;
  border-radius: 12px;
`

const Container: any = styled(Card)`
  display: flex;
  min-height: 106px;
  margin: 16px;
  padding: 16px;
`;

const Content = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 0 12px;
`

const Actions = styled.div`
    display: flex;
    flex-direction: column;
`

const FlexFill = styled.div`
    flex-grow: 1;
`

const Ratings = styled.div`
    display: flex;
    align-items: center;
`;

const RatingLabel = styled.span`
    text-align: middle;
    padding: 0 8px 0 4px;
`

export default ({ book }: { book: Book }) => {
  const reads = 12;
  const reviews = 3;
  const myRating = 4;
  const avgRating = 3.5;
  return (
    <Container>
      <Img src={book.getCoverImage()} />
      <Content>
        <Typography variant="h5">{book.getName()}</Typography>
        <FlexFill><Typography variant="h6">{book.getAuthorsList().join(", ")}</Typography></FlexFill>
        <div>{reads} reads - {reviews} reviews</div>
        <Ratings>
          <Star value={1} /><RatingLabel>{myRating}</RatingLabel>
          <Star color={Color.PRIMARY} value={1} /><RatingLabel>{avgRating}</RatingLabel>
        </Ratings>
      </Content>
      <Actions>
        <div>Test</div>
      </Actions>
    </Container>
  );
};
