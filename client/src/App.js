import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export const AppContext = createContext(null);

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider
          value={{ username, setUsername, password, setPassword }}
        >
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
