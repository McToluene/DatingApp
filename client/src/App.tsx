import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Appbar from "./containers/appbar/Appbar";
import Home from "./containers/home/home";
import MemberList from "./containers/member-list/memberList";
import Lists from "./containers/lists/lists";
import Messages from "./containers/messages/messages";
import AuthenticatedRoute from "./components/authenticatedRoute";
import MemberDetail from "./components/member/detail/member-detail";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Appbar />
      <Route exact path={"/"} component={Home} />
      <Switch>
        <AuthenticatedRoute exact path="/matches" Component={MemberList} />
        <AuthenticatedRoute exact path="/lists" Component={Lists} />
        <AuthenticatedRoute exact path="/messages" Component={Messages} />
        <AuthenticatedRoute
          exact
          path="/matches/:id"
          Component={MemberDetail}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
