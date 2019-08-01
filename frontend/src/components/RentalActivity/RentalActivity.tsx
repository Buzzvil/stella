import * as React from "react";
import { Card, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useBookContext } from "../../hooks/BookContext/BookContext";
import { Book } from "proto/booksvc_pb";

interface RentalActivityProps {
    book: null | Book;
    close?: () => void;
}

const Container: any = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 25px;
`;

const Img = styled.img`
  width: 60px;
  height: 80px;
  border-radius: 12px;
  flex: 0 0 60px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(100% - 60px);
`;

const RentalActivity: React.SFC<RentalActivityProps> = ({ book }) => {
    if (!book) return null;

    return (
        <Container>
            <Content>
                <Typography variant="body1">Rent {book.getName()}</Typography>
                <Typography variant="h6">
                    {book.getAuthorsList().join(", ")}
                </Typography>
                <Typography variant="body2">
                </Typography>
            </Content>
            <Img src={book.getCoverImage()} />
        </Container>
    );
};

export default RentalActivity;
