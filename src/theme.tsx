import styled from 'styled-components';

import patternedBg from './SalesView/images/abstractColorBg.jpg';
import swesinSwankOffice from './SalesView/images/swesinSwankOffice.jpg';
import softCurveShapes from './SalesView/images/softCurveShapes.jpg';
import softCircles from './SalesView/images/softCircles.jpg';
import texturedGrayGradient from './SalesView/images/texturedGrayGradient.jpg'
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
