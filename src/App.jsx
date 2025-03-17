import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import viteLogo from "./assets/images/favico.png";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
