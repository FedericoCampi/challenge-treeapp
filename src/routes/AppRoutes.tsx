import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

const AppRoutes: React.FC = () => (
  <Router>
    <nav>
      <Link to="/">
      <button>Home</button>
        
        </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);

export default AppRoutes;