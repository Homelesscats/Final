import React, { useContext, useState } from "react"; // Import useState for managing the comment state
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import "./homepage.css"; // Import a CSS file for styling


function Homepage() {
  const { user } = useContext(AuthContext);

  // State to store the user's comment
  const [comment, setComment] = useState("");

  // Function to handle changes in the comment input
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Function to handle submitting the comment (you can customize this)
  const handleSubmitComment = () => {
    // You can perform actions like sending the comment to a server/database here
    console.log("Submitted Comment:", comment);
    // Clear the comment input
    setComment("");
  };

  // Define an array of links with images and descriptions
  const links = [
    {
      id: 1,
      imageSrc: "/link1-image.jpg", // Replace with your image URL
      description: "Description for Link 1",
      to: "/link1",
    },
    {
      id: 2,
      imageSrc: "/link2-image.jpg", // Replace with your image URL
      description: "Description for Link 2",
      to: "/link2",
    },
    {
      id: 3,
      imageSrc: "/link3-image.jpg", // Replace with your image URL
      description: "Description for Link 3",
      to: "/link3",
    },
  ];

  return (
    <div className="homepage-container">
      <div className="content">
        <h1>Welcome to the Homepage</h1>
        {user ? (
          // If a user is logged in, display user information
          <>
            <h2>{user.email} is now logged in</h2>
          </>
        ) : null}
      </div>

      {/* Background layout */}
      <div className="background-layout">
        {/* Centered links with margin-top */}
        <div className="centered-links">
          {links.map((link) => (
            <div className="link" key={link.id}>
              <Link to={link.to}>
                <img src={link.imageSrc} alt={`Link ${link.id}`} />
                <p>{link.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS styles to position the comment box at the bottom */}
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
  );
}

export default Homepage;