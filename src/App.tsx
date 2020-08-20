import React from 'react';
import './App.scss';

import NavMenu from './NavMenu/NavMenu';

const oAuthEndpoint: string = `${process.env.REACT_APP_BACKEND_DOMAIN}/oauth`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavMenu />
      </header>
    </div>
  );
}

export default App;
