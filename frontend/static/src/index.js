import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/views/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './components/views/Main';
import Home from "./components/views/Home"
import Userview from "./components/views/UserView"
import Archived from "./components/views/ArchiveView"
import AdminView from "./components/views/AdminView"
import LogOut from './components/auth/LogOutView';
import LoginView from './components/auth/LoginView';
import RegistrationView from './components/auth/RegistrationView';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> 
        <Routes>
        <Route path="/" element={ <App />  }>
          <Route path="home" element={ <Home /> }/>
          <Route path="userview" element={ <Userview /> }/>
          <Route path="archived" element={ <Archived /> } />
          <Route path="adminview" element={ <AdminView />} />
          <Route path="logout" element={ <LogOut /> } />
          <Route path="login" element={ <LoginView />} />
          <Route path="register" element={ <RegistrationView />} />
        </Route>
          <Route path="*" element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
          />
        </Routes>
    </Router>
  </React.StrictMode>
);


{/* <div className='App'>
<Routes>
  <Route path="/" element={ <App/> }/>
</Routes>
</div> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
