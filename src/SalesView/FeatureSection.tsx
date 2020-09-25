import React from 'react';
import styled from 'styled-components';

export default (props: any) => (
  <OuterContainer>
    <h2>Features</h2>

    <section>
      <h3>Set a rule once, repeat forever</h3>
      <p>Some tasks need to keep being posted. With this service, you can mark any task in Asana to be repeated automativcally</p>
    </section>
  </OuterContainer>
)

const OuterContainer = styled.div`
  background-color: lightblue;
  width: 100vw;
  height: 800px;
`;