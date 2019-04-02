import React from "react";
import Chip, { ChipProps } from '@material-ui/core/Chip';

const style = {
  paddingLeft: "0.512em",
  paddingRight: "0.256em",
  height: "1.953em",
  fontSize: "1.125em"
};

const FilterChip: React.SFC<ChipProps> = ({ style: propsStyle = {}, ...props }) => (
    <Chip color="secondary" style={{...style, ...propsStyle}} {...props} />
);

export default FilterChip;
