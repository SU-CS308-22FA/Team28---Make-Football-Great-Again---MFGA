import './App.css';
import { Login } from './components/Login/login';
import { Register } from './components/Register/register';

import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          {/* <Route index element={<Home />} /> */}
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
