import React from "react";
import Search from "./Search";

import DateAndTime from "./DateAndTime";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>What's the Weather?</h1>
        <DateAndTime />
        <Search />
      </div>
    </div>
  );
}
