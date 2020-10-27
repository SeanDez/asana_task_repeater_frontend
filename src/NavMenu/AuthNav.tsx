import 'es6-promise';
import 'isomorphic-fetch';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import buildUrl from 'build-url';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

/*
  Calls the back end to delete the auth related cookies

  Switches to unauth state
*/
async function logOut(setIsAuthenticated: Function): Promise<void> {
  const logoutUrl = buildUrl(process.env.REACT_APP_HTTPS_BACKEND_DOMAIN!, {
    path: '/oauth/log-out'
  });

  await fetch(logoutUrl, { mode: 'cors' });
  setIsAuthenticated(false);
}

interface PropsShape {
  setIsAuthenticated: Function
}

export default ({ setIsAuthenticated }: PropsShape) => (
  <OuterContainer>
    <AppBar>
      <StyledToolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>

        <Link to="/originals">Originals</Link>
        <Link to="/rules">Rules</Link>

        <RightItems>
          <h6>Hello, name</h6>
          <Button 
            color='inherit'
            onClick={() => logOut(setIsAuthenticated)}
          >Log Out</Button>
        </RightItems>
      </StyledToolbar>
    </AppBar>
  </OuterContainer>
);

const OuterContainer = styled.div`
  margin-bottom: 170px;
  border: 2px dashed yellow;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  width: 90vw;
  max-width: 1000px;
  margin: 0 auto;
  flex-flow: row wrap;
  justify-content: space-between;
  border: 2px dashed yellow;
`;

const RightItems = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const StyledAnchorTag = styled.a`
  color: inherit;
  text-decoration: none;
`;