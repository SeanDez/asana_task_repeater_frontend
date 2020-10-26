import React from 'react';
import styled from 'styled-components';

import { BodyInnerContainer, BodyOuterContainer } from '../theme';

export default () => (
  <BodyOuterContainer r={0} g={30} b={0} a={0.9}>
      <InnerContainerPS>

      <p>Most work is repetitive in nature. Task managers like Asana are excellent for organizing and delegating tasks among term members. But duplicating tasks is still a manual process</p>

      <p>Asana Task Repeater aims to close that gap by allowing you to choose tasks from your project to automatically repeat.</p>
    </InnerContainerPS>
  </BodyOuterContainer>
)

const InnerContainerPS = styled(BodyInnerContainer)`
  /* align-items: center; */
  text-align: center;
`;