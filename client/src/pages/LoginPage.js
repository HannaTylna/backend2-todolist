import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Link from "../components/Link";
import Heading2 from "../components/Heading2";
import Row from "../components/Row";
import Column from "../components/Column";
import Label from "../components/Label";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = { username, password };
    const API_URL = "http://localhost:8000/api/user/login";

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.username);
        const token = data.token;
        localStorage.setItem("todolist", token);
        navigate("/todos");
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Heading2>Login</Heading2>
        <Row flex>
          <Column col="4">
            <Label htmlFor="username">Username: </Label>
          </Column>
          <Column col="8">
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Column>
          <br />
          <br />
        </Row>
        <Row flex>
          <Column col="4">
            <Label htmlFor="password">Password: </Label>
          </Column>
          <Column col="8">
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Column>
          <br />
          <br />
        </Row>
        <Button type="submit">Login</Button>
      </Form>

      <Paragraph>
        If you want to sign up, please click
        <Link href="/"> here</Link>
      </Paragraph>
    </>
  );
}
