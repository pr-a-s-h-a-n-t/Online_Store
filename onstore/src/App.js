// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Navs from "./Navs";

import { DarkmodeContextProvider } from "./contex/darkmode/index";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";
import TestFile from "./components/test";

function App() {
  return (
    <div className="App">
      <DarkmodeContextProvider>
        <ReactNotifications />
        <Navs />
        <TestFile />
      </DarkmodeContextProvider>
    </div>
  );
}

export default App;
