import React, { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import AuthNav from '../NavMenu/AuthNav';
import Originals from './Originals/Originals';
import IAccountData from './interfaces/IAccountData';
import RepeatRules from './RepeatRules/RepeatRules';

interface PropsShape {
  setIsAuthenticated: Function;
  accountData: IAccountData;
}

/*
  Holds navigation and main section of account area

  Also controls data flow for data that may overlap sections
*/
export default ({ setIsAuthenticated, accountData }: PropsShape) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    location.pathname === '/' && history.push('/originals');
  }, [location, history]);

  return (
    <div>
      <header className="App-header">
        <AuthNav setIsAuthenticated={setIsAuthenticated} />
      </header>

      <main>
        <Switch>
          <Route path='/originals'>
            <Originals 
              accountData={accountData}
            />
          </Route>
          <Route path='/rules'>
            <RepeatRules />
          </Route>
        </Switch>
      </main>
    </div>
  )
}