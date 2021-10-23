import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
