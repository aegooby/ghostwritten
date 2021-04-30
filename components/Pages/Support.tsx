
import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as ReactHelmet from "react-helmet";
import MediaQuery from "react-responsive";

import Navbar from "../Navbar.tsx";

export default function Index()
{
    const element: React.ReactElement =
        <>
            <ReactHelmet.Helmet>
                <title>Ghostwritten | Support</title>
            </ReactHelmet.Helmet>
            <div className="wrapper">
                <div className="header">
                    <Navbar />
                    <div className="title-wrapper">
                        <h1><strong><span><span className="ghost-gray">Ghost</span>written</span></strong></h1>
                        <h2>
                            <span className="ghost-gray">Contact</span>&nbsp;<strong>us</strong>.
                        </h2>
                    </div>
                </div>
                <div className="page">
                    <div className="main-text">
                        <h1>We're here to help</h1>
                        <p>
                            We aim to deliver the best quality work and service
                            to our customers. If you are dissatisfied with your
                            Ghostwritten experience, or experiencing issues with
                            the website, don't hesitate to reach out to us
                            at <a href="mailto:ghostwrittenhq@gmail.com">ghostwrittenhq@gmail.com</a> and
                            our support team will do our best to help you
                            immediately.
                        </p>
                    </div>
                    <p className="copyinfo">© 2021 Ghostwritten</p>
                </div>
            </div >
        </>;
    return element;
}