import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { toast } from 'react-toastify';
import { MdPersonAdd } from 'react-icons/md'
import styled from 'styled-components/macro'

import { API_URL } from '../reusable/urls'

import habit from '../reducers/habit'

import Notification from './Notification'

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: start;
  height: 50px;
  margin-top: 10px;

  @media (min-width: 668px) {
    flex-direction: row;
    margin-top: 0;
  }
`

const Search = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SearchFieldWrapper = styled.div`
  display: flex;
  max-width: 100px;
  height: 30px;

  @media (min-width: 668px) {
    max-width: 100%;
    justify-content: space-between;
`

const Input = styled.input`
  min-width: 212px;
  font-size: 14px;
  padding: 7px;
  border: 1px solid #c9c4c1;

  @media (min-width: 668px) {
    min-width: 331px;
    font-size: 16px;
`

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  padding: 5px;
  align-items: center;
  background: #dddddd;
`

const User = styled.span`
  margin-right: 5px;
  font-size: 14px;
`

const ErrorMessage = styled.div`
  display: flex;
  height: 30px;
  padding: 5px;
  align-items: center;
  color: #ff3801;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f4e664;
  width: 100px;
  height: 30px;
  color: #010606;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #02db82;
    color: #010606;
  }
`

const Question = styled.h2`
  margin: 0;
  font-size: 16px;
  width: 200px;
  font-weight: normal;

  @media (min-width: 668px) {
    font-size: 20px;
  }
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
  const errors = useSelector(store => store.habit.errors)

  const dispatch = useDispatch()

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
    toast.success(`${user.username} is your buddy now!`)
  }

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
        <Notification />
        {user &&
          <UserContainer>
            <User>{user.username}</User><AddButton onClick={onAddCollaborator}><MdPersonAdd /><span>  add buddy</span><span></span> </AddButton>
          </UserContainer>
        }
        <ErrorMessage>{errors ? errors.message : ''}</ErrorMessage>
      </Search>
    </SearchBarWrapper>
  )
}

export default SearchBar
