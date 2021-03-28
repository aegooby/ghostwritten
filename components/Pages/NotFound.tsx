
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import MediaQuery from "https://esm.sh/react-responsive";

import Navbar from "../Navbar.tsx";

export default function NotFound(props: ReactRouter.RouteComponentProps)
{
    if (props.staticContext)
        props.staticContext.statusCode = 404;
    const element: React.ReactElement =
        <>
            <ReactHelmet.Helmet>
                <title>Not Found | Ghostwritten</title>
            </ReactHelmet.Helmet>
            <div className="wrapper">
                <div className="header">
                    <Navbar />
                    <div className="title-wrapper">
                        <h1>
                            <strong>
                                <span className="ghost-gray">404</span>
                                <MediaQuery maxWidth={399}><br /></MediaQuery>
                                <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
                                <span>Not Found</span>
                            </strong>
                        </h1>
                    </div>
                </div>
                <div className="page">
                    <div className="main-text"></div>
                    <p className="copyinfo">© 2021 Ghostwritten</p>
                </div>
            </div>
        </>;
    return element;
}