import React, { useState } from 'react';
import { CheckCalendar } from 'react-check-calendar';
import 'react-check-calendar/dist/index.css';
import moment from 'moment'

const HabitCalendar = () => {
  const [selected, setSelected] = useState([]);

  const nextWeek = moment().add(2, 'week');
  const prevWeek = moment().subtract(2, 'week');

  return (
    <CheckCalendar
      checkedDates={selected}
      onChange={({ moments, dates }) => setSelected(moments)}
      max={ nextWeek }
      min={ nextWeek } 
      disableAfter={ nextWeek }
      disableBefore={ prevWeek }
    />
  )

}

export default HabitCalendar;
