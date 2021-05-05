
import * as React from "react";

import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
const Lazy = React.lazy(() => import("./Lazy/Privacy.tsx"));
import Page from "../Page.tsx";

export default function Privacy()
{
    const content =
        <>
            <Lazy />
            <Footer />
        </>;
    const element: React.ReactElement =
        <div className="wrapper">
            <Header
                h2Gray="Privacy"
                h2Black={<strong>Policy</strong>}
            />
            <Page helmet={<title>Ghostwritten | Privacy</title>} content={content} lazy />
        </div >;
    return element;
}