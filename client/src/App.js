import React, { useState, createContext, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export const AppContext = createContext(null);

function App() {
  const [userData, setUserData] = useState("");

  const getUserInformation = useCallback(() => {
    const token = localStorage.getItem("todolist");
    const url = "http:localhost:8000/todo";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data);
      });
  }, []);

  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);

  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider value={{ userData, setUserData }}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/todo" element={<HomePage />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
