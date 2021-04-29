import React from "react";

import Sidebar from "./Components/Sidebar/Sidebar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Mars Gallery</h1>
      </header>
      <div className="wrapper">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;


