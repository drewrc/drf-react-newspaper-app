import "./App.css";
import React, { useState } from "react";
import Home from "./components/views/Home";
import RegistrationView from "./components/auth/RegistrationView";
import LoginView from "./components/auth/LoginView";
import Welcome from "./components/auth/LoginView";
import NewContent from "./components/structures/NewContentView";
import Searchbar from "./components/structures/SearchBar";
import Userview from "./components/views/UserView";
import AdminView from "./components/views/AdminView";
import Archived from "./components/views/ArchiveView";
import LogOut from "./components/auth/LogOutView";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Welcome />;
      case "login":
        return <LoginView />;
      case "register":
        return <RegistrationView />;
      case "user":
        return <Home />;
      case "userview":
        return <Userview />;
      case "adminview":
        return <AdminView />;
      case "archived":
        return <Archived />;
      case "logout":
        return <LogOut />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <nav className="nav-bar" id="nav-bar">
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"> */}
          {/* <Nav className="mr-auto"> */}
          <a
            id="nav"
            className="hover-underline-animation"
            onClick={() => handlePageChange("user")}
          >
            Home{" "}
          </a>
          <a
            id="nav"
            className="hover-underline-animation"
            onClick={() => handlePageChange("userview")}
          >
            User view{" "}
          </a>
          <a
            id="nav"
            className="hover-underline-animation"
            onClick={() => handlePageChange("adminview")}
          >
            Admin view{" "}
          </a>
          <a
            id="nav"
            className="hover-underline-animation"
            onClick={() => handlePageChange("archived")}
          >
            Archived{" "}
          </a>
          <a
            id="nav"
            className="hover-underline-animation"
            onClick={() => handlePageChange("login")}
          >
            Login{" "}
          </a>
          <a
            id="nav"
            className="hover-underline-animation"
            onClick={() => handlePageChange("register")}
          >
            Register{" "}
          </a>
          <a
            id="nav"
            className="hover-underline-animation"
            onClick={() => handlePageChange("logout")}
          >
            Logout{" "}
          </a>
        </nav>
      </div>
      {renderPage()}

      <div className="fixed-bottom footer">HackPulse News 2023</div>
    </div>
  );
}

export default App;
