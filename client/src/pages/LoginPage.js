import React, { useState } from "react";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
}

export default function LoginPage({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <input type="submit" value="Login" />
      </form>

      <p>
        If you want to sign up, please click
        <a href="/"> here</a>
      </p>
    </>
  );
}
// LoginPage.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
