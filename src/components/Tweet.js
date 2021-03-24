import React, { useState } from "react";
import { firebaseDB, firebaseStorage } from "../firebase";

export default ({ tweetObj, userObj, profile, profilePhoto }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const checkUser = (userId) => {
    const currentUserId = userObj.uid;
    if (currentUserId == userId) {
      return true;
    }
  };

  const deleteTweet = async () => {
    const confirmToDelete = window.confirm(
      "Are you sure you want to delete this Tweet?"
    );
    if (confirmToDelete) {
      await firebaseDB.collection("tweets").doc(tweetObj.id).delete();
      if (tweetObj.imageURL) {
        await firebaseStorage.refFromURL(tweetObj.imageURL).delete();
      }
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
    <>
      {checkUser(tweetObj.userId) ? (
        <img className="current-user" src={profilePhoto} />
      ) : (
        <div className="other-user">{tweetObj.userName.charAt(0)}</div>
      )}

      {profile ? (
        <div className="profile-tweet">
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
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="cancel-btn" onClick={toggleEditing}>
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <>
              <div
                className={
                  tweetObj.imageURL ? "tweet-contents" : "tweet-content"
                }
              >
                <h2 className={tweetObj.imageURL && "tweet-with-photo"}>
                  {tweetObj.text}
                </h2>
                {tweetObj.imageURL && (
                  <img className="tweet-image" src={tweetObj.imageURL} />
                )}
              </div>
              <span className="tweet-user">
                by {checkUser(tweetObj.userId) ? "you" : tweetObj.userName}
              </span>
            </>
          )}
        </div>
      ) : (
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
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="cancel-btn" onClick={toggleEditing}>
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <>
              <div
                className={
                  tweetObj.imageURL ? "tweet-contents" : "tweet-content"
                }
              >
                <h2 className={tweetObj.imageURL && "tweet-with-photo"}>
                  {tweetObj.text}
                </h2>
                {tweetObj.imageURL && (
                  <img className="tweet-image" src={tweetObj.imageURL} />
                )}
              </div>
              <span className="tweet-user">
                by {checkUser(tweetObj.userId) ? "you" : tweetObj.userName}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};
