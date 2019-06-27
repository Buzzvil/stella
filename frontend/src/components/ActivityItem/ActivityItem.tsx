import React from "react";
import styled from "styled-components";
import { Book } from "../../../proto/booksvc_pb";

const Img = styled.img`
    height: 80px
`;

const Title = styled.div`
    margin-left: 0px;
    margin-top: 5px;
    font-size: 18px;
    font-weight: normal;
    line-height: 24px;
`;

const ResourceTitle = styled.div`
    margin-left: 0px;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    display: inline;
`;

const TimeStamp = styled.div`
    margin-top: 4px;
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
`;

const Container = styled.div`
    display: flex;
    min-height: 106px;
    min-width: 300px;
    margin: 16px;
`;

const Content = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 0 12px;
`;

const FlexFill = styled.div`
    flex-grow: 1;
`;

export default ({ book }: { book: Book }) => {
    const time = '15:32 March 09, 2019'
    return (
        <Container>
            <Content>
                <Title>Rented <ResourceTitle>{book.getName()}</ResourceTitle></Title>
                <FlexFill>
                    <TimeStamp>{time}</TimeStamp>
                </FlexFill>
            </Content>
            <Img src={book.getCoverImage()} />
        </Container>
    );
};