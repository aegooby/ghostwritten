
import * as React from "https://esm.sh/react";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import MediaQuery from "https://esm.sh/react-responsive";

import Navbar from "../Navbar.tsx";

export default class Index extends React.Component<unknown, unknown>
{
    constructor(props: unknown)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        const element =
            <>
                <ReactHelmet.Helmet>
                    <title>Ghostwritten</title>
                    <meta name="description" content={"You send us what you need. " +
                        "Need an IA? Extended Essay? College application essay? " +
                        "No problem. Tell us what you need and when, then leave " +
                        "the rest to us. We guarantee an on-time, A-level essay " +
                        "in your inbox."} />
                </ReactHelmet.Helmet>
                <div className="wrapper">
                    <div className="header">
                        <Navbar />
                        <div className="title-wrapper">
                            <h1><strong><span><span className="ghost-gray">Ghost</span>written</span></strong></h1>
                            <h2>
                                <span className="ghost-gray">Our expertise.</span>
                                <MediaQuery maxWidth={399}><br /></MediaQuery>
                                <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
                                <strong>Your</strong> essays.
                            </h2>
                            <div className="button-wrapper">
                                {/** @todo Restore original button link to form */}
                                <button className="shadow" onClick={() => window.location.href = "mailto:ghostwrittenhq@gmail.com"}>Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div className="page">
                        <div className="main-text">
                            <h1>How it works</h1>
                            <p>
                                You send us what you need. Need an IA? Extended
                                Essay? College application essay? No problem. Tell
                                us what you need and when, then leave the rest to
                                us. We guarantee an on-time, A-level essay in your
                                inbox.
                            </p>
                            <p>
                                To get started, email us at <a href="mailto:ghostwrittenhq@gmail.com">ghostwrittenhq@gmail.com</a>
                            </p>
                            <h1>About us</h1>
                            <p>
                                We are a team of college students who all achieved
                                40+ points on the IB Diploma in subjects such as
                                Math and Physics HL, graduating as the top students
                                in our classes. We know exactly how hard it is to
                                write a good high school essay — we’ve been through
                                it. We are committed to using our academic expertise
                                to help you become a top-scoring student.
                            </p>
                            <p className="disclaimer">
                                <em>
                                    Disclaimer: any work provided by Ghostwritten is
                                    for educational purposes only. Use of this work
                                    is at the recipient's own risk and their
                                    responsibility alone.
                            </em>
                            </p>
                        </div>
                        <p className="copyinfo">© 2021 Ghostwritten</p>
                    </div>
                </div >
            </>;
        return element;
    }
}