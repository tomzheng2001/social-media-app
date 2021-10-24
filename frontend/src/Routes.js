import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Register from "./components/Register";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/upload" exact component={CreatePost} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
