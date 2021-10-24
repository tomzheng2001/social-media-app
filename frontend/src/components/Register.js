import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, signup, authenticate, retriveTokens } from "../auth";
import "../sass/main.scss";

const Register = () => {
    const [registerValues, setRegisterValues] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        loading: false,
        redirectToReferrer: false,
        success: false,
    });

    const [userId, setUserId] = useState();

    const [data, setData] = useState();

    const handleRegisterChange = (name) => (event) => {
        setRegisterValues({
            ...registerValues,
            [name]: event.target.value,
        });
    };


    const clickSubmit = (event) => {
        event.preventDefault();
        setRegisterValues({ ...registerValues, loading: true });
        signup({
            username: registerValues.username,
            email: registerValues.email,
            password: registerValues.password,
            passwordConfirm: registerValues.confirm_password,
        }).then((data) => {
            if (data) {
                console.log(data);
                authenticate(data, () => {
                    setRegisterValues({
                        username: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                        redirectToReferrer: true,
                        success: true,
                    });
                });
            }
        });
    };

    const showSuccess = () => {
        return (
            <div
                className="register__success"
                style={{ display: registerValues.success ? "" : "none" }}
            >
                Successfully registered! Please <Link to="/login">Signin</Link>
            </div>
        );
    };

    return (
        <div className="background">
            <div className="register">
                {showSuccess()}
                <h1 className="register__heading">Register</h1>
                <input autoComplete="off" placeholder="Username" type="text" onChange={handleRegisterChange("username")} className="register__username"/>
                <input autoComplete="off" placeholder="Email Address" onChange={handleRegisterChange("email")} type="email" className="register__email"/>
                <input autoComplete="off" placeholder="Password" onChange={handleRegisterChange("password")} type="password" className="register__password"/>
                <input autoComplete="off" placeholder="Confirm Password" onChange={handleRegisterChange("confirm_password")} type="password" className="register__confirmpassword"/>
                <a href="#" className="register__button" onClick={clickSubmit}>Register</a>
            </div>
        </div>
    );
};

export default Register;