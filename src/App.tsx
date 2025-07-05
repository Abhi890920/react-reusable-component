import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.scss'
import Header  from "./component/common/Header";
import Footer  from "./component/common/Footer";
import GlobalSpeedDial from "./component/common/GlobalSpeedDial";
import AppRouters from "./AppRouters";


function App() {
  return (
    <Router>
      <Header/>
        <main className="main">
            <AppRouters/>
        </main>
      <Footer/>
      <GlobalSpeedDial />
      
    </Router>
  );
}

export default App;
