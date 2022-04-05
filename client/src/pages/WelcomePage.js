import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const API_URL = "http://localhost:8000";
    const payload = { username, password };
    fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => setResponse(data));
  };

  useEffect(() => {
    if (response) {
      navigate("/login");
    }
  }, [navigate, response]);

  return (
    <>
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Sign up" />
      </form>

      <p>
        If you already have login information, click
        <a href="/login"> here</a>
      </p>
    </>
  );
}
