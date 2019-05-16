import React, { ReactComponentElement } from "react";
import Card from '@material-ui/core/Card';
import RoundButton from "../RoundButton/RoundButton";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as SadIcon} from "../../img/emoticon_sad.svg";

export default () => {
    return (
        <Card>
            <SadIcon />
            <Typography variant={"h2"}>없어요...</Typography>
            <Typography variant={"body1"}>It’s not there yet, feel free to request it!</Typography>
            <RoundButton>REQUEST A BOOK</RoundButton>
        </Card>
    );
}