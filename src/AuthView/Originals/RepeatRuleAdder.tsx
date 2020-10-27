import buildUrl from 'build-url';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import DateTime from 'react-datetime';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const { REACT_APP_HTTPS_BACKEND_DOMAIN } = process.env;

interface SnackbarData {
  status: string;
  message: string;
}

/*
  sends a fetch request to backend API to create a new repeater rule in the database
*/
async function createNewRepeatRule(projectGid: string, projectName: string, taskGid: string, taskName: string, timeInterval: number, timeUnit: string, startDateTime: string): Promise<SnackbarData> {
  const ruleEndpoint = buildUrl(REACT_APP_HTTPS_BACKEND_DOMAIN!, {
    path: '/repeat-rules/',
  });

  const asana_email_encrypted = Cookies.get('asana_email_encrypted')!;

  const body = JSON.stringify({ projectGid, projectName, taskGid, taskName, timeInterval, timeUnit, startDateTime })

  try {
    const response = await fetch(ruleEndpoint, {
      method: 'post',
      mode: 'cors',
      headers: new Headers({
        'content-type': 'application/json',
        asana_email_encrypted,
      }),
      body
    });

    if (response.ok) {
      return { status: 'success', message: 'New repeater successfully added' };
    } else {
      const { name, message } = await response.json();
      return { status: 'error', message: `${name} - ${message}` };
    }
  } catch (error) {
    throw new Error(error);
  }
}


export function RepeatRuleAdder({ projectGid, projectName, taskGid, taskName }: any) {
  const [addRuleView, setAddRuleView] = React.useState(false);
  const [timeInterval, setTimeInterval] = React.useState<number>(2)
  enum TimeUnits { days = 'days', weeks = 'weeks', months = 'months' };
  const [timeUnit, setTimeUnit] = React.useState<string>(TimeUnits.weeks);

  const today: string = moment().format('YYYY-MM-DD HH:MM A');
  const [startDateTime, setStartDateTime] = React.useState<string>(today);
  const [snackbar, setSnackbar] = React.useState({});

  if (addRuleView === false) {
    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          value={taskGid}
          onClick={() => setAddRuleView(true)}
        >
          Add repeater
        </Button>
      </div>
    );
  }

  return (
    <div>
      <form>
        <div>
          <SlightlyPaddedDiv>
              <span>Every </span>
              <span>
                <Input 
                  type='number' 
                  onBlur={e => setTimeInterval(Number(e.target.value))} 
                  defaultValue="2"
                  style={{ width: 100, textAlign: 'center' }}
                />
              </span>
            <WrappingContainer>
              <RowLockedOption>
                <input type='radio' 
                  value={TimeUnits.days} 
                  onChange={(e: any) => setTimeUnit(TimeUnits.days)} 
                />
                <label> { TimeUnits.days }</label>
              </RowLockedOption>
              <RowLockedOption>
                <input type='radio' value={ TimeUnits.weeks } onChange={(e: any) => setTimeUnit(TimeUnits.weeks)} checked />
                <label> { TimeUnits.weeks }</label>
              </RowLockedOption>
              <RowLockedOption>
                <input type='radio' value={TimeUnits.months} onChange={(e: any) => setTimeUnit(TimeUnits.months)} />
                <label> { TimeUnits.months }</label>
              </RowLockedOption>
            </WrappingContainer>
          </SlightlyPaddedDiv>


          <span>Start Date: </span>
          <DateTime
            value={startDateTime}
            onChange={(e: any) => setStartDateTime(e)}
          />
        </div>

        <SlightlyPaddedDiv>
          <RowLockedOption>
            <Button 
              variant='outlined'
              color='primary'
              onClick={async e => { 
                e.preventDefault();
                const snackbarData: SnackbarData = await createNewRepeatRule(projectGid, projectName, taskGid, taskName, timeInterval, timeUnit, startDateTime);
                setSnackbar(snackbarData);
                console.log(snackbar);
              }}
            >
              Create
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={e => { 
                e.preventDefault();
                setAddRuleView(false)        
              }}
            >
              X Close
            </Button>
          </RowLockedOption>
        </SlightlyPaddedDiv>
      </form>
    </div>
  )
}

const SlightlyPaddedDiv = styled.div`
  padding: 1vh 1vw;
`;

const RowLockedOption = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-left: 1vw;

  & :nth-child(2) {
    margin-left: 1vw;
  }
`;

const WrappingContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-left: 1.5vw;
`;