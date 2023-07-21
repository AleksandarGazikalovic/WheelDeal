import React from 'react'
import {Footer, Blog, Possibility, Features, WhatWD, Header} from './containers';
import {CTA, Partners, Navbar} from './components';
import './App.css';

const App = () => {
  return (
    
    <div className="App">
      <div className="gradient_bg">
        <Navbar/>
        <Header/>
        <Partners/>
      </div>
      <WhatWD/>
      <Features/>
      <Possibility/>
      <CTA/>
      <Blog/>
      <Footer/>
    </div>
  )
}

export default App