import React from 'react';
import styled from 'styled-components';

export default () => (
  <OuterContainer>
    <InnerContainer>
      <h2>A Note From the Developer</h2>

      <p>My name is Sean and I'm the developer of this application.</p> 
        
      <p>
        Tired of copying tasks manually, I decided it would be worth a weekend to setup a small auto-copying application. 
      </p>

      <p>
        It took a while longer than that! In software engineering there is an acronym we use, YAGNI. It stands for "You Ain't Gonna Need It." A small app initially for myself evolved into a mid sized app suitable for other business owners and team leads who could use automated task recreation on Asana.
      </p>

      <p>
        At least it's done now! Or is it... 
      </p>

      <h3>Next Phase</h3>

      <p>
        My goal is to evolve this application into a marketing campaign analysis and management tool. The functionality of task duplication isn't going anywhere, so please don't get scared. The next major feature I will add is phone number tracking for numbers purchased from Voip.ms. Such a feature will be useful for me, and I suspect other marketers who use calls as a tracking metric. 
      </p>
        
      <p>
        I don't expect to turn the service into a paid application, so please continue to enjoy it free of charge when those changes are added. 
      </p>
    </InnerContainer>
  </OuterContainer>
);

const OuterContainer = styled.section`
  width: 100vw;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  width: 90vw;
  max-width: 900px;
  text-align: center;
`;

