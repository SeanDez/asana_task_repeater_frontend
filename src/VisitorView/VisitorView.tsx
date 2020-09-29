import React from 'react';
import SalesDeck from '../SalesView/SalesDeck';
import FeatureSection from '../SalesView/FeatureSection';
import VisitorNav from '../NavMenu/VisitorNav';


const { REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE } = process.env as { [key: string]: string };

interface PropsShape {
  newStateValue: number;
  allCookiesOnThisDomain: any;
}

export default ({ newStateValue, allCookiesOnThisDomain }: PropsShape) => {

  const OAuthURL = `${REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE}&state=${newStateValue}`;
  console.log('OAuthURL',OAuthURL);

  return (
    <div>
      <header className="App-header">
        <VisitorNav 
          OAuthURL={OAuthURL} 
        />
      </header>

      <main>
        <SalesDeck
          allCookiesOnThisDomain={allCookiesOnThisDomain}
        />
        <FeatureSection />
      </main>
    </div>
  )
}