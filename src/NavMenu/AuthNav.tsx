import 'es6-promise';
import 'isomorphic-fetch';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import buildUrl from 'build-url';

import { StyledAppBar } from '../theme';
import Toolbar from '@material-ui/core/Toolbar';

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
    <StyledAppBar>
      <StyledToolbar>
        <StyledLink to="/originals">Originals</StyledLink>
        <StyledLink to="/rules">Rules</StyledLink>

        <RightItems>
          <StyledAnchorTag 
            onClick={() => logOut(setIsAuthenticated)}
          >Log Out</StyledAnchorTag>
        </RightItems>
      </StyledToolbar>
    </StyledAppBar>
  </OuterContainer>
);

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const OuterContainer = styled.div`
  margin-bottom: 80px;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  width: 90vw;
  max-width: 1000px;
  margin: 0 auto;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const RightItems = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const StyledAnchorTag = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;