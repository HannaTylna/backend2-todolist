import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

  const navigate = useNavigate();
  const [todoDetails, setTodoDetails] = useState({});
  const [task, setTask] = useState("");
  const [createdAt] = useState("");
  const [updatedAt] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const url = `http://localhost:8000/api/todos/${params.id}`;
  const token = localStorage.getItem("todolist");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        setTodoDetails(data[0]);
      });
  }, [params.id, url]);

  const handleOnClick = e => {
    e.preventDefault();

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

  const handleOnSubmit = e => {
    e.preventDefault();
  };
  
    onFileChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', this.state.file)
        axios.post(`${url}/upload`, formData, {
        }).then(res => {
            console.log(res)
        })
    }

  const formatedCreatedAt = new Date(todoDetails.createdAt).toLocaleString();
  const formatedUpdatedAt = new Date(todoDetails.updatedAt).toLocaleString();
  const formatedIsCompleted = todoDetails.isCompleted === true ? "Yes" : "No";

  function handleOnDelete(id) {
    fetch(url, {
      method: "DELETE",
      headers: headers
    }).then(res => {
      navigate("/todos");
    });
  }

  function handleOnSelect(id) {
    fetch(url, {
      method: "GET",
      headers: headers
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
        <Form>
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
            <Button onClick={handleOnClick} type="submit" margin="10px auto">
              Done
            </Button>
            <Button onClick={handleOnSubmit} type="submit" margin="10px auto">
              Save
            </Button>
            <Button onClick={handleOnDelete} type="submit" margin="10px auto">
              Delete
            </Button>
          </Row>
        </Form>
        <form onSubmit={this.onSubmit}>
          <h3>React File Upload</h3>
          <div className="form-group">
            <input type="file" onChange={this.onFileChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </Column>
    </>
  );
}
