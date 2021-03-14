import React, { useState } from "react";
import { firebaseAuthorization } from "../firebase";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const toggleUserMethod = () => {
    setNewAccount((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await firebaseAuthorization.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await firebaseAuthorization.signInWithEmailAndPassword(
          email,
          password
        );
      }
      console.log(data);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <header>
          <i class="fab fa-twitter"></i>
        </header>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            onChange={onChange}
            value={email}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={onChange}
            value={password}
          />
          <input
            className="button"
            type="submit"
            value={newAccount ? "Create Account" : "Sign in"}
          />
        </form>
        <span className="button" onClick={toggleUserMethod}>
          {newAccount ? "Sign in" : "Create Account"}
        </span>
        {error ? <span>{error}</span> : null}
        <div className="auth-form-buttons">
          <button>
            <span>Continue with</span>
            <i class="fab fa-google"></i>
          </button>
          <button>
            <span>Continue with</span>
            <i class="fab fa-github"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
