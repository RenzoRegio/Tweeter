import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { firebaseStorage, firebaseDB } from "../firebase";

import Nav from "./Nav";

export default ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState("");
  const [imageAdded, setImageAdded] = useState(false);

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
    setImageAdded(true);
  };

  const removeImage = () => {
    setImage("");
    setImageAdded(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let tweetObj;
    if (imageAdded) {
      const fileRef = firebaseStorage.ref().child(`${userObj.uid}/${uuid()}`);
      const response = await fileRef.putString(image, "data_url");
      const imageURL = await response.ref.getDownloadURL();
      tweetObj = {
        text: tweet,
        createdAt: Date.now(),
        userId: userObj.uid,
        userName: userObj.displayName || userObj.email,
        imageURL,
      };

      setImage("");
    } else {
      tweetObj = {
        text: tweet,
        createdAt: Date.now(),
        userId: userObj.uid,
        userName: userObj.displayName || userObj.email,
      };
    }
    await firebaseDB.collection("tweets").add(tweetObj);
    setTweet("");
  };

  return (
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
            <img className="tweet-form-image" src={image} />
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
  );
};
