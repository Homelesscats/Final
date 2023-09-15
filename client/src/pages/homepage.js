import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="homepage-container">
      <div className="content">
        <h1>Welcome to the Homepage</h1>
        {user ? (
          // If a user is logged in, display user information
          <>
            <h2>{user.email} is now logged in</h2>
            <ul>
              <li>
                <Link to="/link1">Link 1</Link>
              </li>
              <li>
                <Link to="/link2">Link 2</Link>
              </li>
              <li>
                <Link to="/link3">Link 3</Link>
              </li>
            </ul>
          </>
        ) : null}
        <input
          type="text"
          placeholder="Please enter your information here"
        />
      </div>
    </div>
  );
}

export default Homepage;