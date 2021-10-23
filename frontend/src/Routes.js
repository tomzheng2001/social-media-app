import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreatePost from "./components/CreatePost"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/upload" exact component={CreatePost} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
