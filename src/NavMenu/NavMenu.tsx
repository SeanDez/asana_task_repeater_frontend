import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

interface PropsShape {
  OAuthURL: string
}

export default (props: PropsShape) => (
  <div>
    <AppBar>
      <StyledToolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>

        <RightItems>
          <StyledAnchorTag href={props.OAuthURL}>
            <Button color='inherit'>Sign Up or Log In via Asana</Button>
          </StyledAnchorTag>
        </RightItems>

        <RightItems>
          <h6>Hello, nameHere</h6>
          <Button color='inherit'>Log Out</Button>
        </RightItems>
      </StyledToolbar>
    </AppBar>
  </div>
);

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