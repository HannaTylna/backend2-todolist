import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Heading1 from "../components/Heading1";
import ToDoCreate from "../components/ToDoCreate";

export default function HomePage(props) {
  // const [username, setUsername] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

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
        setTodos(data);
      });

    fetch(`${API_URL}/completed`, {
      method: "GET",
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        setCompletedTodos(data);
      });
  }, []);

  return (
    <>
      <Nav />
      <ToDoCreate onSuccess={props.refresh} />
      <Heading1 margin="50px auto 30px auto">Todo List</Heading1>
      {/* <p>Hello!</p> */}
      {todos.length ? (
        todos.map(item => {
          return (
            <div key={item._id}>
              <input type="checkbox" name="completed" value={item.task} />
              <label>{item.task}</label>
            </div>
          );
        })
      ) : (
        <h3>No todo yet</h3>
      )}{" "}
      <Heading1 margin="100px auto 30px auto">Completed List</Heading1>
      {completedTodos.length ? (
        completedTodos.map(item => {
          return (
            <div key={item._id}>
              <input type="checkbox" name="completed" value={item.task} />
              <label>{item.task}</label>
            </div>
          );
        })
      ) : (
        <h3>No todo yet</h3>
      )}{" "}
    </>
  );
}
