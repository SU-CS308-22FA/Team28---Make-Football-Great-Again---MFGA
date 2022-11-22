import './App.css';
import { Login } from './Pages/Login/login';
import { Register } from './Pages/Register/register';
import { Edit_Delete } from "./Pages/Profile/edit-delete";
import { Admin } from "./Pages/Admin/adminpage";


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from './Pages/Homepage/homepage';
import NavSide from './Pages/Nav-Side';

import BoardMember from './Pages/BoardMember/boardmemberpage';
import CurrentStats from './Pages/CurrentStats/currentStats';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import { useContext } from 'react';
import { Auth, NoAuth } from './components/PageDirect/Auth';
import { RoleAdmin, RoleBoardMember, RoleUser } from './components/PageDirect/Role';
import {Referee} from './Pages/Referee/referee';
import {Profile} from './Pages/Profile/ProfilePage';
import {TeamPage} from './Pages/Teams/TeamPage';
import {Team} from './Pages/Teams/Team';

function Routers() {
    return (
        <AuthContextProvider>
        <Router>      
        <NavSide />
            <Routes>
            <Route path="/">
                {/* <Route index element={<Home />} /> */}
                <Route path="/" element={<Homepage />} />
                <Route path="signup" element={<NoAuth> <Register /> </NoAuth>} /> 
                <Route path="login" element={<NoAuth> <Login/> </NoAuth>} />
                <Route path="edit" element={<Auth> <RoleUser> <Edit_Delete/> </RoleUser> </Auth>} />
                <Route path="admin" element={<Auth> <RoleAdmin> <Admin/> </RoleAdmin> </Auth>} />
                <Route path="board" element={<Auth> <RoleBoardMember> <BoardMember/> </RoleBoardMember> </Auth>} />
                <Route path="teams" element={<Team/>} />
                <Route path="teams/:team" element={<TeamPage/>} />
                <Route path="currentstats" element={<CurrentStats/>}/>
                <Route path="profileFront" element={<Auth> <RoleUser> <Profile/> </RoleUser> </Auth>} />
                <Route path="referee" element={<Referee/>} />
                { <Route path="*" element={<NoPage />} /> }
            </Route>
            </Routes>
        </Router>
        </AuthContextProvider>
    );
}

export default Routers;
