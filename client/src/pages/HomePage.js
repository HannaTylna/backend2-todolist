import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Heading1 from "../components/Heading1";
import ToDoCreate from "../components/ToDoCreate";
import Todo from "../components/Todo";

export default function HomePage(props) {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("todolist");
  const API_URL = "http://localhost:8000/api";

  const getUser = () => {
    const url = `${API_URL}/user`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Nav />
      <Heading1 margin="80px auto 30px auto">Todo List</Heading1>
      <p>Hello, {user.username}!</p>
      <Todo />
      <ToDoCreate onSuccess={props.refresh} />
    </>
  );
}
