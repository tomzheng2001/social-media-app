import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreatePost from "./components/CreatePost"
import AuthorizeFacebook from "./components/AuthorizeFacebook"
import FacebookAuth from "./components/AuthorizeFacebook";
import AuthorizeTwitter from "./components/AuthorizeTwitter";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/upload" exact component={CreatePost} />
                <Route path="/auth-facebook" exact component={FacebookAuth} />
                <Route path="/auth-twitter" exact component={AuthorizeTwitter} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
