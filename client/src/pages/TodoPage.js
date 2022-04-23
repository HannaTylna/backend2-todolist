import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Heading2 from "../components/Heading2";
import Column from "../components/Column";
import Button from "../components/Button";
import Form from "../components/Form";
import Table from "../components/Table";
import TableBody from "../components/TableBody";
import Row from "../components/Row";
import Label from "../components/Label";

export default function TodoPage(props) {
  const params = useParams();
  const [todoDetails, setTodoDetails] = useState({});
  const [task, setTask] = useState("");
  const [createdAt] = useState("");
  const [updatedAt] = useState("");
  const [content, setContent] = useState("");

  const url = `http://localhost:8000/api/todos/${params.id}`;
  const token = localStorage.getItem("todolist");

  useEffect(() => {
    const token = localStorage.getItem("todolist");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTodoDetails(data[0]);
      });
  }, [params.id, url]);

  const handleClick = e => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    const payload = { task, content, createdAt, updatedAt };
    fetch(`${url}/isCompleted`, {
      method: "PUT", //"PATCH"
      headers: headers,
      body: JSON.stringify(payload)
    }).then(result => {
      result.json().then(data => {
        setTodoDetails(data);
      });
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const formatedCreatedAt = new Date(todoDetails.createdAt).toLocaleString();
  const formatedUpdatedAt = new Date(todoDetails.updatedAt).toLocaleString();
  const formatedIsCompleted = todoDetails.isCompleted === true ? "Yes" : "No";

  function handleOnDelete(id) {
    //     console.log(id);
    //     const url = `https://frebi.willandskill.eu/api/v1/customers/${props.id}/`;
    //     const token = localStorage.getItem("exam");
    //     const headers = {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`
    //     };
    //     fetch(url, {
    //       method: "DELETE",
    //       headers: headers
    //     }).then(res => {
    //       props.refresh_customer();
    //       navigate("/home");
    //});
  }

  function handleOnSelect(id) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTask(todoDetails.task);
        setContent(todoDetails.content);
      });
  }

  return (
    <>
      <Nav />
      <Column col="5" width="80%">
        <Heading2 margin="100px auto 30px auto">{todoDetails.task}</Heading2>
        <Table background="#5f6a91">
          <tbody>
            <TableBody tr>
              <TableBody fontWeight="bold" textAlign="left">
                CreatedAt:
              </TableBody>
              <TableBody>{formatedCreatedAt}</TableBody>
            </TableBody>
            <TableBody tr>
              <TableBody fontWeight="bold" textAlign="left">
                UpdatedAt:
              </TableBody>
              <TableBody>{formatedUpdatedAt}</TableBody>
            </TableBody>
            <TableBody tr>
              <TableBody fontWeight="bold" textAlign="left">
                Content:
              </TableBody>
              <TableBody>{todoDetails.content}</TableBody>
            </TableBody>
            <TableBody tr>
              <TableBody fontWeight="bold" textAlign="left">
                IsCompleted:
              </TableBody>
              <TableBody>
                <TableBody>{formatedIsCompleted}</TableBody>
              </TableBody>
            </TableBody>
            <TableBody tr>
              <TableBody></TableBody>
              <TableBody>
                <Button onClick={() => handleOnSelect(todoDetails._id)}>
                  Update
                </Button>
              </TableBody>
            </TableBody>
          </tbody>
        </Table>
      </Column>
      <Column col="5" width="80%">
        <Form onSubmit={handleSubmit}>
          <Heading2 color="#fff">Update information</Heading2>
          <Row flex>
            <Column col="4">
              <Label htmlFor="username">Task: </Label>
            </Column>
            <Column col="8">
              <input
                placeholder="Update Todo"
                type="text"
                value={task ?? ""}
                onChange={e => setTask(e.target.value)}
                required="required"
              />
            </Column>
            <br />
          </Row>
          <Row flex>
            <Column col="4">
              <Label htmlFor="username">Content: </Label>
            </Column>
            <Column col="8">
              <input
                placeholder="Write description"
                type="text"
                value={content ?? ""}
                onChange={e => setContent(e.target.value)}
              />
            </Column>
            <br />
          </Row>
          <Row flex>
            <Button onClick={handleClick} type="submit" margin="10px auto">
              Done
            </Button>
            <Button type="submit" margin="10px auto">
              Save
            </Button>
          </Row>
        </Form>
      </Column>
    </>
  );
}
