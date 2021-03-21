
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";
import * as ReactHelmet from "https://esm.sh/react-helmet";

interface Props
{
    id: string;
}

export default class Referral extends React.Component<Props, unknown>
{
    constructor(props: Props)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        const element =
            <>
                <ReactHelmet.Helmet>
                    <title>Referral | Ghostwritten</title>
                </ReactHelmet.Helmet>
                <div className="wrapper">
                    <div className="header">
                        <div className="nav-wrapper">
                            <nav>
                                <ReactRouter.Link to="/" className="home">
                                    <img className="logo" src="/static/logo.svg" height={50} alt="logo" />
                                    Home
                                </ReactRouter.Link>
                                {/** @todo Restore links to About and Contact */}
                                <div className="links">
                                    {/* <a href="#">About</a> */}
                                    {/* <a href="#">Contact</a> */}
                                </div>
                            </nav>
                        </div>
                        <div className="title-wrapper">
                            <h1>
                                <strong><span><span className="ghost-gray">Ghost</span>written</span></strong>
                            </h1>
                            <h3>
                                <span className="ghost-gray">Your referrer's ID is</span>&nbsp;<span><strong>{this.props.id}</strong></span>
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
                            <h1>You've been referred</h1>
                            <p>
                                Send us an email at <a href="mailto:ghostwrittenhq@gmail.com">ghostwrittenhq@gmail.com</a> with
                                your referrer's ID in the subject line and
                                the details of your essay request, and our team
                                will begin work on it right away.
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