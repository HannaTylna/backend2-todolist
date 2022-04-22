import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading1 from "../components/Heading1";
import Form from "../components/Form";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Link from "../components/Link";
import Heading2 from "../components/Heading2";
import Row from "../components/Row";
import Column from "../components/Column";
import Label from "../components/Label";

export default function WelcomePage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const API_URL = "http://localhost:8000/api/user/register";
    const payload = {
      username,
      password
    };
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => setResponse(data));
  };

  useEffect(() => {
    if (response) {
      navigate("/login");
    }
  }, [navigate, response]);

  return (
    <>
      <Heading1 center>Welcome!</Heading1>
      <Form margin="50px auto 30px auto" onSubmit={handleSubmit}>
        <Heading2>Sign up</Heading2>
        <Row flex>
          <Column col="4">
            <Label htmlFor="username">Username: </Label>
          </Column>
          <Column col="8">
            <input
              type="text"
              name="username"
              value={username ?? ""}
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
              value={password ?? ""}
              onChange={e => setPassword(e.target.value)}
            />
          </Column>
          <br />
          <br />
        </Row>
        <Button type="submit">Sign up</Button>
      </Form>

      <Paragraph>
        If you have already signed up, please click
        <Link href="/login"> here</Link>
      </Paragraph>
    </>
  );
}
