import React from 'react';
import 'isomorphic-fetch';
import 'es6-promise';

import './App.scss';
import queryString from 'query-string';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import nonce from 'nonce';

import SalesDeck from './SalesView/SalesDeck';
import FeatureSection from './SalesView/FeatureSection';

import NavMenu from './NavMenu/NavMenu';

enum cookieNames {
  state = 'asana_priorState',
  session = 'asana_session'
}

// grab query parameters
/* eslint-disable no-restricted-globals */
const queryParameters = queryString.parse(location.search);
console.log('queryParameters', queryParameters);

const allCookiesOnThisDomain = Cookies.getJSON();
console.log('allCookiesOnThisDomain :>> ', allCookiesOnThisDomain);

const newState = nonce()();

const OAuthURL = `${process.env.REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE}&state=${newState}`;

function keyIsPresent(obj: object, targetKey: string): boolean {
  const keyNames = Object.keys(obj);
  return keyNames.some(key => key === targetKey);
}

function cookieIsPresent(keyName: string) {
  const value = Cookies.getJSON(keyName);
  return typeof value !== 'undefined';
}

/*
  Intent is to set a new, updated state value if there is no auth code being sent, or the app is first loaded and no prior state was previously set
*/
(function setStateCookie(allCookies: object): void {
  const stateCookiePresent: boolean = cookieIsPresent(cookieNames.state);
  
  const queryParamKeys: string[] = Object.keys(queryParameters);
  const codeQueryParamPresent: boolean = queryParamKeys.some(keyName => keyName === 'code');
  
  if (stateCookiePresent === false || codeQueryParamPresent === false) {
    Cookies.set(cookieNames.state, newState)
  }
})(allCookiesOnThisDomain);

/*
  Passes the auth code to the backend endpoint
  The new or old user's account data is then returned
*/
async function passAuthCodeAndReceiveUserData(code: string, stateParam: string) {
  let statesMatch: boolean;
  if (cookieIsPresent(cookieNames.state)) {
    const priorState = Cookies.getJSON(cookieNames.state);
    statesMatch = priorState === stateParam;
  } else {
    throw new Error(`${cookieNames.state} not found`);
  }

  const authCodeEndpoint = `${process.env.REACT_APP_HTTPS_BACKEND_DOMAIN}/authCode`;
  const requestBody = { code, state: stateParam };

  if (statesMatch) {
    try {
      const response = await fetch(authCodeEndpoint, {
        method: 'post',
        mode: 'cors',
        credentials: 'include', // needed for cookie setting by Express.js API
        headers: {
          'content-type': 'application/json',
          'access-control-allow-origin': "*"
        },
        body: JSON.stringify(requestBody)
      });
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    console.log('Authorization failed, state param does not match cookie priorState');
  }
}


async function App() {
  const [userData, setUserData] = React.useState({});

  if (cookieIsPresent(cookieNames.state) && keyIsPresent(queryParameters, 'code')) {
    const fullData = await passAuthCodeAndReceiveUserData(queryParameters.code as string, queryParameters.state as string);
    setUserData(fullData);
  }

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
