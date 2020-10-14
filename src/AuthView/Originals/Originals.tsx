import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import lodash from 'lodash';
import IAccountData from '../IAccountData';
import { IProjectWithSortedTasks } from './IProjectWithSortedTasks';
import { ProjectData } from './ProjectData';

interface PropsShape {
  accountData: IAccountData;
}

export default ({ accountData }: PropsShape) => {
  const [projectTaskData, setProjectTaskData] = useState({});

  /*
    aggregate data into project.tasks
    save to state
  */
  useEffect(() => {
    const projectData = new ProjectData(accountData);
    const organizedProjectTaskData: IProjectWithSortedTasks[] = projectData.organizeAndFilter();
    console.log('organizedProjectTaskData :>> ', organizedProjectTaskData);
    setProjectTaskData(organizedProjectTaskData);
  }, [accountData])

/*
  project names are the headings
  tasks are the items
*/
  return (
    <OuterContainer>
      <h2>Originals here</h2>
      <h2>Originals here</h2>
      <h2>Originals here</h2>
      <h2>Originals here</h2>
      <h2>Originals here</h2>
      <h2>Originals here</h2>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  border: 2px dashed yellow;
`;