import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Expenses from '../expenses/expenses';
import Categories from '../categories/categories';
import './screenHolder.css'

const ScreenHolder = () => {
  return (
    <Router>
      <div className='container'>
        <h1>Screen Holder</h1>
        <Link to="/categories" className="glow-on-hover">Change Categories </Link>

        <Link to="/expenses" className="glow-on-hover">Expenses</Link>

        <Routes>
          <Route path="/expenses" element={<Expenses />} />
           
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default ScreenHolder;
