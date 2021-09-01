import React from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Operations from './pages/Operations';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';
import PrivateRouteRegister from './components/PrivateRoutes/PrivateRouteRegister';
import PrivateRouteLogin from './components/PrivateRoutes/PrivateRouteLogin';
import PrivateRouteProfile from './components/PrivateRoutes/PrivateRouteProfile'

const App = () => {
  return (
    <>
    <Route path="/" component={Navbar}/>
    <div className="fullApp">
      <Route exact path="/" component={Home}/> 
      <Route exact path="/operations" component={Operations}/>
      <PrivateRouteRegister exact path="/register" component={Register}/>
      <PrivateRouteLogin exact path="/login" component={Login}/>
      <PrivateRouteProfile exact path="/profile" component={Profile}/>
    </div>
    </>
  );
}

export default App;
