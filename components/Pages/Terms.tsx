
import * as React from "react";

import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
const Lazy = React.lazy(() => import("./Lazy/Terms.tsx"));
import Page from "../Page.tsx";

export default function Terms()
{
    const content =
        <>
            <Lazy />
            <Footer />
        </>;
    const element: React.ReactElement =
        <div className="wrapper">
            <Header
                h2Gray="Terms"
                h2Black={<>of <strong>Service</strong></>}
                responsive
            />
            <Page helmet={<title>Ghostwritten | Terms</title>} content={content} lazy />
        </div >;
    return element;
}