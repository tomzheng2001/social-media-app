import React from "react";
import "../sass/main.scss";

const Landing = () => {
    return (
        <div className="landing">
            <div className="hero">
                <div className="hero__nav">
                    <div className="hero__nav-info">
                        <a href="#">Tools</a>
                        <a href="#">Plans</a>
                        <a href="#">How it Works</a>
                    </div>
                    <div className="hero__nav-login">
                        <a href="/register">Register</a>
                        <a href="/login">Login</a>
                    </div>
                </div>
                <div className="hero__headers">
                    <h1>An All-In-One Tool to Manage Your Social Media</h1>
                    <h4>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Harum, odit! Dolorum ab sequi eos perferendis odit
                        suscipit, consectetur at laboriosam!
                    </h4>
                    <a className="hero__headers-btn" href="/visualize">Get Started</a>
                </div>
            </div>
            <div className="about"></div>
        </div>
    );
};

export default Landing;
