import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "./Row";
import Column from "./Column";
import Button from "./Button";
import AppContext from "../App";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
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
  }, []);

  const handleChange = () => {
    //const url = `http://localhost:8000/api/todos/${id}`;
  };
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
              <Column col="1">
                <input type="checkbox" name="completed" value={item._id} />
              </Column>
              <Column col="8">
                <label>{item.task}</label>
              </Column>
              <Column col="3">
                <Button onClick={handleChange}>Done</Button>
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
