import React, { useContext } from 'react'
import {FaBars} from 'react-icons/fa'
import AuthContext from '../../context/AuthContext'
import { MobileIcon, Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth } from '../PageDirect/Auth';
import { Display, DisplayAuth, UserDisp, AdminDisp, BoardDisp,RefereeDisp} from '../PageDirect/NavbarDisplay';

export const Navbar = ( {toggle} ) => {
  const navigate = useNavigate();
  const {getLoggedIn} = useContext(AuthContext);
  const {loggedIn} = useContext(AuthContext);

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");
    axios.get("http://localhost:4000/logout")
    .then(async (res)=>{
        if(res.status===200){
            await getLoggedIn();
            console.log("Logged out");
            navigate('/');
        }
        else{
            console.log("Error happened, cannot logout!");
        }
    })
    .catch((err)=>{
        console.log(err);
    });
  }

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
              <NavLinks to = '/currentstats'>Current Stats</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to = '/community'>Community</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to = '/teams'>Teams</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to = '/referee'>Referees</NavLinks>
            </NavItem>


            <NavItem>
                <NavLinks to = '/awards'>Awards</NavLinks>
              </NavItem>
              
            <Display>
              <NavItem>
                <NavLinks to = '/signup'>Register</NavLinks>
              </NavItem>
              <NavBtn>
                <NavBtnLink to='/login'>Login</NavBtnLink>
              </NavBtn>
            </Display>

            <DisplayAuth>
              <AdminDisp>
                <NavItem>
                    <NavLinks to = '/publishReward'>Publish Award</NavLinks>
                  </NavItem>
                </AdminDisp>
            </DisplayAuth>

            <DisplayAuth>
              <UserDisp>
                <NavItem>
                    <NavLinks to = '/profileFront'>User Profile</NavLinks>
                  </NavItem>
                </UserDisp>
            </DisplayAuth>

            <DisplayAuth>
              <AdminDisp>
                <NavItem>
                    <NavLinks to = '/admin'>Admin Profile</NavLinks>
                  </NavItem>
                </AdminDisp>
            </DisplayAuth>

            <DisplayAuth>
              <BoardDisp>
                <NavItem>
                    <NavLinks to = '/board'>Board Member Profile</NavLinks>
                  </NavItem>
                </BoardDisp>
            </DisplayAuth>
            <DisplayAuth>
              <RefereeDisp>
                <NavItem>
                    <NavLinks to = '/refereeProfile'>Referee Profile</NavLinks>
                  </NavItem>
                </RefereeDisp>
            </DisplayAuth>

            <DisplayAuth>
              <NavBtn>
                <NavBtnLink onClick={handleLogout}>Logout</NavBtnLink>
              </NavBtn>
            </DisplayAuth>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
)
}
