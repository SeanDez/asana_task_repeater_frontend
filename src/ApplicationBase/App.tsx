import './App.scss';
import 'es6-promise';
import 'isomorphic-fetch';
import Cookies from 'js-cookie';
import nonce from 'nonce';
import queryString from 'query-string';
import React, { useState, useEffect } from 'react';

import AuthView from '../AuthView/AuthView';
import Loader from '../Loader';
import requestAllAccountData from './helpers/requestAllAccountData';
import VisitorView from '../VisitorView/VisitorView';

enum cookieNames {
  email = 'asana_email_encrypted',
  state = 'asana_state',
  session = 'asana_session'
}

// grab query parameters
/* eslint-disable no-restricted-globals */
const queryParameters = Object(queryString.parse(location.search));
console.log('queryParameters', queryParameters); // asana_email logs to browser console

// save asana_email jwt to a cookie if it is passed as a query parameter
if (cookieNames.email in queryParameters) {
  Cookies.set(cookieNames.email, queryParameters[cookieNames.email]!);
  console.log('asana email value saved to cookie')
} else {
  console.log('if block not hit. no asana_email key saved')
}

function cookieIsPresent(keyName: string): boolean {
  const cookieValue = Cookies.getJSON(keyName);
  return typeof cookieValue !== 'undefined';
}

const newStateValue = nonce()();



const allCookiesOnThisDomain = Cookies.getJSON();
console.log('allCookiesOnThisDomain :>> ', allCookiesOnThisDomain);

/*
  Set a new, updated state value if there is no auth code being sent, or the app is first loaded and no prior state was previously set
*/
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

function App() {
  const [accountData, setAccountData] = React.useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  // set a new state cookie if none is present
  useEffect(() => {
    const stateCookieFound = cookieIsPresent(cookieNames.state);
    if (stateCookieFound === false) {
      Cookies.set(cookieNames.state, newStateValue);
    }
  })
  
  // set isAuthenticated to true if email cookie is present (means user has active session)
  useEffect(() => {
    const emailCookieFound = cookieIsPresent(cookieNames.email);
    if (emailCookieFound) { setIsAuthenticated(true); }
  }, []);
  
  // under loading conditions only, request the account's full dataset
  useEffect(() => {
    async function fetchAllAccountDataIfInLoadingState() {
      const numberOfUserDataKeys = Object.keys(Object(accountData)).length;
      if (numberOfUserDataKeys === 0 && isAuthenticated === true) {
        const fullAccountData = await requestAllAccountData();
        console.log('fullAccountData', fullAccountData);
        setAccountData(fullAccountData);
      }
    }
    fetchAllAccountDataIfInLoadingState();
  }, [isAuthenticated, accountData]);

  // return views for either visitors, loading state, or auth user
  const userDataHasLoaded = Object.keys(accountData).length > 0;
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
