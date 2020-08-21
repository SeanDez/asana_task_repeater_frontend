import React from 'react';
import './App.scss';
import queryString from 'query-string';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import nonce from 'nonce';

import SalesDeck from './SalesView/SalesDeck';
import FeatureSection from './SalesView/FeatureSection';

import NavMenu from './NavMenu/NavMenu';

// grab query parameters
/* eslint-disable no-restricted-globals */
const queryParameters = queryString.parse(location.search);
console.log('queryParameters', queryParameters);

const allCookiesOnThisDomain = Cookies.getJSON();
console.log('allCookiesOnThisDomain :>> ', allCookiesOnThisDomain);

const newState = nonce()();

const OAuthURL = `${process.env.REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE}&state=${newState}`;

/*
  Intent is to set a new, updated state value if there is no auth code being sent, or the app is first loaded and no prior state was previously set
*/
(function setPriorState(allCookies: object): void {
  const priorState: string | undefined = Cookies.getJSON('asana_priorState');
  
  const queryParamKeys: string[] = Object.keys(queryParameters);
  const codeQueryParamPresent: boolean = queryParamKeys.some(keyName => keyName === 'code');
  
  if (typeof priorState === 'undefined' || codeQueryParamPresent === false) {
    Cookies.set('asana_priorState', newState)
  }
})(allCookiesOnThisDomain);


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavMenu OAuthURL={OAuthURL} />
        </header>

        <main>
          <SalesDeck />
          <FeatureSection />
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
