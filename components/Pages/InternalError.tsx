
import * as React from "react";
import * as ReactHelmet from "react-helmet";
import MediaQuery from "react-responsive";

import Navbar from "../Navbar.tsx";

interface Props
{
    staticContext:
    {
        statusCode: number;
    };
}

export default function InternalError(props: Props)
{
    if (props.staticContext)
        props.staticContext.statusCode = 500;

    const element: React.ReactElement =
        <>
            <ReactHelmet.Helmet>
                <title>Internal Error | Ghostwritten</title>
            </ReactHelmet.Helmet>
            <div className="wrapper">
                <div className="header">
                    <Navbar />
                    <div className="title-wrapper">
                        <h1>
                            <strong>
                                <span className="ghost-gray">500</span>
                                <MediaQuery maxWidth={399}><br /></MediaQuery>
                                <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
                                <span>Internal Error</span>
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