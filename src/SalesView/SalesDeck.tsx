import React from 'react';
import styled from 'styled-components';
import swesinSwankOffice from './images/swesinSwankOffice.jpg';

export default (props: any) => (
  <OuterContainer imageProp={swesinSwankOffice}>
    <InnerContainer>
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
    </InnerContainer>
  </OuterContainer>
)

interface ExtendedProps { imageProp: string }

const OuterContainer = styled.section<ExtendedProps>`
  background-image: url(${props => props.imageProp});
  background-size: cover;
  background-position: center center;
  box-shadow: inset 2000px 2000px 0 0 rgba(39, 1, 14, 0.8);
  width: 100vw;
  margin: 0 auto;
  margin-top: 70px;
  height: 400px;
`;

const InnerContainer = styled.div`
  border: 2px dashed pink;
  width: 93vw;
  max-width: 500px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  & > * {
    border: 2px dashed yellow;
    max-width: 720px;
  }

  @media (min-width: 600px) {
    padding-left: 13vw;
  }
`;