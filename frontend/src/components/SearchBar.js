import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { MdSearch } from 'react-icons/md'

import { API_URL } from '../reusable/urls'

import habit from '../reducers/habit'

const SearchBar = () => {
  const [filteredUsers, setFilteredUsers] = useState('')
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()

  //const users = useSelector(store => store.users.users)

  useEffect(() => {
    getUsers(search)
  }, [query])

  const getUsers = (username) => {
    if(accessToken) {
      const options = {
        method: 'GET',
        headers: {
            Authorization: accessToken,
        }
      }
      fetch(API_URL(`users/${username}`), options)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
              batch(() => {
                  console.log(data)
                  dispatch(habit.actions.setErrors(null))
                  setFilteredUsers(data.users)
              });
            } else {
              dispatch(habit.actions.setErrors(data))
            }
        })
    }
  }

  const onUpdateSearch = (e) => {
    setSearch(e.target.value)
  }

  const getSearch = (e) => {
    e.preventDefault()
    setQuery(search)
  }

  return (
      <div>
        <label htmlFor='find-user'>
          <h3 tabIndex='0'>Find a buddy who will go along with you and keep you motivated</h3>
          <input 
            type='text'
            id='find-user'
            placeholder='Find your buddy'
            value={search}
            onChange={onUpdateSearch}
          />
        </label>
        <div>
          <MdSearch />
        </div>
        <button onClick={getSearch}>Search</button>
        {/* <div>User: {filteredUsers.map(user => <p key={user}>{user}</p>)}</div> */}
      </div>
  )
}

export default SearchBar
