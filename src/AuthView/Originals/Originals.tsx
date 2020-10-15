import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import lodash from 'lodash';
import IAccountData from '../IAccountData';
import { IProjectWithSortedTasks } from './IProjectWithSortedTasks';
import { ProjectData } from './ProjectData';
import { ITask } from './ITask';
import { RepeatRuleAdder } from './RepeatRuleAdder';
import "react-datetime/css/react-datetime.css";

interface PropsShape {
  accountData: IAccountData;
}

export default ({ accountData }: PropsShape) => {
  const [projectTaskData, setProjectTaskData] = useState<IProjectWithSortedTasks[]>([]);

  /*
    aggregate data into project.tasks
    save to state
  */
  useEffect(() => {
    const projectData = new ProjectData(accountData);
    const organizedProjectTaskData: IProjectWithSortedTasks[] = projectData.organizeAndFilter();
    setProjectTaskData(organizedProjectTaskData);
  }, [accountData])

  /*
    project names are the headings
    tasks are the items
  */
  return (
    <OuterContainer>
       { projectTaskData.map(((projectAndTasks: IProjectWithSortedTasks) => (
         <div key={projectAndTasks.gid}>
           <h4>{projectAndTasks.name}</h4>
           <hr />
           <ul>
           { projectAndTasks.tasks.map((task: ITask) => (
             <li key={task.gid}>
               <p>{task.name}</p>
               <p>{task.due_on}</p>
               {/* <p>{task.notes}</p> */}
               <p>{task.tags}</p>
               <RepeatRuleAdder
                projectGid={projectAndTasks.gid}
                taskGid={task.gid}
               />
             </li>
           )) }
           </ul>
         </div>
       ))) }
    </OuterContainer>
  )
}

const OuterContainer = styled.section`
  border: 2px dashed yellow;
`;