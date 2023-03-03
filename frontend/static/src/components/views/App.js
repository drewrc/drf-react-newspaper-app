// import Main from "./Main"
// import Home from "./Home"
// import Userview from "./UserView"
// import Archived from "./ArchiveView"
// import AdminView from "./AdminView"
// import LogOut from "../auth/LogOutView"
// import LoginView from "../auth/LoginView"
// import RegistrationView from "../auth/RegistrationView"
// import { Routes, Route, Outlet } from "react-router-dom"
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import "../styles/App.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from "react-bootstrap/esm/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const navigate = useNavigate();

  return (
  <div className='App'>

{[false, ].map((expand) => (
        <Navbar id="nav-bar" key={expand} expand={expand} className="mb-3 nav-bar">
          <Container fluid>
          <Navbar.Brand NavLink to="/home" id="nav">
           HackPulse 
          {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}
          </Navbar.Brand>
          


            <Navbar.Toggle id="icon" aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Navigation
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink to="/home" id="nav" className="hover-underline-animation">
                  Home
                  {" "}
                </NavLink>
                <Link to="archived" id="nav" className="hover-underline-animation">
                Archived{" "}
                </Link>
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

                  <NavDropdown
                    title="Creator Tools"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">
                      <NavLink to="/userview" id="nav" className="hover-underline-animation">
                      Create Content
                      {" "}
                      </NavLink></NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                    <NavLink to="/adminview" id="nav" className="hover-underline-animation">
                        Admin view
                        {" "}
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}




    {/* <nav className="nav-bar" id="nav-bar"> */}
        {/* <NavLink to="/home" id="nav" className="hover-underline-animation">
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
        </NavLink> */}
        {/* <NavLink to="/login" id="nav" className="hover-underline-animation">
          Login
          {" "}
        </NavLink>
        <NavLink to="/register" id="nav" className="hover-underline-animation">
          Register
          {" "}
        </NavLink>
        <NavLink to="/logout" id="nav" className="hover-underline-animation">
          Logout{" "}
        </NavLink> */}
  {/* </nav> */}
  {/* <div id="override"> */}
  <Container id="override" >
      <Row md={{ span: 12 }}className="header-top">
        <Row>
          <div className="header">
              <h1 id="main-header">HackPulse News</h1> 
              <img className="main-banner" />
          </div>
        </Row> 
      </Row>
  </Container>
  {/* </div> */}
<div>
    <Outlet />
</div>
{/* <Container id="override" >
      <Row md={{ span: 12 }}className="header-bottom">
        <Row>
          <div className="header">
              <h1 id="main-header"></h1> 
              <img className="main-banner" />
          </div>
        </Row> 
      </Row>
  </Container> */}
    <div className="fixed-bottom footer">HackPulse News 2023</div>
  </div>
  )
} 

export default App