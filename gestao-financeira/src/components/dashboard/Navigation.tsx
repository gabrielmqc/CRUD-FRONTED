import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navigation.css";




const Navigation: React.FC = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
    
     
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;