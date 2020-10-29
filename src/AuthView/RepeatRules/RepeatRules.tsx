import buildUrl from 'build-url';
import 'es6-promise';
import 'isomorphic-fetch';
import moment from 'moment';
import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Cookies from 'js-cookie';
import { DeleteForeverOutlined } from '@material-ui/icons';

const { REACT_APP_HTTPS_BACKEND_DOMAIN } = process.env as { [key: string]: string };
const asana_email_encrypted = Cookies.get('asana_email_encrypted')!;

interface IRuleData {
  app_user_id: number;
  local_id: number;
  project_gid: string;
  project_name: string;
  repeat_interval: number;
  repeat_unit: 'days' | 'weeks' | 'months';
  start_timestamp: string; // Mon Oct 19 2020 17:00:00 GMT+0700 (Indochina Time)
  task_gid: string;
  task_name: string;
 }

async function loadRepeatRulesToState(emailIdEncrypted: string, setRuleData: Function) {
  const getRuleDataEndpoint = buildUrl(REACT_APP_HTTPS_BACKEND_DOMAIN, {
    path: '/repeat-rules/all'
  });
  console.log('getRuleDataEndpoint', getRuleDataEndpoint);

  try {
    const response = await fetch(getRuleDataEndpoint, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({
        'content-type': 'application/json',
        asana_email_encrypted: emailIdEncrypted,
      })
    });

    if (response.ok) {
      const ruleData = await response.json();
      setRuleData(ruleData);
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteRule(localId: number, emailEncrypted: string) {
  const deleteEndpoint = buildUrl(REACT_APP_HTTPS_BACKEND_DOMAIN, {
    path: '/repeat-rules/'
  });

  const body = JSON.stringify({ localId });

  try {
    const response = await fetch(deleteEndpoint, {
      method: 'delete',
      mode: 'cors',
      headers: new Headers({
        'content-type': 'application/json',
        asana_email_encrypted: emailEncrypted,
      }),
      body,
    })
  
    if (response.ok) {
      // todo set state on a snackbar message
      console.log('delete request probably worked');
    }
  } catch (error) {
    throw new Error(error);
  }
}

/*
  Renders a table of rules
*/
export default () => {
  const [ruleData, setRuleData] = useState<IRuleData[] | {}>({});
  const ruleDataIsPopulated: boolean = Object.keys(ruleData).length > 0;

    /*
      populates repeat rules on component render
      
      also updates on dataset changes
    */
    useEffect(() => {
      loadRepeatRulesToState(asana_email_encrypted, setRuleData) 
    }, []);

  if (ruleDataIsPopulated === false) {
    return (
      <OuterContainer>
        <h3>No repeat rules are available to be displayed. Create a new repeater from the "originals" view.</h3>
      </OuterContainer>
    )
  }

  return (
    <OuterContainer>
      <div>
        <h2>Repeat Rules</h2>
        <p>Each task with a repeat rule is listed below. Jobs are checked for a duplication event every 30 minutes, which means it may take up to 30 minutes for a task to be duplicated as expected.</p>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name (Project Name)</TableCell>
              <TableCell align="right">Start Date & Time</TableCell>
              <TableCell align="right">Repeat Frequency</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (ruleData as IRuleData[]).map(({ start_timestamp, local_id, repeat_interval, repeat_unit, task_gid, task_name, project_gid, project_name }: IRuleData) => (
              <TableRow key={local_id}>
                <TableCell>{task_name} ({project_name})</TableCell>
                <ClickableCell align="right">{moment(start_timestamp).format('MMM D[,] YYYY [at] H:MM A [(]Z[)]')}</ClickableCell>
                <ClickableCell align="right">{`every ${repeat_interval} ${repeat_unit}`}</ClickableCell>
                <ClickableCell 
                  align="right"
                >
                  <DeleteForeverIcon fontSize="small" onClick={async () => {
                    await deleteRule(local_id, asana_email_encrypted);
                    await loadRepeatRulesToState(asana_email_encrypted, setRuleData);
                  }} />
                </ClickableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  padding: 2vh 2vw;
`;

const ClickableCell = styled(TableCell)`
  & :hover {
    cursor: pointer;
  } 
`;