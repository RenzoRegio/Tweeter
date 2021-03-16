import React, { useEffect, useState } from "react";
import { firebaseDB, firebaseAuthorization } from "../firebase";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const checkUser = (userId) => {
    const currentUserId = firebaseAuthorization.currentUser.uid;
    if (currentUserId == userId) {
      return true;
    }
  };

  useEffect(async () => {
    firebaseDB.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((document) => {
        return { id: document.id, ...document.data() };
      });
      setTweets(tweetArray);
    });
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await firebaseDB.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      userId: userObj.uid,
    });
    setTweet("");
  };

  return (
    <div className="tweeter-home">
      <h1>Hello, {firebaseAuthorization.currentUser.email}!</h1>
      <form className="tweet-form" onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <button>
          <i className="fab fa-twitter"></i>
        </button>
      </form>
      <div className="tweets-container">
        {tweets.map((tweet) => (
          <div
            className={checkUser(tweet.userId) ? "my-tweet" : "tweet"}
            key={tweet.id}
          >
            {checkUser(tweet.userId) && (
              <div className="edit-buttons">
                <i class="fas fa-trash-alt"></i>
                <i class="fas fa-edit"></i>
              </div>
            )}
            <h2>{tweet.text}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
