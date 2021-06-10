import React from 'react'
import styled from 'styled-components/macro'

<<<<<<< HEAD
import NavBar from './NavBar'

const Header = () => {
  return(
    <NavBar />
=======
import LogOut from './LogOut'

const HeaderContainer = styled.header`
  min-width: 800px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.25);
`

const Header = () => {
  return(
    <HeaderContainer>
      <LogOut />
        <p>Habit Tracker</p>
    </HeaderContainer>
>>>>>>> 74eb83876ef6efd73bbbfa8ec6e90e62effc48d9
  )
}

export default Header