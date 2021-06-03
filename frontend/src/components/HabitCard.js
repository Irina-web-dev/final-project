// import React from 'react'
// import { useState } from 'react'

// const HabitCard = () => {
//   const [newHabit, setNewHabit] = useState('') //or []?

//   const onFormSubmit = (e) => {
//     e.preventDefault()

//     const options = {
//       method: 'POST',
//       headers: {
//         Authorization: accessToken,
//         'Content-Type': 'application/json'
//       }, 
//       body: JSON.stringify({ message: newHabit })
//     }
//     fetch(API_URL('habit'), options)
//       .then(res => res.json())
//       .then(data => {
//         if(data.success){
//           fetchHabit()
//         } else {
//           dispatch(habit.actions.setErrors(data)) //why data? 
//         }
//   })
  
//   return (
//     <>
//       <form onSubmit={onFormSubmit}>
//         <input
//           type="text"
//           value={newHabit}
//           onChange={e => setNewHabit(e.target.value)}
//         />
//         <button type={submit}>Add new habit</button>
//       </form>
//       {HabitCard.map(habit => (
//         <>
//           <div key={habit._id}>{habit.user.username}</div>
//           <div>Collaborators: {habit.user.username}</div>
//         </>
//       ))}
//     </>
//   )
// }