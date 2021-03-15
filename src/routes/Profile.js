import React from "react";
import { useHistory } from "react-router-dom";
import { firebaseAuthorization } from "../firebase";

export default () => {
  let history = useHistory();
  const signOut = () => {
    firebaseAuthorization.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};
