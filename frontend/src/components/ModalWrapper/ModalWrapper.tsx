import React from 'react';
import styled from "styled-components";
import { ReactComponent as Close } from "../../img/ic_close.svg";
import { Paper } from '@material-ui/core';

const Wrapper = styled.div`
  width: 90vw;
  max-width: 960px;
  min-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  outline: 0;
`;

const CloseButton = styled(Close)`
  cursor: pointer;
`;

interface ModalWrapperProps {
  close: () => void
}

const ModalWrapper: React.SFC<ModalWrapperProps> = ({ close, ...props }) => {
  return(
    <Wrapper>
      <CloseButton onClick={() => close()}></CloseButton>
      <Paper square={false} elevation={24} style={{width: '100%'}}>
        {props.children}
      </Paper>
    </Wrapper>
  );
}

export default ModalWrapper;
