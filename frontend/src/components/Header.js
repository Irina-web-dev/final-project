import React from 'react'
import styled from 'styled-components/macro'

const HeaderContainer = styled.header`
  min-width: 700px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.25);
`

const Header = () => {
  return(
    <HeaderContainer>
        <p>Habit Tracker</p>
    </HeaderContainer>
  )
}

export default Header