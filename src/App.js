import React from 'react';

import Sidebar from './Components/Sidebar/Sidebar';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Mars Gallery</h1>
      </header>
      <div className='wrapper' >
        <Sidebar />
              
      </div> 
    </div>
  );
}

export default App;


/*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/
/*import logo from './logo.svg';*/
/*<Gallery /> */
/*import Gallery from './Components/Gallery/Gallery';*/