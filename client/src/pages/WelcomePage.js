import React from "react";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000";

async function signUpUser(credentials) {
  return fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      //Accept: "application/json"
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
}

export default function WelcomePage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await signUpUser({
      username,
      password
    });
    setToken(token);
  };
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
