import React, { useState } from "react";
import { useHistory } from "react-router";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory()
  const postDetails = () => {   
    const data = new FormData();
    data.append("file", image[0]);
    data.append("upload_preset", "instaclone");
    data.append("cloud_name", "instagramclone-ir");
    fetch("https://api.cloudinary.com/v1_1/instagramclone-ir/image/upload", {
      method: "POST",
      body: data,     
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch("/createpost",{
          method:"POST",
          headers : {
              "Content-Type" : "application/json",
              "Authorization" : "Bearer " + localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              title,
              body,
              pic:data.url
          })
      }).then(res=>res.json())
      .then(data=>{
          console.log(data)
          if(data.error){
          setError(data.error)
          }else{
              
          setError("post created succesfully")
          history.push("/")              
          }
      })
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="card input-filed file-field"
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "40px",
        height: "300px",
      }}
    >
      {error && (
                <h6 style={{backgroundColor:"lightsalmon",color:"white",padding:"10px"}}>{error}</h6>
            )}
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload image</span>
          <input type="file" onChange={(e) => setImage(e.target.files)} />
        </div>

        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        class="btn waves-effect waves-light"
        onClick={postDetails}
        type="submit"
        name="action"
        style={{ display: "inline-block", margin: "10px 0" }}
      >
        submit post
        <i class="material-icons right">send</i>
      </button>
    </div>
  );
}

export default CreatePost;
