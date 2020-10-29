import React from 'react';
import styled from 'styled-components';

import { BodyInnerContainer, BodyOuterContainer } from '../theme';

export default () => (
  <BodyOuterContainer r={45} g={130} b={183} a={0.9}>
    <InnerContainerPS>
      <h2>Most work is repetitive</h2>
      
      <p>Task managers like Asana are excellent for organizing and delegating tasks among term members. But duplicating tasks is still a manual process.</p>

      <p>Asana Task Repeater aims to close that gap by allowing you to choose tasks from your project to automatically repeat.</p>
    </InnerContainerPS>
  </BodyOuterContainer>
)

const InnerContainerPS = styled(BodyInnerContainer)`
  /* align-items: center; */
  text-align: center;

  & * { color: white; }
`;