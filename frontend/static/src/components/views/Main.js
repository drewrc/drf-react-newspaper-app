import React, { useState } from "react";
import Home from "./Home";
import RegistrationView from "../auth/RegistrationView";
import LoginView from "../auth/LoginView";
import Userview from "./UserView";
import AdminView from "./AdminView";
import Archived from "./ArchiveView";
import LogOut from "../auth/LogOutView";
import { Link } from "react-router-dom";


function Main() {
//   const [currentPage, setCurrentPage] = useState("home");

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case "home":
//         return <Home />;
//       case "login":
//         return <LoginView />;
//       case "register":
//         return <RegistrationView />;
//       case "userview":
//         return <Userview />;
//       case "adminview":
//         return <AdminView />;
//       case "archived":
//         return <Archived />;
//       case "logout":
//         return <LogOut />;
//       default:
//         return null;
//     }
//   };

{/* <Route path="/" element={ <Main /> }/>
<Route path="home" element={ <Home /> }/>
<Route path="userview" element={ <Userview /> }/>
<Route path="archived" element={ <Archived /> } />
<Route path="adminview" elsement={ <AdminView />} /> */}

  return (
    
    <div>
        <div>

      </div>
      <div className="fixed-bottom footer">HackPulse News 2023</div>
    </div>
  );
}

export default Main;
