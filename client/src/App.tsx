import React, { Fragment } from "react";
import "./App.css";
import Appbar from "./containers/appbar/Appbar";
import Home from "./containers/home/home";

const App: React.FC = () => {
  return (
    <Fragment>
      <Appbar />
      <Home />
    </Fragment>
  );
};

export default App;
