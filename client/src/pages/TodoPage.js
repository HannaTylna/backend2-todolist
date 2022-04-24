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
import { toast } from "react-toastify";

export default function TodoPage(props, onSuccess) {
  const [files, setFiles] = useState([]);
  const [hidden, setHidden] = useState(false);
  const params = useParams();

  const navigate = useNavigate();
  const [todoDetails, setTodoDetails] = useState({});
  const [task, setTask] = useState("");
  const [content, setContent] = useState("");

  const url = `http://localhost:8000/api/todos/${params.id}`;
  const token = localStorage.getItem("todolist");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    const payload = {
      task,
      content
    };
    fetch(url, {
      method: "PUT", //"PATCH"
      headers: headers,
      body: JSON.stringify(payload)
    })
      .then(result => result.json())
      .then(data => {
        console.log(data);
        setTodoDetails(data);
      });
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

    const payload = { task, content };
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

  const handleOnSelect = id => {
    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        setTask(todoDetails.task);
        setContent(todoDetails.content);
      });
  };

  const onInputChange = e => {
    setFiles(e.target.files);
  };

  const onSubmit = e => {
    e.preventDefault();

    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }

    axios
      .put(`${url}/upload`, data)
      .then(response => {
        setFiles(response.data.file);
        window.location.reload(false);
        // toast.success("Upload Success");
        // onSuccess(response.data.file);
      })
      .catch(e => {
        toast.error("Upload Error");
      });
  };

  const handleOnDelete = id => {
    fetch(url, {
      method: "DELETE",
      headers: headers
    }).then(res => {
      navigate("/todos");
    });
  };

  console.log(todoDetails.file);
  return (
    <>
      <Nav />
      <Row justify="center">
        <Column col="8" width="80%">
          <Heading2 margin="100px auto 30px auto">{todoDetails.task}</Heading2>
          <Table background="#5f6a91">
            <tbody>
              <TableBody tr>
                <TableBody fontWeight="bold" textAlign="left">
                  Files:
                </TableBody>
                <TableBody>
                  {todoDetails.file && todoDetails.file.length
                    ? todoDetails.file.map(item => {
                        return (
                          <>
                            {!hidden ? <p>{item.originalname}</p> : null}

                            <button
                              hidden={hidden}
                              onClick={() => setHidden(s => !s)}
                            >
                              Delete
                            </button>
                          </>
                        );
                      })
                    : []}
                </TableBody>
              </TableBody>
              <TableBody tr>
                <TableBody fontWeight="bold" textAlign="left">
                  CreatedAt:
                </TableBody>
                <TableBody>
                  {new Date(todoDetails.createdAt).toLocaleString()}
                </TableBody>
              </TableBody>
              <TableBody tr>
                <TableBody fontWeight="bold" textAlign="left">
                  UpdatedAt:
                </TableBody>
                <TableBody>
                  {new Date(todoDetails.updatedAt).toLocaleString()}
                </TableBody>
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
                  <TableBody>
                    {todoDetails.isCompleted === true ? "Yes" : "No"}
                  </TableBody>
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
      </Row>
      <Row>
        <Column col="7" width="100%">
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
        </Column>
        <Column col="5" width="100%">
          <Form method="put" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
              <Heading2 color="#fff">Upload Files </Heading2>
              <input
                type="file"
                onChange={onInputChange}
                className="form-control"
                multiple
              />
            </div>
            <button>Submit</button>
          </Form>
        </Column>
      </Row>
    </>
  );
}
