import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewStory.css";

function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  // Fetch story data
  useEffect(() => {
    console.log('Fetching story with id:', id);
    fetch(`http://localhost:3000/story`)
      .then((response) => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then((stories) => {
        console.log('Stories received:', stories);
        // Find story by array index instead of ID
        const storyIndex = Number(id) - 1;
        const currentStory = stories[storyIndex];
        
        if (!currentStory) {
          throw new Error('Story not found');
        }
        
        console.log('Current story:', currentStory);
        setStory(currentStory);
      })
      .catch((err) => {
        console.error('Error loading story:', err);
        navigate('/'); // Redirect to home on error
      });
  }, [id, navigate, tot]);

  // Validate story number and handle invalid IDs
  useEffect(() => {
    const storyNumber = Number(id);
    const totalStories = Number(tot);

    if (!storyNumber || storyNumber > totalStories || storyNumber <= 0) {
      console.log('Invalid story number:', storyNumber, 'total:', totalStories);
      navigate("/");
    }
  }, [id, tot, navigate]);

  const handleNext = () => {
    if (Number(id) < Number(tot)) {
      navigate(`/story/${Number(id) + 1}/${tot}`);
    } else {
      navigate("/");
    }
  };

  const handlePrevious = () => {
    if (Number(id) > 1) {
      navigate(`/story/${Number(id) - 1}/${tot}`);
    }
  };

  return (
    <div className="story-viewer position-fixed top-0 start-0 w-100 h-100 bg-dark d-flex justify-content-center align-items-center">
      {story ? (
        <>
          {/* Story Count Indicator */}
          <div className="position-absolute  d-none top-0 start-0 w-100 px-2 pt-2">
            <div className="d-flex gap-1">
              {[...Array(Number(tot))].map((_, index) => (
                <div key={index} className="story-indicator">
                  <div className={`story-bar ${index + 1 <= Number(id) ? 'viewed' : ''}`} />
                </div>
              ))}
            </div>
          </div>

          {/* User info */}
          <div className="story-header">
            <div className="d-flex align-items-center">
              <div className="user-info">
                <img
                  src={story.user.profile_pic}
                  alt={story.user.username}
                  className="story-avatar"
                />
                <span className="username">{story.user.username}</span>
                <small className="story-time">{new Date().toLocaleTimeString()}</small>
              </div>
              <div className="story-controls">
                <button className="control-btn" onClick={() => {/* pause functionality */}}>
                  <i className="bi bi-pause-fill"></i>
                </button>
                <button className="control-btn mx-5" onClick={() => {/* mute functionality */}}>
                  <i className="bi bi-volume-up"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation areas */}
          <div className="position-absolute start-0 top-0 h-100 w-25" onClick={handlePrevious} />
          <div className="position-absolute end-0 top-0 h-100 w-25" onClick={handleNext} />

          {/* Story Container */}
          <div className="story-container">
            {story.image && (
              <img
                className="story-media"
                src={story.image}
                alt={`Story by ${story.user.username}`}
                onError={(e) => {
                  console.error('Image failed to load:', story.image);
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x600?text=Story+Not+Found';
                }}
              />
            )}
          </div>

          {/* Close button */}
          <button
            className="btn-close btn-close-white position-absolute top-4 end-4"
            onClick={() => navigate("/")}
            aria-label="Close"
          />
        </>
      ) : (
        <div className="loading-container text-center">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light mb-0">Loading story {id} of {tot}...</p>
          {/* Close button even while loading */}
          <button
            className="btn-close btn-close-white position-absolute top-4 end-4"
            onClick={() => navigate("/")}
            aria-label="Close"
          />
        </div>
      )}
    </div>
  );
}

export default ViewStory;
