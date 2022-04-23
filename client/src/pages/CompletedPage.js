import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Heading1 from "../components/Heading1";
import Row from "../components/Row";
import Column from "../components/Column";
import Button from "../components/Button";

export default function CompletedPage() {
  const [completedTodos, setCompletedTodos] = useState([]);
  useEffect(() => {
    const url = "http://localhost:8000/api/todos/completed";
    const token = localStorage.getItem("todolist");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    fetch(url, {
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
      <Heading1 margin="100px auto 30px auto">Completed List</Heading1>
      {completedTodos.length ? (
        completedTodos.map(item => {
          return (
            <Row
              justify="center"
              key={item._id}
              border="1px solid"
              padding="10px"
              boxShadow="5px 10px #888888"
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
