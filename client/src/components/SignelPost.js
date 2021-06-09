import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { userContext } from "../App";
import Skeleton from "react-loading-skeleton";
function SignelPost(props) {
  const [post, setPost] = useState(null);
  const { postid } = useParams();
  const [value, setValue] = useState(1);
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    fetch(`/singlepost/${postid}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, [value]);

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((data) => {
        setValue((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };
  const deleteComment = (commentId, postID) => {
    fetch(`/deletecomment/${commentId}/${postID}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((data) => {
        setValue((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  const likePost = (id) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setValue((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setValue((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  const addComment = (id, text) => {
    fetch("/addcomment", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setValue((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      { post ? (
        <div className="card home-card">
          <Link
            to={
              post.postedBy._id !== state._id
                ? `/profile/${post.postedBy._id}`
                : "/profile"
            }
            style={{ display: "inline-block", margin: "0" }}
          >
            {post.postedBy.name}
          </Link>

          {post.postedBy._id === state._id ? (
            <i
              className="material-icons"
              onClick={() => deletePost(post._id)}
              style={{ color: "red", cursor: "pointer", float: "right" }}
            >
              delete
            </i>
          ) : null}
          <div className="card-image">
            <img src={post.photo} alt="" />
          </div>
          <div className="card-content">
            {post.likes.includes(state._id) ? (
              <i
                className="material-icons"
                onClick={() => unlikePost(post._id)}
                style={{ color: "red", cursor: "pointer" }}
              >
                thumb_down
              </i>
            ) : (
              <i
                className="material-icons"
                onClick={() => likePost(post._id)}
                style={{ color: "green", cursor: "pointer" }}
              >
                thumb_up
              </i>
            )}

            <h6>{post.likes.length} Likes</h6>
            <h6>{post.title}</h6>
            <p>{post.body}</p>
            {post.comments.map((comment,index) => (
              <div key={index}>
                {comment.postedBy._id === state._id ? (
                  <i
                    className="material-icons"
                    onClick={() => deleteComment(comment._id, post._id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    delete
                  </i>
                ) : null}
                <strong>{comment.postedBy.name} : </strong>{" "}
                <span>{comment.text}</span>
              </div>
            ))}
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();

                addComment(post._id, e.target[0].value);
              }}
            >
              <input type="text" placeholder="add comment .." />
            </form>
          </div>
        </div>
      ) : (
        
        <div className="card home-card">


        
        <div className="card-image">
        <Skeleton height={250} width={"100%"}/>
        </div>

        <div className="card-content">
          <h6><Skeleton /></h6>
          <h6><Skeleton /></h6>
          <p><Skeleton /></p>   
            <div>        

             
              <strong><Skeleton /></strong>{" "}
              <span><Skeleton /></span>
            </div>
       
          
            <Skeleton />
         
        </div>
      </div>
  
  )}
</div>
  )

      }
export default SignelPost
