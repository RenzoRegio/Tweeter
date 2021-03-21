import React, { useEffect, useState } from "react";
import { firebaseDB } from "../firebase";

// Components
import Tweet from "../components/Tweet";
import Main from "../components/Main-Nav";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(async () => {
    firebaseDB
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((document) => {
          return { id: document.id, ...document.data() };
        });
        setTweets(tweetArray);
      });
  }, []);

  return (
    <div className="tweeter-home">
      <i className="twitter-icon-large fab fa-twitter">#Tweeter</i>
      <Main userObj={userObj} />
      <div className="tweets-container">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} userObj={userObj} />
        ))}
      </div>
    </div>
  );
};

export default Home;
