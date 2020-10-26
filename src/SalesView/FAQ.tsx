import React from 'react';
import styled from 'styled-components';

export default () => (
  <OuterContainer>
    <InnerContainer>
    <h2>Frequently Asked Questions</h2>

    <FaqBlock>
      <h4>Do I need an Asana Account?</h4>
      <p>Yes, you need an account just to log into Asana Task Repeater. This service is of no use without one.</p>
    </FaqBlock>

    <FaqBlock>      
      <h4>How much does this service cost?</h4>
      <p>It doesn't cost anything. It will probably stay free unless the cost of hosting the application starts to become and issue. Then a very nominal fee will be charged just to keep the service publicly available.</p>
    </FaqBlock>

    <FaqBlock>      
      <h4>Why did you build this tool?</h4>
      <p>I am working on a side business in real estate that has high task repetition. I saw an app like this as a great way to help my assistant keep track of her duties while unburdening me from management. I wanted more time to analyze our efforts and build better processes to allow the business to expand. To me, a task repeater was a perfect tool to aid with that.</p>
    </FaqBlock>
    
    <FaqBlock>      
      <h4>What are good use cases for auto-repeating tasks?</h4>
      <ul>
        <li>Your tasks are repetitive and on a regular schedule.</li>
        <li>The same people receive a task each week.</li>
        <li>Little to no customizatin is needed each week.</li>
      </ul>
    </FaqBlock>

    <FaqBlock>      
      <h4>What use cases are not a good fit?</h4>
      <p>Bad use cases involve a high degree of change each week.</p>
      <ul>
        <li>You have high turnover. New people must be assigned to tasks regularly.</li>
        <li>Your tasks are irregular in focus or deadline.</li>
        <li>Task descriptions require minor tweaks each time.</li>
      <p>In some of these cases ATR may still help, if you setup skeleton tasks to duplicate, and then fill the details manually. But this is not full task automation, and time savings will be minimal compared to manually duplicating a task within the Asana interface.</p>
      </ul>
    </FaqBlock>
    
    <FaqBlock>      
      <h4>How much time will this save me per week?</h4>
      <p>Determine the amount of time you spend scheduling tasks for team members. Narrow down to the tasks that are repetitive. Asana Task Repeater may save time and mental load by automating those specific tasks.</p> 
      <p>In raw time savings I personally may save 45 minutes per week. The mental benefit, of not having to fulfill another checklist item each Friday, may be an even bigger benefit than that 45 minutes per week.</p>
    </FaqBlock>
    </InnerContainer>
  </OuterContainer>
)

const OuterContainer = styled.section`
  width: 100vw;
  border: 2px dashed green;
`;


const InnerContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  width: 90vw;
  max-width: 900px;
`;

const FaqBlock = styled.div`

`;