import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Stories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 'current',
    profile_pic: './src/assets/elavarasan.png',
    username: 'Your story'
  });

  useEffect(() => {
    fetch("http://localhost:3000/story")
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((err) => console.error("Error fetching stories:", err));
  }, []);

  const totalStories = stories.length;

  return (
    <div className="stories-wrapper">
      <div className="story">
        {/* Your Story */}
        <div className="story-item">
          <div className="gradient-border your-story">
            <img
              src={currentUser.profile_pic}
              className="story-dp"
              alt="Your story"
            />
            <div className="add-story-icon">
              <span className="plus-icon">+</span>
            </div>
          </div>
          <p className="text-truncate mb-0 story-username">Your story</p>
        </div>
        
        {/* Other Stories */}
        {totalStories > 0 ? (
          stories.map((story) => (
            <div
              key={story.id}
              className="story-item"
              onClick={() => navigate(`/story/${story.id}/${totalStories}`)}
            >
              <div className="gradient-border">
                <img
                  src={story.user.profile_pic}
                  className="story-dp"
                  alt={story.user.username}
                />
              </div>
              <p className="text-truncate mb-0 story-username">{story.user.username}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Stories;
