import React from 'react';
import moment from 'moment';


export function RepeatRuleAdder({ taskGid }: any) {
  const [addRuleView, setAddRuleView] = React.useState(false);
  const [timeInterval, setTimeInterval] = React.useState<number>(2)
  enum TimeUnits { days = 'days', weeks = 'weeks', months = 'months' };
  const [timeUnit, setTimeUnit] = React.useState<string>(TimeUnits.weeks);

  const today: string = moment().format('YYYY-MM-DD');
  const [startDate, setStartDate] = React.useState<string>(today);


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
          <input 
            type="date" 
            onBlur={e => setStartDate(e.target.value)} 
            defaultValue={today}
          />
        </div>

        <button onClick={e => { 
          e.preventDefault();
          setAddRuleView(false)        
        }}>X Close</button>
        <button onClick={e => { 
          e.preventDefault();        
        }}>Create</button>

        <button onClick={e => {
          e.preventDefault();
          console.log('addRuleView', addRuleView);
          console.log('timeInterval', timeInterval);
          console.log('timeUnit', timeUnit);
          console.log('startDate', startDate);
        }}>
          show state
        </button>
      </form>
    </div>
  )
}
