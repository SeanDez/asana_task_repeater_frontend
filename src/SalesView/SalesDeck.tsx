import React from 'react';
import styled from 'styled-components';

import swesinSwankOffice from './images/swesinSwankOffice.jpg';
import { InnerContainerBase, OuterContainerBase, FilledImage, ImageContainer, FlexRow, StyledButton } from '../theme';
import tabletScreen from './images/tablet screen.jpg';

export default (props: any) => (
  <OuterContainer imageProp={swesinSwankOffice}>
    <FlexRow>
      <InnerContainerExtended>
        <h1>Automate Repetitive Task Posting</h1>
        <h4>Setup repeat rules and watch your tasks auto-assign to team members </h4>
        <StyledButton color='primary' variant='contained'>Try Now - Log In with Asana Account</StyledButton>
      </InnerContainerExtended>
      <ImageContainer minSize={300}>
        <FilledImage src={tabletScreen} />
      </ImageContainer>
    </FlexRow>
  </OuterContainer>
)

interface ExtendedProps { imageProp: string }

const OuterContainer = styled(OuterContainerBase)<ExtendedProps>`
  background-image: url(${({ imageProp }) => imageProp});
  background-size: cover;
  background-position: center center;
  box-shadow: inset 2000px 2000px 0 0 rgba(39, 1, 14, 0.8);
  margin-top: 70px;

  & * { color: white; }
`;

const InnerContainerExtended = styled(InnerContainerBase)`
  text-align: center;
  width: 93vw;
  max-width: 500px;
  align-items: center;
`;