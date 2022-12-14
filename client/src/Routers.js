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
import { RoleAdmin, RoleBoardMember, RoleReferee, RoleUser } from './components/PageDirect/Role';
import {Referee} from './Pages/Referee/referee';
import {Profile} from './Pages/Profile/ProfilePage';
import {TeamPage} from './Pages/Teams/TeamPage';
import {Team} from './Pages/Teams/Team';
import { RefereePage } from './Pages/Referee/refereePage';
import { ChooseReferee } from './Pages/BoardMember/choose/chooseReferee';
import { RefereeProfile } from './Pages/RefereeProfile/RefereeProfile';
import { RegisterReferee } from './Pages/BoardMember/refereeRegister/registerReferee';
import { PublishReward } from './Pages/Admin/AdminPublishReward/publishReward';
import { Awards } from './Pages/Awards/awards';

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
                <Route path="board/:home/:away" element={<Auth> <RoleBoardMember> <ChooseReferee/></RoleBoardMember> </Auth>} />
                <Route path="board/register" element={<Auth> <RoleBoardMember> <RegisterReferee/></RoleBoardMember> </Auth>} />
                <Route path="teams" element={<Team/>} />
                <Route path="teams/:team" element={<TeamPage/>} />
                <Route path="currentstats" element={<CurrentStats/>}/>
                <Route path="profileFront" element={<Auth> <RoleUser> <Profile/> </RoleUser> </Auth>} />
                <Route path="referee" element={<Referee/>} />
                <Route path="referee/:name" element={<RefereePage/>} />
                <Route path="refereeProfile" element={<Auth> <RoleReferee> <RefereeProfile/> </RoleReferee> </Auth>} />
                <Route path="publishReward" element={<Auth> <RoleAdmin> <PublishReward/> </RoleAdmin> </Auth>} />
                <Route path="awards" element={<Awards/>} />
                
                {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
            </Routes>
        </Router>
        </AuthContextProvider>
    );
}

export default Routers;
