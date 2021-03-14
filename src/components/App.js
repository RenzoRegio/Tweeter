import React, { useState, useEffect } from "react";
import Router from "./Router";
import { firebaseAuthorization } from "../firebase";

function App() {
  const [initizalize, setInitialize] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebaseAuthorization.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      setInitialize(true);
    });
  }, []);
  return (
    <>{initizalize ? <Router isLoggedIn={isLoggedIn} /> : "Initializing..."}</>
  );
}

export default App;
