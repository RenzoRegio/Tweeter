import React, { useState, useEffect } from "react";
import Router from "./Router";
import { firebaseAuthorization } from "../firebase";

function App() {
  const [initizalize, setInitialize] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const unsubscribe = firebaseAuthorization.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInitialize(true);
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const getImage = (x) => {
    setProfilePhoto(x);
  };

  return (
    <>
      {initizalize ? (
        <Router
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          getImage={getImage}
          profilePhoto={profilePhoto}
        />
      ) : (
        "Initializing..."
      )}
      <div className="overlay">
        <i className="fab fa-twitter"></i>
        <h1>YOUR SCREEN IS TOO small</h1>
      </div>
    </>
  );
}

export default App;
