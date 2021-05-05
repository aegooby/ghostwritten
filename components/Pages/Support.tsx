
import * as React from "react";

import Footer from "../Footer.tsx";
import Header from "../Header.tsx";
import Page from "../Page.tsx";

export default function Index()
{
    const email = <a href="mailto:ghostwrittenhq@gmail.com">ghostwrittenhq@gmail.com</a>;
    const content: React.ReactElement =
        <div className="wrapper">
            <Header h2Gray="Contact" h2Black={<><strong>us</strong>.</>} />
            <div className="page">
                <div className="main-text">
                    <h1>We're here to help</h1>
                    <p>
                        We aim to provide the best for our customers. If you
                        were not satisfied with your experience, or if you
                        are having issues with the website, feel free to reach
                            out to us via email at {email} and our support team
                            will do our best to help you immediately.
                        </p>
                </div>
            </div>
            <Footer />
        </div >;
    return <Page helmet={<title>Ghostwritten | Support</title>} content={content} />;
}