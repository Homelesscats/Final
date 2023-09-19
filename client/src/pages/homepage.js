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

      img: "https://stripe-camo.global.ssl.fastly.net/b9aad506bd761d4cb6cdb554042d4be1d59b9d087cb0206d1c138f2f22f1f33b/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574E6a64463878546E424d6157684751555a455456633354474e6e66475a735833526c633352665330744c5548525759554e56636d4a5961544d3364577734526d6c78656d593530304c416c4576317a4f",
      description: "Your donation supports the Beagle Freedom Project's mission: rescuing beagles from extensive animal testing and finding them caring homes.",
      to: "https://buy.stripe.com/test_5kA5oq5JEbnw8485kl",
    },
    {
      id: 2,
      img: "https://stripe-camo.global.ssl.fastly.net/90e8b99178983eef49cbd5a0a136601eabdc1af7307d02814f28b50472ea9cb7/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574E6a64463878546e424d6157684751555a455456633354474e6e66475a735833526c63335266536d4e6e546c56325256704d6254525359315644544868486155686a5a575a3030304744764d39684D79",
      description: "Your donation helps us find forever homes for homeless pets.",
      to: "https://buy.stripe.com/test_8wMdUWega3V41FKcMO",
    },
    {
      id: 3,
      img: "https://stripe-camo.global.ssl.fastly.net/dbf4913e034465d6111e0c08b68fbc99f0d77ef9006e9b0f3428759675090f46/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574E6a64463878546e424d6157684751555a455456633354474e6e66475a735833526c633352664e6e6c575a30356f53556c71546a523056314a4f61544e4557474a4a5931523630306e466f6976745075",
      description: "Your donation to OC Pom Rescue, a female-led, foster-based Pomeranian rescue in Southern California, helps make adoption positive and accessible while promoting responsible ownership.",
      to: "https://buy.stripe.com/test_4gweZ01to3V4cko8wz",
    },
  ];
  return (
    <div className="background-layout">
      <div className="content">
        <h1>
          Welcome to the Animal Liberation League {user ? user.email : ""}!
        </h1>
        <h3>
          Our mission at the Animal Liberation League is to empower
          compassionate individuals to make a positive impact on the lives of
          animals in need. We provide a central hub connecting supporters with
          organizations like the Beagle Freedom Project, OC Pom Rescue, and
          Friends of Orange County's Homeless Pets. Through awareness, support,
          and collaboration, we strive to bring freedom, safety, and happiness
          to animals, one rescue, one adoption, and one act of kindness at a
          time.
        </h3>
      </div>
      <div>
        <div className="centered-links">
          {links.map((link) => (
            <div className="link" key={link.id}>
              <div className="card">
                <Link to={link.to}>
                <div className="image-container">
                  <img src={link.img} alt={`Link ${link.id}`} />
                  </div>
                  <p className ="link-des">{link.description}</p>
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
              <button
                onClick={handleSubmitComment}
                className="comment-button"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="comments-section">
            {comments
              .slice()
              .reverse()
              .map((comment) => (
                <div key={comment.id} className="comment">
                  <p>
                    <strong>
                      {comment.email} {comment.timestamp}
                    </strong>
                    : {comment.text}
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