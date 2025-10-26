import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [posts, setPosts] = useState([]);
    const [unfollowed,setUnfollowed]=useState(0);
    
    // Highlights can be static or fetched; here we use static demo data
    const highlights = [
        { id: 1, label: "Travel", img: "https://picsum.photos/seed/high1/80" },
        { id: 2, label: "Food", img: "https://picsum.photos/seed/high2/80" },
        { id: 3, label: "Pets", img: "https://picsum.photos/seed/high3/80" },
        { id: 4, label: "Friends", img: "https://picsum.photos/seed/high4/80" },
    ];

    const handleUnFollow = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/followers/${id}`);
                
            setUnfollowed(prev => !prev); // Toggle to trigger useEffect
        } catch (err) {
            console.error("Error unfollowing:", err);
            alert("Failed to unfollow. Please try again.");
        }
    }

    useEffect(() => {
        axios
            .get("http://localhost:3000/profile")
            .then((data) => setProfile(data.data))
            .catch((error) => console.log(error));

        axios
            .get("http://localhost:3000/followers")
            .then((data) => {
                setFollowers(data.data);
            })
            .catch((error) => console.log(error));

        axios
            .get("http://localhost:3000/posts")
            .then((data) => setPosts(data.data))
            .catch((error) => console.log(error));
    }, [unfollowed]);

    function HandleOnChange(e) {
        setProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleUpdate = async () => {
        axios
            .put("http://localhost:3000/profile", profile)
            .then(() => setShowEdit(false))
            .catch((err) => console.log(err));
    };

        return (
            <div className="container py-4 px-2 px-md-5">
                {profile ? (
                    <>
                        {/* Profile header row: image, info, stats */}
                        <div className="row justify-content-center align-items-center mb-4 g-0">
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center mb-3 mb-md-0">
                                <img
                                    className="rounded-circle border border-2"
                                    src={profile.profile_pic}
                                    alt="profilePic"
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="d-flex flex-column flex-md-row align-items-md-center gap-2 mb-3">
                                    <h2 className="me-md-4 mb-0 text-center text-md-start flex-shrink-0" style={{fontWeight:600}}>{profile.username}</h2>
                                    <button
                                        className="btn btn-outline-secondary btn-sm order-2 order-md-1 mx-auto mx-md-0"
                                        onClick={() => setShowEdit((v) => !v)}
                                        style={{minWidth:120}}
                                    >
                                        {showEdit ? "Cancel" : "Edit Profile"}
                                    </button>
                                </div>
                                <div className="d-flex justify-content-center justify-content-md-start gap-4 mb-3">
                                    <span className="fw-bold text-center" style={{cursor:'pointer'}} onClick={() => setShowFollowers(true)}>
                                        <span style={{fontWeight:600}}>{posts.length}</span> posts
                                    </span>
                                    <span className="fw-bold text-center" style={{cursor:'pointer'}} onClick={() => setShowFollowers(true)}>
                                        <span style={{fontWeight:600}}>{followers.length}</span> followers
                                    </span>
                                    <span className="fw-bold text-center" style={{color:'#888'}}>0 following</span>
                                </div>
                                {showEdit && (
                                    <div className="mb-3 animate__animated animate__fadeIn">
                                        <input
                                            type="text"
                                            value={profile.username}
                                            name="username"
                                            onChange={HandleOnChange}
                                            className="form-control mb-2"
                                            placeholder="Username"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="profile_pic"
                                            onChange={HandleOnChange}
                                            value={profile.profile_pic}
                                            placeholder="Profile picture URL"
                                        />
                                        <button
                                            onClick={handleUpdate}
                                            className="btn btn-primary btn-sm mt-2"
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Highlights section */}
                        <div className="row mb-4">
                            <div className="col-12 d-flex gap-3 gap-md-4 justify-content-center flex-wrap">
                                {highlights.map((h) => (
                                    <div key={h.id} className="text-center">
                                        <img
                                            src={h.img}
                                            alt={h.label}
                                            className="rounded-circle border border-2"
                                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                        />
                                        <div className="small mt-1">{h.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Posts grid */}
                        <div className="row g-1 g-md-2">
                            {posts.length ? (
                                posts.map((post) => (
                                    <div key={post.id} className="col-4 col-md-3">
                                        <img
                                            src={post.image}
                                            alt={post.caption}
                                            className="w-100 border"
                                            style={{ aspectRatio: "1/1", objectFit: "cover" }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5">No posts yet</div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center">Loading...</div>
                )}

                {/* Followers Modal */}
                {showFollowers && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Followers</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowFollowers(false)}
                                    ></button>
                                </div>
                                <div className="modal-body p-0">
                                    <div className="list-group list-group-flush">
                                        {followers.length ? (
                                            followers.map((follower) => (
                                                <div
                                                    key={follower.id}
                                                    className="list-group-item d-flex align-items-center"
                                                >
                                                    <img
                                                        src={follower.profile_pic}
                                                        alt={follower.username}
                                                        className="rounded-circle me-3"
                                                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                                    />
                                                    <span>{follower.username}</span>
                                                        <button className="btn btn-secondary ms-auto" onClick={()=>handleUnFollow(follower.id)}>
                                                            un follow
                                                        </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3">Loading followers...</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
}

export default Profile


//imagepicker 