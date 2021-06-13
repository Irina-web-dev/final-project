import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { MdMenu } from 'react-icons/md'
import { useSelector } from 'react-redux'

import LogOut from './LogOut'

const Nav = styled.nav`
  background: #000;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  postion: sticky;
  top: 0;
  z-index: 10;
`

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;

  @media (min-width: 768px) {
    max-width: 1100px;
  }
`

const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cusror: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`

const MobileIcon = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 60%);
  font-size: 1.8rem;
  cusror: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`

const NavMenu = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -24px;
  }
`

const NavItem = styled.li`
  height: 80px;
  display: flex;
  align-items: center;
`

const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;

  &:active {
    border-bottom: 3px solid #f4e664;
  }
`

const MenuIcon = styled(MdMenu)`
  cursor: pointer;
  color: #fff;
`

const SigninNavBtn = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`

const BtnLink = styled(Link)`
  border-radius: 50px;
  background: #f4e664;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background: #f8c840;
    color: #010606;
    transition: all 0.2s ease-in-out;
  }
`

const NavBar = ({ toggle }) => {
  const accessToken = useSelector(store => store.user.accessToken)

  return (
    <>
      <Nav>
        <NavBarContainer>
          <NavLogo to='/'>
            sticKtOiT
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <MenuIcon />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to='/'>Home</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='#'>About sticKtOT</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='/signup'>Sign Up</NavLinks>
            </NavItem>
          </NavMenu>
          <SigninNavBtn>
            {!accessToken ? <BtnLink to='/signin'>Sign in</BtnLink> : <LogOut />}
          </SigninNavBtn>
        </NavBarContainer>
      </Nav>
    </>
  )
}

export default NavBar
