import buildUrl from 'build-url';
import 'es6-promise';
import Cookies from 'js-cookie';
import 'isomorphic-fetch';
import envTypeGuarded from '../../shared/envVariablesTypeGuarded';

const { REACT_APP_HTTPS_BACKEND_DOMAIN } = envTypeGuarded;

async function requestAllAccountData() {
  const allAccountDataEndpoint = buildUrl(REACT_APP_HTTPS_BACKEND_DOMAIN, {
    path: '/account-data/all'
  });

  try {
    const response = await fetch(allAccountDataEndpoint, {
      method: 'get',
      mode: 'cors',
      credentials: 'include', // needed for cookie setting by Express.js API
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': "*"
      },
    });

    const allAccountData = await response.json();
    return allAccountData;
  } catch (error) {
    throw new Error(error);
  }
}

export default requestAllAccountData;