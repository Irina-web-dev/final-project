import React, { useState } from 'react'

import NavBar from './NavBar'
import SidebarTop from './SidebarTop'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return(
    <>
      <SidebarTop isOpen={isOpen} toggle={toggle}/>
      <NavBar toggle={toggle}/>
    </>
  )
}

export default Header