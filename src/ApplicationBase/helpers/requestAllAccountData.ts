import buildUrl from 'build-url';
import 'es6-promise';
import 'isomorphic-fetch';
import envTyped from '../../shared/envVariablesTyped';

const { REACT_APP_HTTPS_BACKEND_DOMAIN } = envTyped;

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