import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadPicAndFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError("email is not valid");
      return;
    }
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
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            pic: data.url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
              setError(data.error);
            } else {
              setError("account created succesfully");
            }
          });
      })
      .catch((err) => console.log(err));
  };

  const uploadTextFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError("email is not valid");
      return;
    }
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
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            pic: "https://res.cloudinary.com/instagramclone-ir/image/upload/v1623003136/51f6fb256629fc755b8870c801092942_ramvwg.png",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
              setError(data.error);
            } else {
              setError("account created succesfully");
            }
          });
      })
      .catch((err) => console.log(err));
  };

  const postData = () => {
    if (image) {
      uploadPicAndFields();
    } else {
      uploadTextFields();
    }
  };
  return (
    <div className="mycard">
      <div class="card auth-card">
        <h2>Instagram</h2>
        {error && (
          <h6
            style={{
              backgroundColor: "lightsalmon",
              color: "white",
              padding: "10px",
            }}
          >
            {error}
          </h6>
        )}
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files)} />
          </div>

          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          onClick={postData}
          className="btn waves-effect waves-light blue lighten-2"
          type="submit"
          name="action"
        >
          Sign up
        </button>
        <h5>
          <Link to="/signin">Already have an account ? </Link>
        </h5>
      </div>
    </div>
  );
}

export default Signup;
