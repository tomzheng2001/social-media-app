import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import "../sass/main.scss";

const Login = () => {
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
        redirectToReferrer: false,
        error: false,
        loading: false,
    });

    const [userId, setUserId] = useState();

    const [data, setData] = useState();

    const handleLoginChange = (name) => (event) => {
        setLoginValues({
            ...loginValues,
            [name]: event.target.value,
        });
    };



    const clickSubmit = (event) => {
        event.preventDefault();
        setLoginValues({ ...loginValues, loading: true });
        signin({
            email: loginValues.email,
            password: loginValues.password,
        }).then((data) => {
            if (data.err) {
                setLoginValues({
                    ...loginValues,
                    error: data.err,
                    loading: false,
                });
            } else {
                authenticate(data, () => {
                    setUserId(data.user.id);
                    setData(loginValues.username);
                    setLoginValues({
                        ...loginValues,
                        email: "",
                        password: "",
                        redirectToReferrer: true,
                        success: true,
                    });
                });
            }
        });
    };

    const redirectToDashboard = () => {
        if (loginValues.redirectToReferrer) {
            return (
                <Redirect
                    to={{
                        pathname: "/auth-twitter",
                        state: {
                            user: data,
                            userId: userId,
                            page: "auth-twitter"
                        },
                    }}
                />
            );
        }
    };


    return (
        <div className="background">
            {redirectToDashboard()}
            <div className="signin">
                <h1 className="signin__heading">Login</h1>
                <input placeholder="Email Address" onChange={handleLoginChange("email")} type="email" className="signin__email"/>
                <input placeholder="Password" onChange={handleLoginChange("password")} type="password" className="signin__password"/>
                <a href="#" className="signin__but" onClick={clickSubmit}>Login</a>
            </div>
        </div>
    );
};

export default Login;