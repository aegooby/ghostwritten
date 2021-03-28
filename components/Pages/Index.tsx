
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import MediaQuery from "https://esm.sh/react-responsive";

import Navbar from "../Navbar.tsx";

export default function Index()
{
    const element: React.ReactElement =
        <>
            <ReactHelmet.Helmet>
                <title>Ghostwritten</title>
                <meta name="description" content={"Our expertise. Your essays."} />
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
                            <ReactRouter.Link to="/order">
                                <button className="shadow">Get Started</button>
                            </ReactRouter.Link>
                        </div>
                    </div>
                </div>
                <div className="page">
                    <div className="main-text">
                        <h1>How it works</h1>
                        <p>
                            Looking for a high school or college-level essay?
                            No problem. Tell us what you need and when, then
                            leave the rest to our team of skilled writers.
                            We guarantee an on-time, A-grade essay in your
                            inbox.
                            </p>
                        <h1>About us</h1>
                        <p>
                            We are a team of dedicated writers who have consistently
                            achieved exceptional results through high school
                            and college, in subjects such as high level mathematics,
                            physics, literature, and biology.
                            </p>
                        <p>
                            We know exactly how hard it is to write a good essay,
                            because we’ve been through it before. We are committed
                            to using our academic expertise to help you become
                            a top-scoring student.
                            </p>
                        <h1>Why Ghostwritten?</h1>
                        <p>
                            Many essay writing services employ people who
                            have not touched a college or high school essay
                            in years, and are out of touch with modern
                            curriculums.
                            </p>
                        <p>
                            Others are staffed by unreliable freelancers who
                            face no reprecussions for conducting scams or
                            rating manipulation.
                            </p>
                        <p>
                            When you order a Ghostwritten essay, you are
                            guaranteed dedicated, reliable writers who have
                            experience with your requirements and curriculum,
                            whether it's IB, AP, college-level, and many more.
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