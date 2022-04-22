import React, { useState } from "react";

import Heading2 from "../components/Heading2";
import Form from "../components/Form";
import Column from "../components/Column";
import Row from "../components/Row";
import Button from "../components/Button";
import Input from "../components/Input";

export default function ToDoCreate(props) {
  const [task, setTask] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    const payload = { task };
    const url = "http://localhost:8000/api/todos";
    const token = localStorage.getItem("todolist");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onSuccess();
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Heading2 color="#fff" textTransform="none">
          Create a new Todo
        </Heading2>
        <Row flex>
          <Column col="9">
            <Input
              label=""
              placeholder="Create a new Todo"
              type="text"
              value={task}
              onChange={e => setTask(e.target.value)}
              required="required"
            />
          </Column>
          <Column col="3">
            <Button onClick={() => window.location.reload(false)} type="submit">
              Create
            </Button>
          </Column>
        </Row>
      </Form>
      ;
    </>
  );
}
