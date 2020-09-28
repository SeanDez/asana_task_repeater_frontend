import React from "react";
import { Switch, Route } from 'react-router-dom';

import AuthNav from '../NavMenu/AuthNav';

interface PropsShape {
  setIsAuthenticated: Function
}

export default ({ setIsAuthenticated }: PropsShape) => {

  return (
    <div>
      <header className="App-header">
        <AuthNav setIsAuthenticated={setIsAuthenticated} />
      </header>

      <main>
        
      </main>
    </div>
  )
}