import styled from 'styled-components';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import grungeTexture from './SalesView/images/grungeTexture.jpg';

export const theme = {}

export const InnerContainerBase = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const BodyInnerContainer = styled(InnerContainerBase)`
  margin: 0 auto;
  width: 90vw;
  max-width: 900px;
`;

export const OuterContainerBase = styled.section`
  width: 100vw;
  padding: 8vh 0;
`;

interface rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const BodyOuterContainer = styled(OuterContainerBase)<rgba>`
  background-image: url(${grungeTexture});
  background-size: cover;
  background-position: center center;
  box-shadow: inset 2000px 2000px 0 0 rgba(
    ${({ r, g, b, a }) => `${r}, ${g}, ${b}, ${a}`}
  );
`;

export const StyledAppBar = withStyles({
  root: { backgroundColor: '#111' }
})(AppBar);

export const StyledButton = withStyles({
  root: { backgroundColor: 'rgb(45, 130, 183)' }
})(Button);

export const FlexRow = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: center;

& > * {
  margin: 2vh 2vw;
}
`;

export const FilledImage = styled.img`
  height: 100%;
  width: 100%;
`;

export const ImageContainer = styled.div<MinSize>`
  width: max(${({ minSize }: any) => minSize}px, 35vw); 
  height: auto; 
`;

interface MinSize { minSize: number }

export const SmallTextArea = styled.div<MinSize>`
  width: min(${({ minSize }: any) => minSize}px, 100%);
  flex-grow: 10;
`;