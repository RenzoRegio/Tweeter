import React, { useState, useEffect } from "react";
import Router from "./Router";
import { firebaseAuthorization } from "../firebase";

function App() {
  const [initizalize, setInitialize] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    firebaseAuthorization.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInitialize(true);
    });
  }, []);
  return (
    <>
      {initizalize ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
