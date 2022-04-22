import React, { useContext, useEffect } from "react";
import Nav from "../components/Nav";
import Heading1 from "../components/Heading1";
import ToDoCreate from "../components/ToDoCreate";
import Todo from "../components/Todo";
import { AppContext } from "../App";

export default function HomePage(props) {
  const { user, getUser } = useContext(AppContext);
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      <Nav />
      <Heading1 margin="80px auto 30px auto">Todo List</Heading1>
      <p>Hello, {user.username}!</p>
      <Todo />
      <ToDoCreate onSuccess={props.refresh} />
    </>
  );
}
