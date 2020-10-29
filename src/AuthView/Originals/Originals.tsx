import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IAccountData from '../interfaces/IAccountData';
import { IProjectWithSortedTasks } from './IProjectWithSortedTasks';
import { ProjectData } from './ProjectData';
import { ITask } from './ITask';
import { RepeatRuleAdder } from './RepeatRuleAdder';
import "react-datetime/css/react-datetime.css";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
      <div>
        <h2>Original Tasks</h2>
        <p>Your Asana tasks that aren't copies are shown below. To set up a repeat rule on any task, click the "add" button. Then set a start date and repeat frequency.</p>
      </div>
      { projectTaskData.map(((projectAndTasks: IProjectWithSortedTasks) => (
        <div key={projectAndTasks.gid}>
          <h4 style={{ paddingTop: 30 }}>{projectAndTasks.name}</h4>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task Name</TableCell>
                  <TableCell align="right">Due Date</TableCell>
                  <TableCell align="right">Tags</TableCell>
                  <TableCell></TableCell> {/* Empty cell for alignment */}
                </TableRow>
              </TableHead>
            <TableBody>
            { projectAndTasks.tasks.map((task: ITask) => (
              <TableRow key={task.gid}>
                    <TableCell>{task.name} ({task.gid})</TableCell>
                    <TableCell align="right">{task.due_on}</TableCell>
                    <TableCell align="right">{task.tags}</TableCell>
                    <TableCell align="center">
                      <RepeatRuleAdder
                        projectGid={projectAndTasks.gid}
                        projectName={projectAndTasks.name}
                        taskGid={task.gid}
                        taskName={task.name}
                        />
                    </TableCell>
                </TableRow>
            )) }
            </TableBody>
          </Table>
          </TableContainer>
        </div>
      ))) }
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  padding: 2vh 2vw;
`;