import React, { useEffect, useState } from "react";
import { firebaseDB, firebaseAuthorization } from "../firebase";

// Components
import Tweet from "../components/Tweet";
import Main from "../components/Main-Nav";

export default ({ userObj }) => {
  const user = firebaseAuthorization.currentUser;

  // Tweets
  const [tweet, setTweet] = useState([]);
  const [tweets, setTweets] = useState([]);

  // Change user's display name
  const [displayName, setDisplayName] = useState(
    userObj.displayName || userObj.email
  );
  const [newName, setNewName] = useState(userObj.displayName || userObj.email);

  // Change user's photo
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureExists, setProfilePictureExists] = useState(false);

  const getTweets = () => {
    firebaseDB
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .where("userId", "==", userObj.uid)
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setTweets(tweetArray);
        const tweetNumber = tweetArray.length - 1;
        if (tweetArray[tweetNumber].userImage) {
          setProfilePicture(tweetArray[tweetNumber].userImage);
          setProfilePictureExists(true);
        }
      });
  };

  useEffect(() => {
    getTweets();
  }, []);

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
      setProfilePicture(result);
      setProfilePictureExists(true);
    };
  };

  const updatePhoto = (e) => {
    e.preventDefault();
    for (let i = 0; i < tweets.length; i++) {
      firebaseDB
        .collection("tweets")
        .doc(tweets[i].id)
        .update({ userImage: profilePicture });
    }
    setProfilePictureExists(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName || userObj.email !== displayName) {
      await user.updateProfile({
        displayName,
      });
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
        <h2>
          You have {tweets.length} <i className="fab fa-twitter"></i>{" "}
          {tweets.length > 1 && "'s"}
        </h2>
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
        <h1>How are you doing today, {newName}?</h1>
        {profilePictureExists ? (
          <div className="image-container">
            <form onSubmit={updatePhoto}>
              <label className="profile-picture-container">
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
                <img src={profilePicture} />
              </label>
              <button>Update profile picture</button>
            </form>
          </div>
        ) : (
          <div className="image-container">
            <form onSubmit={updatePhoto}>
              <label className="profile-picture-container">
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
                <h2>Add your profile picture</h2>
              </label>
              <button>Update profile picture</button>
            </form>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Display Name"
            value={displayName}
          />
          <button>
            <i className="fas fa-pencil-alt"></i>
          </button>
        </form>
      </div>
      <Main userObj={userObj} />
    </div>
  );
};
