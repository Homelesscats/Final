import { useContext } from "react";

import { AuthContext } from "../context/authContext";

function Homepage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>This is the Homepage</h1>
      {user ? (
        <>
          <h2>{user.email} is now logged in </h2>
        </>
      ) : (
        <>
          <p>There is no user data</p>
        </>
      )}
    </>
  );
}

export default Homepage;
