import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Routes
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

// Components
import SignOut from "../routes/SignOut";

export default ({ isLoggedIn, userObj, getImage, profilePhoto }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Profile userObj={userObj} getImage={getImage} />
            </Route>
            <Route exact path="/home">
              <Home
                userObj={userObj}
                profilePhoto={profilePhoto}
                getImage={getImage}
              />{" "}
            </Route>
            <Route exact path="/sign-out">
              <SignOut />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
