import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Heading1 from "../components/Heading1";
import Row from "../components/Row";
import Column from "../components/Column";
import Button from "../components/Button";

export default function CompletedPage() {
  const [completedTodos, setCompletedTodos] = useState([]);
  useEffect(() => {
    const API_URL = "http://localhost:8000/api/todos";
    const token = localStorage.getItem("todolist");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

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
              <Column col="1">
                <input type="checkbox" name="completed" value={item.task} />
              </Column>
              <Column col="8">
                <label>{item.task}</label>
              </Column>
              <Column col="2">
                <Button>Restore</Button>
              </Column>
              <Column col="1">
                <Button>Delete</Button>
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
