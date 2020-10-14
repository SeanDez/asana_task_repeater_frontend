import React from "react";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import AuthNav from '../NavMenu/AuthNav';
import Originals from './Originals/Originals';
import IAccountData from './IAccountData';

interface ProjectConpact {
  gid: string;
  name: string;
  resource_type?: 'project'
}

interface EnhancedTask {
  gid: string;
  name: string;
  notes: string;
  due_on: string | null;
  tags: string[];
  projects: ProjectConpact[]
}

interface AccountData {
  projectCompacts: ProjectConpact[];
  tasksEnhanced: EnhancedTask[];
}

interface PropsShape {
  setIsAuthenticated: Function;
  accountData: IAccountData;
}

export default ({ setIsAuthenticated, accountData }: PropsShape) => {
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
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
        </Switch>
      </main>
    </div>
  )
}