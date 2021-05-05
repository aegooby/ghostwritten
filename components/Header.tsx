
import * as React from "react";
import MediaQuery from "react-responsive";

import Navbar from "./Navbar.tsx";

interface Props
{
    button?: React.ReactElement | undefined;
    h2Gray: string | React.ReactElement;
    h2Black: string | React.ReactElement;
    responsive?: true;
}

export default function Header(props: Props)
{
    const responsive =
        <>
            <MediaQuery maxWidth={399}><br /></MediaQuery>
            <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
        </>;
    const element: React.ReactElement =
        <div className="header">
            <Navbar />
            <div className="title-wrapper">
                <h1><strong><span><span className="ghost-gray">Ghost</span>written</span></strong></h1>
                <h2>
                    <span className="ghost-gray">{props.h2Gray}</span>
                    {props.responsive ? responsive : <>&nbsp;</>}
                    {props.h2Black}
                </h2>
                {props.button ? <div className="button-wrapper">{props.button}</div> : <></>}
            </div>
        </div>
        ;
    return element;
}