import React from "react";
import styled from "styled-components";

interface NoticeProps {
    label: string;
}

const NoticeBox = styled.div`
    display: inline-block;
    padding-top: 1.1em;
    padding-bottom: 1.1em;
    padding-left: 4em;
    padding-right: 4em;
    border-radius: 5px;
    background: #000000;
    color: #ffffff;
    font-size: 1em;
`;

const Notice: React.SFC<NoticeProps> = ({ label }) => {
    return <NoticeBox>{label}</NoticeBox>
}

export default Notice;