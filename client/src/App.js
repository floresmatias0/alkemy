import React from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Operations from './pages/Operations';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

const App = () => {
  return (
    <>
    <Route path="/" component={Navbar}/>
    <div className="fullApp">
      <Route exact path="/" component={Home}/> 
      <Route exact path="/operations" component={Operations}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </div>
    </>
  );
}

export default App;
