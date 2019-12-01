import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Appbar from "./containers/appbar/Appbar";
import Home from "./containers/home/home";
import MemberList from "./containers/member-list/memberList";
import Lists from "./containers/lists/lists";
import Messages from "./containers/messages/messages";
import AuthenticatedRoute from "./components/authenticatedRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Appbar />
        <Route exact path={"/"} component={Home} />
        <Switch>
          <AuthenticatedRoute exact path="/matches" Component={MemberList} />
          <AuthenticatedRoute exact path="/lists" Component={Lists} />
          <AuthenticatedRoute exact path="/messages" Component={Messages} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
