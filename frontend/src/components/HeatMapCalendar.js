// import React from 'react'
// import moment from 'moment'

// const DayNames = {
//   0: 'Mon',
//   1: 'Tue',
//   2: 'Wed',
//   3: 'Thu',
//   4: 'Fri',
//   5: 'Sat',
//   6: 'Sun',
// }
// function Cell({ color }) {
//   let style = {
//     backgroundColor: color
//   }
//   return (
//     <div className='timeline-cells-cell' style={style}></div>
//   )
// }
// function Month({ startDate, index }) {
//   let date = moment(startDate).add(index * 7, 'day');
//   let monthName = date.format('MMM');
//   return (
//     <div className={`timeline-months-month ${monthName}`}>
//       {monthName}
//     </div>
//   )
// }
// function WeekDay({ index }) {
//   return (
//     <div className='timeline-weekdays-weekday'>
//       {DayNames[index]}
//     </div>
//   )
// }
// function Timeline({ range, data, colorFunc, name }) {
//   let days = Math.abs(range[0].diff(range[1], 'days'));
//   let cells = Array.from(new Array(days));
//   let weekDays = Array.from(new Array(7));
//   let months = Array.from(new Array(Math.floor(days / 7)));
//   let min = Math.min(0, ...data.map(d => d.value));
//   let max = Math.max(...data.map(d => d.value));
//   let startDate = range[0];
//   const DayFormat = 'DDMMYYYY';
//   return (
//     <div className='timeline'>
//       <h3>{name}</h3>
//       <div className="timeline-months">
//         {months.map((_, index) => <Month key={index} index={index} startDate={startDate} />)}
//       </div>
//       <div className="timeline-body">
//         <div className="timeline-weekdays">
//           {weekDays.map((_, index) => <WeekDay key={index} index={index} startDate={startDate} />)}
//         </div>
//         <div className="timeline-cells">
//           {cells.map((_, index) => {
//             let date = moment(startDate).add(index, 'day');
//             let dataPoint = data.find(d => moment(date).format(DayFormat) === moment(d.date).format(DayFormat)); // den här behöver ni ändra om så value kommer reflektera om en cell är tickad eller ej 
//             let alpha = dataPoint.value; // detta behöver vara anting 0 eller 1 (alpha värdet på färgen som skickas till varje cell)
//             let color = colorFunc({ alpha });
//             return (
//               <Cell
//                 key={index}
//                 index={index}
//                 date={date}
//                 color={color}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
// const HeatMapCalendar = () => {
//   // 1 year range
//   let startDate = moment().add(-365, 'days');
//   let dateRange = [startDate, moment()];
//   let data = Array.from(new Array(365)).map((_, index) => {
//     return {
//       date: moment(startDate).add(index, 'day'),
//       value: Math.floor(Math.random() * 100) // detta value är vad ni behöver få till 0 eller 1 dvs "tracked" eller "untracked"
//     };
//   });
//   return (
//     <>
//       <Timeline name={'Maria'} range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`} />
//       <Timeline name={'Irina'} range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(220, 5,  3, ${alpha})`} />
//     </>
//   )
// }

// export default HeatMapCalendar