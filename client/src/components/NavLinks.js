import React from "react";
import Column from "./Column";
import Link from "./Link";
import { useNavigate } from "react-router-dom";

export default function NavBarLink() {
  const navigate = useNavigate();
  const handleClick = async e => {
    //localStorage.removeItem("todolist");
    navigate("/login");
  };

  return (
    <>
      <Column col="1" width="10%">
        <Link href="/todos" color="#fff">
          Todos
        </Link>
      </Column>
      <Column col="1" width="20%">
        <Link href="/completed" color="#fff">
          Completed Todos
        </Link>
      </Column>
      <Column col="1" width="10%">
        <Link href="/login" color="#fff" onClick={handleClick}>
          Logout
        </Link>
      </Column>
    </>
  );
}
