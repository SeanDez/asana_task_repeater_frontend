import buildUrl from 'build-url';
import 'es6-promise';
import 'isomorphic-fetch';
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

const { REACT_APP_HTTPS_BACKEND_DOMAIN } = process.env;
const asana_email_encrypted = Cookies.get('asana_email_encrypted')!;

interface IRuleData {
  startDateTime: string,
  timeInterval: number,
  timeUnit: 'days' | 'weeks' | 'months',
  localId: string,
  taskGid: string,
  projectGid: string,
}

async function loadRepeatRulesToState(setRuleData: Function) {
  const getRuleDataEndpoint = buildUrl(REACT_APP_HTTPS_BACKEND_DOMAIN!, {
    path: '/repeat-rules/all'
  });

  try {
    const response = await fetch(getRuleDataEndpoint, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({
        'content-type': 'application/json',
        asana_email_encrypted
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

/*
  Renders a table of rules
*/
export default () => {
  const [ruleData, setRuleData] = useState<IRuleData[] | {}>({});
  const ruleDataIsPopulated: boolean = Object.keys(ruleData).length > 0;

  if (ruleDataIsPopulated === false) {
    return (
      <div>
        <h3>No repeat rules are available to be displayed. Create a new repeater from the "originals" view.</h3>
      </div>
    )
  }

  /* populates repeat rules on component render
    
    also updates on dataset changes */
  useEffect(() => { loadRepeatRulesToState(setRuleData) }, [ruleData])

  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Rule</TableCell>
          <TableCell align="right">Rule Name</TableCell>
          <TableCell align="right">Repeat Frequency</TableCell>
          <TableCell align="right">Start Date & Time</TableCell>
          <TableCell align="right">Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { (ruleData as IRuleData[]).map(({ startDateTime, localId, timeInterval, timeUnit, taskGid, projectGid }: IRuleData) => (
          <TableRow>
            <TableCell>Placeholder ({localId})</TableCell>
            <TableCell align="right">{`${timeInterval} ${timeUnit}`}</TableCell>
            <TableCell align="right">{startDateTime}</TableCell>
            <TableCell align="right">
              <DeleteForeverIcon fontSize="small" />
            </TableCell>
          </TableRow>
        )) }
      </TableBody>
    </TableContainer>
  )
}