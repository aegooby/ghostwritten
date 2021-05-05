
import * as React from "react";
import MediaQuery from "react-responsive";

import Navbar from "../Navbar.tsx";
import Footer from "../Footer.tsx";
import Page from "../Page.tsx";

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
    const content: React.ReactElement =
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
            <div className="page"></div>
            <Footer />
        </div>;
    return <Page helmet={<title>Ghostwritten | {props.text}</title>} content={content} />;
}