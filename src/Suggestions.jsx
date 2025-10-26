import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_SHOW_COUNT = 5;
  const navigate=useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/profile")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/suggestions")
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFollow=async(id,username,profile_pic)=>{
    axios.post('http://localhost:3000/followers',{"id":id,"username":username,"profile_pic":profile_pic})
    .then(alert("followed"))
    .catch(err=>console.log(err));
  }

  return (
    <div className="suggestions d-flex flex-column align-items-start ms-md-5 m-3">
      {/* Profile section */}
      {profile ? (
        <div onClick={()=>navigate('/profile')} className="d-flex align-items-center gap-2 mb-3 w-100 w-md-50">
          <img
            className="dp rounded-circle"
            src={profile.profile_pic}
            alt="profile"
            width="40"
            height="40"
          />
          <h6 className="mb-0">{profile.username}</h6>
          <p className="mb-0 ms-auto text-primary fw-semibold">Switch</p>
        </div>
      ) : (
        <p className="text-secondary">Loading...</p>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center gap-3 w-80 mb-3">
        <p className="mb-0 text-secondary">Suggested for you</p>
        <button 
          className="btn btn-link p-0 text-dark text-decoration-none fw-bold"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'See less' : 'See all'}
        </button>
      </div>

      {/* Suggestions list */}
      <div className="w-50 suggestions-list">
        {suggestions
          .slice(0, showAll ? suggestions.length : INITIAL_SHOW_COUNT)
          .map((user) => (
          <div
            key={user.id}
            className="d-flex align-items-center gap-2 my-2"
          >
            <img
              className="dp rounded-circle"
              src={user.profile_pic}
              alt={user.username}
              width="35"
              height="35"
            />
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold">{user.username}</p>
              <small className="text-muted">{user.status}</small>
            </div>
            <a className="mb-0 text-primary fw-semibold" onClick={()=>(handleFollow(suggestions.id,suggestions.username,suggestions.profile_pic))}>Follow</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;














