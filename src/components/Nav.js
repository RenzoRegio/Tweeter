import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav>
      <div className="nav-buttons">
        <div>
          <Link to="/">
            <i className="nav-icon fas fa-home"></i>
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <i className="nav-icon fas fa-user-alt"></i>
          </Link>
        </div>
        <div>
          <Link to="/sign-out">
            <i class="nav-icon fas fa-power-off"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};
