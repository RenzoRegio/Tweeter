import React from "react";
import { useHistory } from "react-router-dom";
import { firebaseAuthorization } from "../firebase";

export default () => {
  const history = useHistory();
  const signOut = () => {
    firebaseAuthorization.signOut();
    history.push("/");
  };

  const returnHome = () => {
    history.push("/");
  };
  return (
    <>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={returnHome}>Home</button>
    </>
  );
};
