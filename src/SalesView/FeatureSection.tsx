import React from 'react';
import phoneScreen from './images/smartphone screen.jpg';
import { BodyInnerContainer, BodyOuterContainer, FlexRow, FilledImage, SmallTextArea, ImageContainer } from '../theme';

export default (props: any) => (
  <BodyOuterContainer r={255} g={255} b={255} a={1}>
    <BodyInnerContainer>
      <FlexRow>
        <SmallTextArea
          minSize={310}
        >
          <h2>Set a rule once, repeat forever</h2>
          <p>Some tasks need to keep being posted. With this service, you can mark any task in Asana to be repeated automativcally</p>

          <h2>Phone Number Call Tracking (In Development)</h2>
          <p>Asana task repeater is in the process of merging with Voip.ms Call Tracker, into a single application. 
          </p>
          <p>
            Soon you will be able to create campaigns for your Voip.ms phone numbers and track the number of calls per camapiagn. Charts will offer a visual aid of call performance over time.
          </p>
        </SmallTextArea>
        <ImageContainer minSize={300}>
          <FilledImage src={phoneScreen} />
        </ImageContainer>
      </FlexRow>
    </BodyInnerContainer>
  </BodyOuterContainer>
)


