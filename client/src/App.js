import './App.css';
import { Login } from './Pages/Login/login';
import { Register } from './Pages/Register/register';
import { Edit_Delete } from "./Pages/Profile/edit-delete";
import { Admin } from "./Pages/Admin/adminpage";
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar } from './components/Navbar/navbar';
import Homepage from './Pages/Homepage/homepage';
import Sidebar from './components/Sidebar/sidebar';
import NavSide from './Pages/Nav-Side';

import BoardMember from './Pages/BoardMember/boardmemberpage';
import { TeamPage } from './Pages/Teams/TeamPage';
import CurrentStats from './Pages/CurrentStats/currentStats';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import { useContext } from 'react';
import { Profile } from './Pages/Profile/ProfilePage';
import { Team } from './Pages/Teams/Team';

axios.defaults.withCredentials = true;
//const loggedIn = useContext(AuthContext);
function App() {
  return (
    <AuthContextProvider>
      
      <Router>
      <NavSide />
        <Routes>
          <Route path="/">
            {/* <Route index element={<Home />} /> */}
            <Route path="/" element={<Homepage />} />
            <Route path="signup" element={<Register />} /> 
            <Route path="login" element={<Login/>} />
            <Route path="edit" element={<Edit_Delete/>} />

            <Route path="admin" element={<Admin/>} />
            <Route path="board" element={<BoardMember/>} />
            <Route path="teams" element={<Team/>} />
            <Route path="teams/:team" element={<TeamPage/>} />


            <Route path="profile" element={<Profile/>} />

            <Route path="currentstats" element={<CurrentStats/>}/>

            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
