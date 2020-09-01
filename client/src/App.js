import React from "react";
import "./App.css";
import { login } from "./api/passwords";

function App() {
  login();

  async function getPasswords() {
    const response = await fetch("/api/passwords");
    const data = await response.json();
    console.log(data);
  }
  getPasswords();

  return <div className="App">Test</div>;
}

export default App;
