import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import APIHelper from "../APIHelper";

export default function HomePage() {
  const { userData } = useContext(AppContext);
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const handleClick = async e => {
    localStorage.removeItem("todolist");
    navigate("/login");
  };

  useEffect(() => {
    // const fetchTodoAndSetTodos = async () => {
    //   const todos = await APIHelper.getAllTodos();
    //   setTodos(todos);
    // };
    // fetchTodoAndSetTodos();
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:8000/todo");
      const data = await response.json();
      //console.log(data);
    };
    fetchTodos();
  }, []);

  return (
    <>
      <h1>To do List</h1>
      {userData ? <p>Hello, {userData.user}!</p> : " "}
      <button onClick={handleClick}>Logout</button>

      <ul>
        {todos.length ? (
          todos.map(({ _id, task, completed }, i) => (
            <li key={i} className={completed ? "completed" : ""}></li>
          ))
        ) : (
          <p>No Todos Yet </p>
        )}
      </ul>
    </>
  );
}
