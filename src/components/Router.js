import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Routes
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

// Components
import SignOut from "../routes/SignOut";

export default ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} />
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
