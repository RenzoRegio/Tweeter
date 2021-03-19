import React, { useEffect, useState } from "react";
import { firebaseDB } from "../firebase";

import Tweet from "../components/Tweet";
import Main from "../components/Main-Nav";

export default ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  const getMyTweets = async () => {
    const tweets = await firebaseDB
      .collection("tweets")
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
        <h1>Hi, {userObj.email}!</h1>
        <h2>
          You have {tweets.length} <i className="fab fa-twitter"></i>'s
        </h2>
      </div>
      <Main userObj={userObj} />
    </div>
  );
};
