import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // State to store submitted comments

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = () => {
    const newComment = {
      text: comment,
      id: comments.length + 1, // Generate a unique ID (you can use a library like uuid for this)
    };

    // Add the new comment to the state
    setComments([...comments, newComment]);

    // Clear the comment input
    setComment("");
  };

  const links = [
    {
      id: 1,
      imageSrc: "/link1-image.jpg",
      description: "Description for Link 1",
      to: "https://buy.stripe.com/test_5kA5oq5JEbnw8485kl",
    },
    {
      id: 2,
      imageSrc: "/link2-image.jpg",
      description: "Description for Link 2",
      to: "https://buy.stripe.com/test_8wMdUWega3V41FKcMO",
    },
    {
      id: 3,
      imageSrc: "/link3-image.jpg",
      description: "Description for Link 3",
      to: "https://buy.stripe.com/test_4gweZ01to3V4cko8wz",
    },
  ];

  return (
    <div className="homepage-container">
      <div className="content">
        <h1>Welcome to the Homepage</h1>
        {user ? (
          <>
            <h2>{user.email} is now logged in</h2>
          </>
        ) : null}
      </div>

      <div className="background-layout">
        <div className="centered-links">
          {links.map((link) => (
            <div className="link" key={link.id}>
              <div className="card">
                <Link to={link.to}>
                  <img src={link.imageSrc} alt={`Link ${link.id}`} />
                  <p>{link.description}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="comment-box">
        <textarea
          rows="4"
          placeholder="Leave a comment..."
          value={comment}
          onChange={handleCommentChange}
          className="comment-input"
        ></textarea>
        <button onClick={handleSubmitComment} className="comment-button">
          Submit
        </button>
      </div>

      {/* Display submitted comments */}
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
