import React from 'react';
import styled from 'styled-components';

export default (props: any) => (
  <OuterContainer>
    <p>Sales deck here</p>
  </OuterContainer>
)

const OuterContainer = styled.div`
  background-color: aqua;
  width: 100vw;
  height: 400px;
`;
