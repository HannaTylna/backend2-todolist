import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Container from "./components/Container";
import CompletedPage from "./pages/CompletedPage";
import TodoPage from "./pages/TodoPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todos" element={<HomePage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/todos/:id" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
