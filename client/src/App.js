import './App.css';
import { Login } from './Pages/Login/login';
import { Register } from './Pages/Register/register';
import { Edit_Delete } from "./Pages/Profile/edit-delete";
import { Admin } from "./Pages/Admin/adminpage";


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

function App() {
  return (
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
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
