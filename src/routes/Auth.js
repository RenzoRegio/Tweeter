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
    <div>
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
          type="submit"
          value={newAccount ? "Create Account" : "Sign in"}
        />
      </form>
      <span onClick={toggleUserMethod}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      {error ? <span>{error}</span> : null}
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
