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
                    <h1>An Sentiment Analysis Tool for Twitter</h1>
                    <h4>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Harum, odit! Dolorum ab sequi eos perferendis odit
                        suscipit, consectetur at laboriosam!
                    </h4>
                    <a className="hero__headers-btn" href="/visualize">Get Started</a>
                </div>
            </div>
            <div className="about">
                <div className="about__card">
                    <svg className="about__card-icon" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
                    <h1 className="about__card-heading">Analyze Your Tweets</h1>
                    <h4 className="about__card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam rerum doloremque reprehenderit culpa, possimus atque voluptas beatae officia magnam laudantium. Itaque totam molestiae expedita sunt doloremque facilis dicta rerum saepe?</h4>
                </div>
                <div className="about__card">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-group" class="svg-inline--fa fa-user-group" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"></path></svg>
                    <h1 className="about__card-heading">Compare With Friends</h1>
                    <h4 className="about__card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed deserunt non veritatis reprehenderit velit, optio perspiciatis nam voluptatum rerum ducimus ipsam praesentium impedit odit neque suscipit eligendi. Esse, harum provident?</h4> 
                </div>
                <div className="about__card">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-area" class="svg-inline--fa fa-chart-area" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M480 416H64V63.1C64 46.33 49.67 32 32 32S0 46.33 0 63.1V448c0 17.67 14.33 32 32 32h448C497.7 480 512 465.7 512 448S497.7 416 480 416zM480 236.1c0-7.773-2.828-15.28-7.961-21.12l-70.01-79.68c-9.562-10.88-26.5-10.88-36.06 0l-43.38 49.37l-63.78-80.44c-9.609-12.12-28-12.12-37.61 0L134.9 213.9C130.4 219.5 128 226.6 128 233.8V352h352V236.1z"></path></svg>
                    <h1 className="about__card-heading">Sentiment Over Time</h1>
                    <h4 className="about__card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque similique saepe tenetur eligendi aliquam alias provident, consectetur reiciendis aliquid quisquam. Ratione incidunt perferendis odio accusamus ab est impedit voluptas ad?</h4>
                </div>
            </div>
        </div>
    );
};

export default Landing;
