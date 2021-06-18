import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { MdPersonAdd } from 'react-icons/md'
import styled from 'styled-components/macro'

import { API_URL } from '../reusable/urls'

import habit, { fetchHabits } from '../reducers/habit'

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchFieldWrapper = styled.div`
  display: flex;
  width: 100%;
`

const Input = styled.input`
  width: 300px;
`

const UserContainer = styled.div`
  display: flex;
  height: 50px;
  padding: 5px;
  align-items: center;
`

const User = styled.span`
  margin-right: 5px;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  transition: all .2s ease-out;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 50%;
  }
`

const SearchBar = ({ setCollaborator }) => {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(null)

  

  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()

  //const users = useSelector(store => store.users.users)

  useEffect(() => {
    getUsers(search)
    // eslint-disable-next-line
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
                  dispatch(habit.actions.setErrors(null))
<<<<<<< HEAD
                  setFilteredUsers(data.users)
              })
=======
                  setUser(data.user)
              });
>>>>>>> ba56b454d4133c807c743f05adb176cc6d907cb3
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

  const onAddCollaborator = (e) => {
    e.preventDefault()
    setCollaborator(user)
  }

  // const onAddCollaborator = (e) => {
  //   e.preventDefault()
  //   if(accessToken) {
  //     const options = {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': accessToken
  //       },
  //       body: JSON.stringify(user)
  //     }

  //   fetch(API_URL(`/habits/${habitId}/collaborators`), options)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       dispatch(fetchHabits(accessToken))
  //     })
  //   }
  // }
  

  return (
      <SearchBarWrapper>
        <label htmlFor='find-user'>
          <h3 tabIndex='0'>Find a buddy who will go along with you and keep you motivated</h3>
        </label>
        <SearchFieldWrapper>
            <Input 
              type='text'
              id='find-user'
              placeholder='Find your buddy'
              value={search}
              onChange={onUpdateSearch}
            />
          <button onClick={getSearch}>Search</button>
        </SearchFieldWrapper>
        {user &&
          <UserContainer>
            <User>{user.username}</User><AddButton onClick={onAddCollaborator}><MdPersonAdd /></AddButton>
          </UserContainer>
        }
      </SearchBarWrapper>
  )
}

export default SearchBar
