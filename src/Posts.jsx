import { useEffect } from "react";
import { useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="d-flex justify-content-center">
            <div  className="card my-5" style={{ width: "25rem" }}>
              <div>
                <div className="d-flex ms-2 mt-2 gap-2">
                  <img
                    className="dp rounded-circle"
                    src={post.user.profile_pic}
                    alt=""
                  />
                  <h5>{post.user.username}</h5>
                </div>
              </div>

              <img src={post.image} className="mt-2 card-img-top" alt="..." />
              <div className="card-body">
                <div className="d-flex gap-2 mb-1">
                  <i className="bi bi-chat"></i>
                  <i className="bi bi-heart"></i>
                  <i className="bi bi-send"></i>
                  <i className="bi bi-bookmark ms-auto"></i>
                </div>
                <h6 style={{"fontSize":"15px"}}>{post.likes} Likes</h6>
                <p className="card-text">{post.caption}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default Posts;
