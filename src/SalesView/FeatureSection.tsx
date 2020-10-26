import React from 'react';
import styled from 'styled-components';

import { BodyInnerContainer, BodyOuterContainer } from '../theme';

export default (props: any) => (
  <BodyOuterContainer r={0} g={0} b={60} a={0.95}>
    <BodyInnerContainer>
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
    </BodyInnerContainer>
  </BodyOuterContainer>
)

