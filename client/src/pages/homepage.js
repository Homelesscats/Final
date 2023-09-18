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
  if (user && user.email) {
    const newComment = {
      text: comment,
      id: comments.length + 1,
      timestamp: new Date().toLocaleString(),
      email: user.email, // Use user's email here
    };

    // Add the new comment to the state
    setComments([...comments, newComment]);

    // Clear the comment input
    setComment("");
  }
};

  const links = [
    {
      id: 1,
      img: "pages/beagle.jpg", // Update the image source for Link 1
      description: "Description for Link 1",
      to: "https://buy.stripe.com/test_5kA5oq5JEbnw8485kl",
    },
    {
      id: 2,
      imgc: "happ1.jpg", // Update the image source for Link 2
      description: "Description for Link 2",
      to: "https://buy.stripe.com/test_8wMdUWega3V41FKcMO",
    },
    {
      id: 3,
      img: "pom.jpg", // Update the image source for Link 3
      description: "Description for Link 3",
      to: "https://buy.stripe.com/test_4gweZ01to3V4cko8wz",
    },
  ];

  return (
    <div className="homepage-container">
      <div className="content">
        <h1>Welcome to the Animal Liberation League {user.email}!</h1>
        <h3>
    Our mission at the Animal Liberation League is to empower compassionate individuals to make a positive impact on the lives of animals in need. We provide a central hub connecting supporters with organizations like the Beagle Freedom Project, OC Pom Rescue, and Friends of Orange County's Homeless Pets. Through awareness, support, and collaboration, we strive to bring freedom, safety, and happiness to animals, one rescue, one adoption, and one act of kindness at a time.
  </h3>

      </div>

      <div className="background-layout">
        <div className="centered-links">
          {links.map((link) => (
            <div className="link" key={link.id}>
              <div className="card">
                <Link to={link.to}>
                  <img src={link.img} alt={`Link ${link.id}`} />
                  <p>{link.description}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="comments">
          <div className="comment-container">
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
          </div>

          <div className="comments-section">
            {comments.slice().reverse().map((comment) => (
              <div key={comment.id} className="comment">
                <p>
                  <strong>{comment.email} {comment.timestamp}</strong>: {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
