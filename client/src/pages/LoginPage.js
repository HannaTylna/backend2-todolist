import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function LoginPage(props) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const { username, setUsername } = useContext(AppContext);
  const { password, setPassword } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = { username, password };
    const API_URL = "http://localhost:8000/login";

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        const token = data.token;
        localStorage.setItem("todolist", token);
        navigate("/home");
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Login" />
      </form>

      <p>
        If you want to sign up, please click
        <a href="/"> here</a>
      </p>
    </>
  );
}
