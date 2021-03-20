import React, { useEffect, useState } from "react";
import { firebaseDB, firebaseAuthorization } from "../firebase";

import Tweet from "../components/Tweet";
import Main from "../components/Main-Nav";

export default ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  const [displayName, setDisplayName] = useState(
    userObj.displayName || userObj.email
  );
  const [newName, setNewName] = useState(userObj.displayName || userObj.email);

  const getMyTweets = async () => {
    await firebaseDB
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .where("userId", "==", userObj.uid)
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setTweets(tweetArray);
      });
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName || userObj.email !== displayName) {
      const user = firebaseAuthorization.currentUser;
      await user.updateProfile({ displayName });
      setNewName(user.displayName);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  return (
    <div className="tweeter-profile">
      <div className="tweets-container">
        <h3 className="profile-header">#YourTweets</h3>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userObj={userObj}
            profile={true}
          />
        ))}
      </div>
      <div className="profile-container">
        <h1>Hi, {newName}!</h1>
        <h2>
          You have {tweets.length} <i className="fab fa-twitter"></i>'s
        </h2>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Display Name"
            value={displayName}
          />
          <button>
            <i class="fas fa-pencil-alt"></i>
          </button>
        </form>
      </div>
      <Main userObj={userObj} />
    </div>
  );
};
