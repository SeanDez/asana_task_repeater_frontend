import React from 'react';
import styled from 'styled-components';

export default (props: any) => (
  <OuterContainer>
    <h2>Automate Repetitive Task Posting</h2>
    <p>Asana Task Repeater handles the repetitive parts of reposting tasks on a regular basis, leaving you free to manager you team and project.</p>
    
    <p>Another section</p>
    <p>  
      <button
        onClick={() => console.log('allCookiesOnThisDomain :>> ', props.allCookiesOnThisDomain)}
      >
        check cookies
      </button>
    </p>
  </OuterContainer>
)

const OuterContainer = styled.section`
  background-color: aqua;
  margin-top: 70px;
  width: 100vw;
  height: 400px;
`;
