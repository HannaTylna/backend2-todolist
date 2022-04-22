import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Container from "./components/Container";
import CompletedPage from "./pages/CompletedPage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export const AppContext = createContext({});

function App() {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("todolist");
  const API_URL = "http://localhost:8000/api";

  const getUser = () => {
    const url = `${API_URL}/user`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <AppContext.Provider value={{ user, setUser, getUser }}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/todos" element={<HomePage refresh={getUser} />} />
            <Route path="/completed" element={<CompletedPage />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
