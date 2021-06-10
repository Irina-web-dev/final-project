import React from 'react'
import styled from 'styled-components/macro'

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
  )
}

export default Header