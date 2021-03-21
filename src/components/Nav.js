import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <nav>
      <div className="nav-buttons">
        <div>
          <NavLink exact className="nav-btn" to="/">
            <i className="nav-icon fas fa-home"></i>
          </NavLink>
        </div>
        <div>
          <NavLink exact className="nav-btn" to="/profile">
            <i className="nav-icon fas fa-user-alt"></i>
          </NavLink>
        </div>
        <div>
          <NavLink className="nav-btn" to="/sign-out">
            <i class="nav-icon fas fa-power-off"></i>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
