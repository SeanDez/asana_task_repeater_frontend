import React from 'react';
import styled from 'styled-components';

export default () => (
  <OuterContainer>
      <InnerContainer>

      <p>Most work is repetitive in nature. Task managers like Asana are excellent for organizing and delegating tasks among term members. But duplicating tasks is still a manual process</p>

      <p>Asana Task Repeater aims to close that gap by allowing you to choose tasks from your project to automatically repeat.</p>
    </InnerContainer>
  </OuterContainer>
)

const OuterContainer = styled.section`
  width: 100vw;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0 auto;
  width: 90vw;
  max-width: 900px;
  text-align: center;
`;