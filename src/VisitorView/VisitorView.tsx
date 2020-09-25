import React from 'react';
import SalesDeck from '../SalesView/SalesDeck';
import FeatureSection from '../SalesView/FeatureSection';
import VisitorNav from '../NavMenu/VisitorNav';

const { REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE } = process.env;

interface PropsShape {
  newState: number;
}

export default ({ newState }: PropsShape) => {

  const OAuthURL = `${REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE}&state=${newState}`;
  console.log('OAuthURL',OAuthURL);

  return (
    <div>
      <header className="App-header">
        <VisitorNav 
          OAuthURL={OAuthURL} 
        />
      </header>

      <main>
        <SalesDeck />
        <FeatureSection />
      </main>
    </div>
  )
}