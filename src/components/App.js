import React, { useState } from "react";
import Router from "./Router";
import { firebaseAuthorization } from "../firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    firebaseAuthorization.currentUser
  );
  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
