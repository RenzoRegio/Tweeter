import React, { useEffect, useState } from "react";
import { firebaseDB } from "../firebase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(async () => {
    const data = await firebaseDB.collection("tweets").get();
    data.forEach((document) => {
      const tweetObject = { ...document.data(), id: document.id };
      setTweets((prev) => [tweetObject, ...prev]);
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
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h2>{tweet.tweet}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
