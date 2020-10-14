import React from 'react';


export function RepeatRuleAdder({ taskGid }: any) {
  const [addRuleView, setAddRuleView] = React.useState(false);
  const [timeInterval, setTimeInterval] = React.useState<number>()
  enum TimeUnits { days = 'days', weeks = 'weeks', months = 'months' };
  const [timeUnit, setTimeUnit] = React.useState<string>(TimeUnits.days);
  const [startDate, setStartDate] = React.useState<string>('');


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
            <input type='number' onBlur={e => setTimeInterval(Number(e.target.value))} />
          </span>
          <span>
            <input type='radio' value={TimeUnits.days} onSelect={(e: any) => setTimeUnit(TimeUnits.days)} />
            <label>{ TimeUnits.days }</label>
          </span>
          <span>
            <input type='radio' value={ TimeUnits.weeks } onSelect={(e: any) => setTimeUnit(TimeUnits.weeks)} />
            <label>{ TimeUnits.weeks }</label>
          </span>
          <span>
            <input type='radio' value={TimeUnits.months} onSelect={(e: any) => setTimeUnit(TimeUnits.months)} />
            <label>{ TimeUnits.months }</label>
          </span>

          <span>Start Date: </span>
          <input type="date" onBlur={e => setStartDate(e.target.value)} />
        </div>

        <button onClick={() => setAddRuleView(false)}>X Close</button>
        <button>Create</button>

        <button onClick={() => {
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
