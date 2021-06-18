import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { MdPersonAdd } from 'react-icons/md'
import styled from 'styled-components/macro'

import { API_URL } from '../reusable/urls'

import habit, { fetchHabits } from '../reducers/habit'

const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: flex-start;
  height: 50px;
`

const Search = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchFieldWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
`

const Input = styled.input`
  width: 300px;
  font-size: 16px;
  border: 1px solid #c9c4c1;
`

const UserContainer = styled.div`
  display: flex;
  height: 30px;
  padding: 5px;
  align-items: center;
`

const User = styled.span`
  margin-right: 5px;
  font-size: 14px;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: all .2s ease-out;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 50%;
  }
`

const Question = styled.h2`
  margin: 0;
  font-size: 20px;
  width: 200px;
  font-weight: normal;
`

const SearchButton = styled.button`
  width: 80px;
  background: #141414;
  color: #fff;
  font-size: 16px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  transition: all .2s ease-out;

  &:hover {
    background-color: #85dad1;
    color: #000;
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
                  setUser(data.user)
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
        <Question tabIndex='0'>Find a buddy: </Question>
      </label>
      <Search>
        <SearchFieldWrapper>
            <Input 
              type='text'
              id='find-user'
              placeholder='Find your buddy'
              value={search}
              onChange={onUpdateSearch}
            />
          <SearchButton onClick={getSearch}>Search</SearchButton>
        </SearchFieldWrapper>
        {user &&
          <UserContainer>
            <User>{user.username}</User><AddButton onClick={onAddCollaborator}><MdPersonAdd /></AddButton>
          </UserContainer>
        }
      </Search>
    </SearchBarWrapper>
  )
}

export default SearchBar
