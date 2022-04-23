import React, { useState, useEffect } from "react";
import Row from "./Row";
import Column from "./Column";
import Button from "./Button";

export default function Todo(props) {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    const token = localStorage.getItem("todolist");
    const url = "http://localhost:8000/api/todos";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {todos.length ? (
        todos.map(item => {
          return (
            <Row
              justify="center"
              key={item._id}
              border="1px solid"
              padding="10px"
              boxShadow="5px 10px #888888"
              margin="20px 0px"
            >
              <Column col="1"></Column>
              <Column col="11">
                <a href={`/todos/${item._id}`}>{item.task}</a>
              </Column>
            </Row>
          );
        })
      ) : (
        <h3>No todo yet</h3>
      )}{" "}
    </>
  );
}
