import React, { useContext } from 'react'
import {FaBars} from 'react-icons/fa'
import AuthContext from '../../context/AuthContext'
import { MobileIcon, Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements'

export const Navbar = ( {toggle} ) => {

  const loggedIn = useContext(AuthContext);
  console.log(loggedIn); 

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
                <NavLinks to = '/currentstats'>Current Stats</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to = '/teams'>Teams</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to = '/profile'>Profile</NavLinks>
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
