import React, { ReactComponentElement } from "react";
import RoundButton from "../RoundButton/RoundButton";
import Avatar from '@material-ui/core/Avatar';
import styled from "styled-components";

import { SPREAD_SHEET_LINK } from "../../constant";

const Card = styled.div`
    width: 472px;
    background: #ffffff;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14);
`;

const Title = styled.h3`
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 34px;
    font-weight: 500;
    line-height: 49px;
`;

const WaitAvatarList = styled.ul`
    padding: 0px;
    display: flex;

    li {
        margin-right: -8px;
        list-style: none;
    }
`;

const Desc = styled.p`
    margin-top: 16px;
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #051625;
`;

interface Person {
    name: string;
    thumb: string;
}

interface WaitListProps {
    reader: Person,
    waitlist: Person[];
}


const WaitList: React.SFC<WaitListProps> = ({ reader, waitlist }) => {
    const waitCount = waitlist.length;
    return (
        <Card>
            <Title>Wait for it...</Title>
            <WaitAvatarList>
            {
                waitlist.map(person => (<li><Avatar src={person.thumb} /></li>))
            }
            </WaitAvatarList>

            {
                waitCount > 1
                ? <Desc><b>{reader.name} and {waitCount - 1} more</b> are in the waitlist</Desc>
                : <Desc><b>{reader.name}</b> is in the waitlist</Desc>
            }
            

            <p>Do you think this book is insanely popular? Why don’t you ask for another one <a target="_blank" href={SPREAD_SHEET_LINK}>here?</a> ^^</p>
            <RoundButton>WAIT LIST NOW</RoundButton>
        </Card>
    );
}

export default WaitList;
