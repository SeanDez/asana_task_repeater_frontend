import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

interface PropsShape {
  OAuthURL: string;
}

export default (props: PropsShape) => (
  <OuterContainer>
    <AppBar>
      <StyledToolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>

        {  }
        <RightItems>
          <StyledAnchorTag href={props.OAuthURL}>
            <Button color='inherit'>Sign Up or Log In via Asana</Button>
          </StyledAnchorTag>
        </RightItems>
      </StyledToolbar>
    </AppBar>
  </OuterContainer>
);

const OuterContainer = styled.div`
  margin-bottom: 60px;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  width: 90vw;
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