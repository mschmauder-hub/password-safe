import React from "react";
import "./App.css";

function App() {
  async function login() {
    const data = {
      email: "something@mail.com",
      password: "12345",
    };

    console.log(data);
    const passwords = await fetch("/api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(passwords);
  }
  login();

  async function getPasswords() {
    const response = await fetch("/api/passwords");
    const data = await response.json();
    console.log(data);
  }
  getPasswords();

  return <div className="App"></div>;
}

export default App;
