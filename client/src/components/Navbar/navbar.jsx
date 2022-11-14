import React from 'react'
import {FaBars} from 'react-icons/fa'
import { MobileIcon, Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements'

export const Navbar = ( {toggle} ) => {
  return (
      <>
        <Nav>
          <NavbarContainer>
            <NavLogo to = '/'>
              MFGA
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars/>
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks to = '/login'>Login</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to = '/signup'>Register</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to = '/'>Homepage</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to = '/'>Homepage</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to = '/'>Homepage</NavLinks>
              </NavItem>
              <NavBtn>
                <NavBtnLink to='/login'>Login</NavBtnLink>
              </NavBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </>
  )
}