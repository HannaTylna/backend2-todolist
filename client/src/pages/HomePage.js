import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  // const [username, setUsername] = useState("");
  const [todo, setTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = "http://localhost:8000/api/todos";
    const token = localStorage.getItem("todolist");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    fetch(API_URL, {
      method: "GET",
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        setTodo(data);
      });

    fetch(`${API_URL}/completed`, {
      method: "GET",
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        setCompletedTodo(data);
      });
  }, []);

  const handleClick = async e => {
    localStorage.removeItem("todolist");
    navigate("/login");
  };

  return (
    <>
      <h1>To do List</h1>
      <p>Hello!</p>
      <button onClick={handleClick}>Logout</button>
      {todo.length ? (
        todo.map(item => {
          return <li key={item._id}>{item.task}</li>;
        })
      ) : (
        <h3>No todo yet</h3>
      )}{" "}
      <h1>Completed List</h1>
      {completedTodo.length ? (
        completedTodo.map(item => {
          return <li key={item._id}>{item.task}</li>;
        })
      ) : (
        <h3>No todo yet</h3>
      )}{" "}
    </>
  );
}
