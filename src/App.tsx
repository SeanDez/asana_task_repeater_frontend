import './App.scss';
import 'es6-promise';
import 'isomorphic-fetch';
import Cookies from 'js-cookie';
import nonce from 'nonce';
import queryString from 'query-string';
import React, { useState, useEffect } from 'react';

import AuthView from './AuthView/AuthView';
import Loader from './Loader';
import VisitorView from './VisitorView/VisitorView';

const { REACT_APP_HTTPS_BACKEND_DOMAIN, REACT_APP_ASANA_REDIRECT_URL_MINUS_STATE } = process.env;

enum cookieNames {
  email = 'asana_email_encrypted',
  state = 'asana_state',
  session = 'asana_session'
}

/*
  query parameter manipulation of asana_email happens only once, when the back end sends an encrypted jwt after oauth
*/
// grab query parameters
/* eslint-disable no-restricted-globals */
const queryParameters = Object(queryString.parse(location.search));
console.log('queryParameters', queryParameters); // asana_email logs to browser console

// save asana_email jwt to a cookie if it is passed as a query parameter
if (cookieNames.email in queryParameters) {
  Cookies.set(cookieNames.email, queryParameters[cookieNames.email]!);
} else {
  console.log('if block not hit')
}

function keyIsPresent(obj: object, targetKey: string): boolean {
  const keyNames = Object.keys(obj);
  return keyNames.some(key => key === targetKey);
}

function cookieIsPresent(keyName: string): boolean {
  const cookieValue = Cookies.getJSON(keyName);
  return typeof cookieValue !== 'undefined';
}

const newStateValue = nonce()();

/*
  Intent is to set a new, updated state value if there is no auth code being sent, or the app is first loaded and no prior state was previously set
*/
const allCookiesOnThisDomain = Cookies.getJSON();
console.log('allCookiesOnThisDomain :>> ', allCookiesOnThisDomain);

function setStateCookie(allCookies: object): void {
  const stateCookiePresent: boolean = cookieIsPresent(cookieNames.state);
  
  const queryParamKeys: string[] = Object.keys(queryParameters);
  const codeQueryParamPresent: boolean = queryParamKeys.some(keyName => keyName === 'code');
  
  if (stateCookiePresent === false || codeQueryParamPresent === false) {
    Cookies.set(cookieNames.state, newStateValue)
  }
}

if (typeof allCookiesOnThisDomain[cookieNames.state] === 'undefined') {
  setStateCookie(allCookiesOnThisDomain);
}


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

  const authCodeEndpoint = `${REACT_APP_HTTPS_BACKEND_DOMAIN}/oauth/`;
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

function App() {
  const [userData, setUserData] = React.useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // if (cookieIsPresent(cookieNames.state) && keyIsPresent(queryParameters, 'code')) {
  //   const fullData = await passAuthCodeAndReceiveUserData(queryParameters.code as string, queryParameters.state as string);
  //   setUserData(fullData);
  // }

  // set isAuthenticated to true if loggedIn cookie is present
  useEffect(() => {
    const emailCookieFound = cookieIsPresent(cookieNames.email);
    if (emailCookieFound) { setIsAuthenticated(true); }
  }, []);

  // set a new state cookie if none is present
  useEffect(() => {
    const stateCookieFound = cookieIsPresent(cookieNames.state);
    if (stateCookieFound === false) {
      Cookies.set(cookieNames.state, newStateValue);
    }
  })

  // if asana_loggedIn cookie is present, switch to auth view and fetch auth data
  const userDataHasLoaded = Object.keys(userData).length > 0;
  if (isAuthenticated && userDataHasLoaded === false) {
    return <Loader />
  } else if (isAuthenticated && userDataHasLoaded) {
    return <AuthView setIsAuthenticated={setIsAuthenticated} />
  } else {
    return (
      <VisitorView 
        newStateValue={newStateValue}
        allCookiesOnThisDomain={allCookiesOnThisDomain}
      />
    )
  }
}

export default App;
