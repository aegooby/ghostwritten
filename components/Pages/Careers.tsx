import * as React from "react";

import Header from "../Header.tsx";
const Lazy = React.lazy(() => import("./Lazy/Careers.tsx"));
import Footer from "../Footer.tsx";
import Page from "../Page.tsx";

export default function Careers()
{
    const button =
        <a className="button shadow" href="mailto:careers@ghostwritten.io">
            Contact Us
        </a>;
    const content =
        <>
            <Lazy />
            <Footer />
        </>;
    const element: React.ReactElement =
        <div className="wrapper">
            <Header
                button={button}
                h2Gray="Become a"
                h2Black={<><strong>Ghostwriter</strong>.</>}
                responsive
            />
            <Page helmet={<title>Ghostwritten | Careers</title>} content={content} lazy />
        </div >;
    return element;
}
