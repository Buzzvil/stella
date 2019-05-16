import React, { ReactComponentElement } from "react";
import Card from '@material-ui/core/Card';
import RoundButton from "../RoundButton/RoundButton";
import styled from "styled-components";
import { ReactComponent as SadIcon} from "../../img/emoticon_sad.svg";

const Container = styled.div`
    text-align: center;
`;

const Title = styled.h3`
    font-size: 34px;
    font-weight: 500;
    line-height: 49px;
    text-align: center;
`;

const Desc = styled.p`
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.5px;
    color: #051625;
`;

export default () => {
    return (
        <Card>
            <Container>
                    <SadIcon />
                    <Title>없어요...</Title>
                    <Desc>It’s not there yet, feel free to request it!</Desc>
                    <RoundButton>REQUEST A BOOK</RoundButton>
            </Container>
        </Card>
    );
}