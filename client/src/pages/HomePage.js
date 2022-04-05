import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function HomePage() {
  const { username } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = async e => {
    e.preventDefault();

    const API_URL = "http://localhost:8000/login";

    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      localStorage.removeItem("todolist");
      navigate("/login");
    });
  };

  return (
    <>
      <h1>To do List</h1>
      <p>Hello, {username}!</p>
      <button onClick={handleClick}>Logout</button>
    </>
  );
}
