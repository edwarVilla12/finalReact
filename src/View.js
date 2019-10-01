import React from "react";

import Calendar from "./components/Calendar";

import "./design.css";

// the main class that involves all the functionality
class MainClass extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default MainClass;
