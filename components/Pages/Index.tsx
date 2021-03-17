
import * as React from "https://esm.sh/react";

import UILink from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/components/Core/UIRouter/UILink.tsx";

export default class Index extends React.Component<unknown, unknown>
{
    constructor(props: unknown)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        const element =
            <div className="wrapper">
                <div className="header">
                    <div className="nav-wrapper">
                        <nav>
                            <a className="home" href="/">
                                <img className="logo" src="/static/logo.svg" height={50} alt="logo" />
                                Home
                            </a>
                            {/** @todo Restore links to About and Contact */}
                            <div className="links">
                                {/* <a href="#">About</a> */}
                                {/* <a href="#">Contact</a> */}
                            </div>
                        </nav>
                    </div>
                    <div className="title-wrapper">
                        <h1>
                            <strong><span className="ghost-gray">Ghost</span>written</strong>
                        </h1>
                        <h3>
                            <span className="ghost-gray">Our expertise.</span>
                            <strong>Your</strong> essays.
                        </h3>
                        <div className="button-wrapper">
                            {/** @todo Restore original button link to form */}
                            {/* <UILink href="/test" element={<button className="shadow">Get Started</button>} /> */}
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
            </div >;
        return element;
    }
}