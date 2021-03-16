import React from "react";
import { firebaseDB } from "../firebase";

export default ({ tweetObj, userObj }) => {
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

  return (
    <div className={checkUser(tweetObj.userId) ? "my-tweet" : "tweet"}>
      {checkUser(tweetObj.userId) && (
        <div className="edit-buttons">
          <i onClick={deleteTweet} class="fas fa-trash-alt"></i>
          <i class="fas fa-edit"></i>
        </div>
      )}
      <h2>{tweetObj.text}</h2>
    </div>
  );
};
