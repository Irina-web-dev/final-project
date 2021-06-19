import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`
const CloseIcon = styled(MdClose)`
  color: #fff;
`

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none; 
`

const SidebarWrapper = styled.div`
  color: #fff;
`

const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 60px);
  text-align: center;
  padding: 0;
`

const SidebarLink = styled(Link)`
  display: flex;
  align-items; center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-styled: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #f4e664;
    transition: 0.2s ease-in-out;
  }
`

const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`

const SidebarRoute = styled(Link)`
  border-radius: 50px;
  background: #f4e664;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 24px;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background: #02db82;
    color: #010606;
    transition: all 0.2s ease-in-out;
  }
`

const SidebarTop = ({ isOpen, toggle }) => {
  return (
    <div>
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to='#'>
              Home
            </SidebarLink>
            <SidebarLink to='#'>
              About sticKtOiT
            </SidebarLink>
            <SidebarLink to='/signup'>
              Sign up
            </SidebarLink>
          </SidebarMenu>
          <SideBtnWrap>
            <SidebarRoute to='/signin'>Sign In</SidebarRoute>
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    </div>
  )
}

export default SidebarTop
