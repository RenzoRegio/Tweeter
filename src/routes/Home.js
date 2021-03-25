import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebaseDB } from "../firebase";

// Components
import Tweet from "../components/Tweet";
import Main from "../components/Main-Nav";

const Home = ({ userObj, profilePhoto }) => {
  const [tweets, setTweets] = useState([]);
  const history = useHistory();

  if (performance.navigation.type == 1) {
    history.push("/");
  }
  useEffect(() => {
    const unsubscribe = firebaseDB
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((document) => {
          return { id: document.id, ...document.data() };
        });
        setTweets(tweetArray);
      });

    return () => {
      unsubscribe();
      setTweets([]);
    };
  }, []);

  return (
    <div className="tweeter-home">
      <i className="twitter-icon-large fab fa-twitter">#Tweeter</i>
      <Main userObj={userObj} />
      <div className="tweets-container">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userObj={userObj}
            profilePhoto={profilePhoto}
          />
        ))}
      </div>
      <div className="splash-screen">
        <i className="fab fa-twitter">Clone</i>
      </div>
    </div>
  );
};

export default Home;
