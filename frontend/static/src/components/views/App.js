import Main from "./Main"
import Home from "./Home"
import Userview from "./UserView"
import Archived from "./ArchiveView"
import AdminView from "./AdminView"
import LogOut from "../auth/LogOutView"
import LoginView from "../auth/LoginView"
import RegistrationView from "../auth/RegistrationView"
// import { Routes, Route, Outlet } from "react-router-dom"
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import "../styles/App.css";


function App() {
  const navigate = useNavigate();

  return (
  <div className='App'>
    <nav className="nav-bar" id="nav-bar">
        <NavLink to="/home" id="nav" className="hover-underline-animation">
          Home
          {" "}
        </NavLink>
        <NavLink to="/userview" id="nav" className="hover-underline-animation">
        Create Content
        {" "}
        </NavLink>
        <NavLink to="/adminview" id="nav" className="hover-underline-animation">
          Admin view
          {" "}
        </NavLink>
        <NavLink to="/login" id="nav" className="hover-underline-animation">
          Login
          {" "}
        </NavLink>
        <NavLink to="/register" id="nav" className="hover-underline-animation">
          Register
          {" "}
        </NavLink>
        <NavLink to="/logout" id="nav" className="hover-underline-animation">
          Logout{" "}
        </NavLink>
  </nav>

    <Outlet />

    <div className="fixed-bottom footer">HackPulse News 2023</div>
  </div>
  )
} 

export default App