import React from 'react';
import styled from 'styled-components';
import swesinSwankOffice from './images/swesinSwankOffice.jpg';
import { InnerContainerBase, OuterContainerBase } from '../theme';

export default (props: any) => (
  <OuterContainer imageProp={swesinSwankOffice}>
    <InnerContainerExtended>
      <h1>Automate Repetitive Task Posting</h1>
      <p>Setup repeat rules and watch your tasks auto-assign to team members every two weeks | day | third month | {'{ any other interval }'}</p>
      
      <p>  
        <button
          onClick={() => console.log('allCookiesOnThisDomain :>> ', props.allCookiesOnThisDomain)}
        >
          check cookies
        </button>
      </p>
    </InnerContainerExtended>
  </OuterContainer>
)

interface ExtendedProps { imageProp: string }

const OuterContainer = styled(OuterContainerBase)<ExtendedProps>`
  background-image: url(${({ imageProp }) => imageProp});
  background-size: cover;
  background-position: center center;
  box-shadow: inset 2000px 2000px 0 0 rgba(39, 1, 14, 0.8);
  margin-top: 70px;
`;

const InnerContainerExtended = styled(InnerContainerBase)`
  text-align: center;
  border: 2px dashed pink;
  width: 93vw;
  max-width: 500px;
  align-items: center;

  @media (min-width: 600px) {
    padding-left: 13vw;
  }
`;