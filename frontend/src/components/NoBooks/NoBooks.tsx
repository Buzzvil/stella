import React, { ReactComponentElement } from "react";
import RoundButton from "../RoundButton/RoundButton";
import styled from "styled-components";
import { ReactComponent as SadIcon} from "../../img/ic_emoticon_sad.svg";

const Card = styled.div`
    width: 472px;
    background: #ffffff;
    padding-top: 35px;
    padding-bottom: 24px;
    text-align: center;
    border-radius: 16px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14);
`;

const Title = styled.h3`
    margin-top: 22px;
    margin-bottom: 0px;
    font-size: 34px;
    font-weight: 500;
    line-height: 49px;
    text-align: center;
`;

const Desc = styled.p`
    margin-top: 16px;
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.5px;
    color: #051625;
`;

export default () => {
    return (
        <Card>
            <SadIcon />
            <Title>없어요...</Title>
            <Desc>It’s not there yet, feel free to request it!</Desc>
            <RoundButton>REQUEST A BOOK</RoundButton>
        </Card>
    );
}