import React from 'react';
import VisitorNav from '../NavMenu/VisitorNav';
import DeveloperNote from '../SalesView/DeveloperNote';
import SalesDeck from '../SalesView/SalesDeck';
import FeatureSection from '../SalesView/FeatureSection';
import FAQ from '../SalesView/FAQ';
import ProblemSolution from '../SalesView/ProblemSolution';
import styled from 'styled-components';

const { REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE } = process.env as { [key: string]: string };

interface PropsShape {
  newStateValue: number;
  allCookiesOnThisDomain: any;
}

export default ({ newStateValue, allCookiesOnThisDomain }: PropsShape) => {

  const OAuthURL = `${REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE}&state=${newStateValue}`;
  console.log('OAuthURL',OAuthURL);

  return (
    <OuterContainer>
      <header className="App-header">
        <VisitorNav 
          OAuthURL={OAuthURL} 
        />
      </header>

      <main>
        <SalesDeck
          allCookiesOnThisDomain={allCookiesOnThisDomain}
        />
        <ProblemSolution />
        <FeatureSection />
        <DeveloperNote />
        <FAQ />
      </main>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  max-width: 900px;
`;