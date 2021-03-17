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
    <div className="sign-out-container">
      <div className="sign-out">
        <h1>Heading out so soon?</h1>
        <div>
          <button onClick={signOut}>
            Yes <i class="far fa-frown"></i>
          </button>
          <button onClick={returnHome}>
            No, bring me back home<i class="fab fa-twitter"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
