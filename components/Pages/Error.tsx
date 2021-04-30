
import * as React from "react";
import * as ReactHelmet from "react-helmet";
import MediaQuery from "react-responsive";

import Navbar from "../Navbar.tsx";

interface Props
{
    code: number;
    text: string;
    staticContext?:
    {
        statusCode: number;
    };
}

export default function Error(props: Props)
{
    if (props.staticContext)
        props.staticContext.statusCode = props.code;
    const element: React.ReactElement =
        <>
            <ReactHelmet.Helmet>
                <title>Ghostwritten | {props.text}</title>
            </ReactHelmet.Helmet>
            <div className="wrapper">
                <div className="header">
                    <Navbar />
                    <div className="title-wrapper">
                        <h1>
                            <strong>
                                <span className="ghost-gray">{props.code}</span>
                                <MediaQuery maxWidth={399}><br /></MediaQuery>
                                <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
                                <span>{props.text}</span>
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