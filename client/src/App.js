import React from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Operations from './pages/Operations';
import './App.css';

const App = () => {
  return (
    <>
      <Route path="/" component={Navbar}/>
      <Route exact path="/" component={Home}/> 
      <Route exact path="/operations" component={Operations}/>
    </>

  );
}

export default App;
