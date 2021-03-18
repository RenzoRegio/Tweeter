import React, { useState } from "react";
import { firebaseDB } from "../firebase";

export default ({ tweetObj, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const checkUser = (userId) => {
    const currentUserId = userObj.uid;
    if (currentUserId == userId) {
      return true;
    }
  };

  const deleteTweet = () => {
    const confirmToDelete = window.confirm(
      "Are you sure you want to delete this Tweet?"
    );
    if (confirmToDelete) {
      firebaseDB.collection("tweets").doc(tweetObj.id).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const updateTweet = (e) => {
    e.preventDefault();
    firebaseDB.collection("tweets").doc(tweetObj.id).update({ text: newTweet });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };

  return (
    <div className={checkUser(tweetObj.userId) ? "my-tweet" : "tweet"}>
      {checkUser(tweetObj.userId) && !editing ? (
        <div className="edit-buttons">
          <i onClick={deleteTweet} className="fas fa-trash-alt"></i>
          <i onClick={toggleEditing} className="fas fa-edit"></i>
        </div>
      ) : null}
      {editing ? (
        <div className="update-form">
          <form onSubmit={(e) => updateTweet(e)}>
            <input
              onChange={onChange}
              type="text"
              value={newTweet}
              placeholder="Edit Tweet"
              required
            />
            <button className="update-btn">
              <i class="fab fa-twitter"></i>
            </button>
            <button className="cancel-btn" onClick={toggleEditing}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <>
          <h2>{tweetObj.text}</h2>
          <span className="tweet-user">
            by {checkUser(tweetObj.userId) ? "you" : tweetObj.userName}
          </span>
          {tweetObj.imageURL && <img src={tweetObj.imageURL} />}
        </>
      )}
    </div>
  );
};
