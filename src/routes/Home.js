import React, { useEffect, useState } from "react";
import { firebaseDB, firebaseAuthorization } from "../firebase";

//Component
import Tweet from "../components/Tweet";
import Nav from "../components/Nav";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [image, setImage] = useState("");

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

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const imageFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setImage(result);
    };
  };

  const removeImage = () => {
    setImage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await firebaseDB.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      userId: userObj.uid,
      userName: userObj.email,
    });
    setTweet("");
  };

  return (
    <div className="tweeter-home">
      <i className="twitter-icon-large fab fa-twitter">#Tweeter</i>
      <div className="nav-bar">
        <form className="tweet-form" onSubmit={onSubmit}>
          <input
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          {image && (
            <div className="image-tweet-container">
              <img src={image} />
              <button onClick={removeImage}>
                <i class="fas fa-times"></i>
              </button>
            </div>
          )}
          <label className="upload-photo">
            <input type="file" accept="image/*" onChange={onFileChange} />
            <i className="fas fa-camera"></i>
          </label>
          <button>
            <i className="fab fa-twitter"></i>
          </button>
        </form>
        <Nav />
      </div>
      <div className="tweets-container">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} userObj={userObj} />
        ))}
      </div>
    </div>
  );
};

export default Home;
