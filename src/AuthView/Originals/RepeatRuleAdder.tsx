import buildUrl from 'build-url';
import moment from 'moment';
import React from 'react';
import DateTime from 'react-datetime';
import Cookies from 'js-cookie';

const { REACT_APP_HTTPS_BACKEND_DOMAIN } = process.env;

interface SnackbarData {
  status: string;
  message: string;
}

/*
  sends a fetch request to backend API to create a new repeater rule in the database
*/
async function createNewRepeatRule(projectGid: string, taskGid: string, timeInterval: number, timeUnit: string, startDate: string): Promise<SnackbarData> {
  const ruleEndpoint = buildUrl(REACT_APP_HTTPS_BACKEND_DOMAIN!, {
    path: '/repeat-rules/add',
  });

  const asana_email_encrypted = Cookies.get('asana_email_encrypted')!;

  const body = JSON.stringify({ projectGid, taskGid, timeInterval, timeUnit, startDate })

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


export function RepeatRuleAdder({ projectGid, taskGid }: any) {
  const [addRuleView, setAddRuleView] = React.useState(false);
  const [timeInterval, setTimeInterval] = React.useState<number>(2)
  enum TimeUnits { days = 'days', weeks = 'weeks', months = 'months' };
  const [timeUnit, setTimeUnit] = React.useState<string>(TimeUnits.weeks);

  const today: string = moment().format('YYYY-MM-DD');
  const [startDateTime, setStartDateTime] = React.useState<string>(today);
  const [snackbar, setSnackbar] = React.useState({});

  if (addRuleView === false) {
    return (
      <div>
        <button
          value={taskGid}
          onClick={() => setAddRuleView(true)}
        >Add repeater</button>
      </div>
    );
  }

  return (
    <div>
      <form>
        <div>
          <span>Every </span>
          <span>
            <input 
              type='number' 
              onBlur={e => setTimeInterval(Number(e.target.value))} 
              defaultValue="2"
            />
          </span>
          <span>
            <input type='radio' 
              value={TimeUnits.days} 
              onChange={(e: any) => setTimeUnit(TimeUnits.days)} 
            />
            <label>{ TimeUnits.days }</label>
          </span>
          <span>
            <input type='radio' value={ TimeUnits.weeks } onChange={(e: any) => setTimeUnit(TimeUnits.weeks)} checked />
            <label>{ TimeUnits.weeks }</label>
          </span>
          <span>
            <input type='radio' value={TimeUnits.months} onChange={(e: any) => setTimeUnit(TimeUnits.months)} />
            <label>{ TimeUnits.months }</label>
          </span>

          <span>Start Date: </span>
          <DateTime
            value={startDateTime}
            onChange={(e: any) => setStartDateTime(e)}
          />
          {/* <input 
            type="date" 
            onBlur={e => setStartDateTime(e.target.value)} 
            defaultValue={today}
          /> */}
        </div>

        <button onClick={e => { 
          e.preventDefault();
          setAddRuleView(false)        
        }}>X Close</button>
        <button onClick={async e => { 
          e.preventDefault();
          const snackbarData: SnackbarData = await createNewRepeatRule(projectGid, taskGid, timeInterval, timeUnit, startDateTime);
          setSnackbar(snackbarData);
          console.log(snackbar);
        }}>Create</button>
      </form>
    </div>
  )
}
