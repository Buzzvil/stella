import React, { ReactComponentElement } from "react";
import RoundButton from "../RoundButton/RoundButton";
import styled from "styled-components";
import { ReactComponent as CatIcon} from "../../img/sad-cat.svg";

const Frame = styled.div`
    position: absolute;
    bottom: 70%
    left: 0px;

    width: 472px;
    text-align: center;
`;

const Card = styled.div`
    width: 472px;
    background: #233443;
    padding-top: 35px;
    padding-bottom: 24px;
    text-align: center;
    border-radius: 16px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14);
`;

const Title = styled.h3`
    font-size: 34px;
    line-height: 40px;
    text-align: center;
    letter-spacing: -1px;
    color: #FFFFFF;
`;

const Desc = styled.p`
    margin-top: 16px;
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.5px;
    color: #F4F4F4;
    opacity: 0.72;
`;

export default () => {
    return (
        <Card>
            <Title>없어요...</Title>
            <Desc>It’s not there yet, feel free to request it!</Desc>
            <RoundButton>REQUEST A BOOK</RoundButton>
            <Frame><CatIcon /></Frame>
        </Card>
    );
}