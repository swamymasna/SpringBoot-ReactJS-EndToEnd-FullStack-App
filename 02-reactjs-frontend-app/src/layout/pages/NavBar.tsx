import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <Link to={"/"} className="navbar-brand">KES Application</Link>

          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/register-employee"} className="nav-link">
                  Register-Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/employees"} className="nav-link">
                  View-Employees
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Footer/>
    </>
  );
};

export default NavBar;
