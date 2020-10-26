import React from 'react';
import styled from 'styled-components';

import patternedBg from './images/abstractColorBg.jpg';
import swesinSwankOffice from './images/swesinSwankOffice.jpg';
import softCurveShapes from './images/softCurveShapes.jpg';
import softCircles from './images/softCircles.jpg';
import texturedGrayGradient from './images/texturedGrayGradient.jpg'
import grungeTexture from './images/grungeTexture.jpg';

export default (props: any) => (
  <OuterContainer importedImage={ grungeTexture }>
    <InnerContainer>
      <section>
        <h3>Set a rule once, repeat forever</h3>
        <p>Some tasks need to keep being posted. With this service, you can mark any task in Asana to be repeated automativcally</p>
      </section>

      <section>
        <h3>Phone Number Call Tracking (In Development)</h3>
        <p>Asana task repeater is in the process of merging with Voip.ms Call Tracker, into a single application. 
        </p>
        <p>
          Soon you will be able to create campaigns for your Voip.ms phone numbers and track the number of calls per camapiagn. Charts will offer a visual aid of call performance over time.
        </p>
      </section>
    </InnerContainer>
  </OuterContainer>
)

interface styledProps { importedImage: string }

const OuterContainer = styled.div<styledProps>`
  margin: 0 auto;
  background-image: url(${({ importedImage }) => importedImage});
  background-size: cover;
  background-position: center center;
  box-shadow: inset 2000px 2000px 0 0 rgba(5, 2, 31, 0.93);
  width: 100vw;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  border: 2px dashed red;
  width: 90vw;
  max-width: 900px;
`;