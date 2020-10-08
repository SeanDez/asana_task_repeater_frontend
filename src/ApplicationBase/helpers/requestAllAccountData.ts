import buildUrl from 'build-url';
import 'es6-promise';
import 'isomorphic-fetch';
import Cookies from 'js-cookie';

const { REACT_APP_HTTPS_BACKEND_DOMAIN } = process.env as { [key: string]: string };

async function requestAllAccountData() {
  const allAccountDataEndpoint = buildUrl(REACT_APP_HTTPS_BACKEND_DOMAIN, {
    path: '/account-data/all'
  });
  const asana_email_encrypted: string = Cookies.get('asana_email_encrypted')!;

  try {
    const response = await fetch(allAccountDataEndpoint, {
      method: 'get',
      mode: 'cors',
      credentials: 'include', // needed for cookie setting by Express.js API
      headers: {
        'content-type': 'application/json',
        asana_email_encrypted
      },
    });

    const allAccountData = await response.json();
    console.log('allAccountData',allAccountData);
    return allAccountData;
  } catch (error) {
    throw new Error(error);
  }
}

export default requestAllAccountData;