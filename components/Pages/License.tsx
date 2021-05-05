
import * as React from "react";

import Header from "../Header.tsx";
const Lazy = React.lazy(() => import("./Lazy/License.tsx"));
import Footer from "../Footer.tsx";
import Page from "../Page.tsx";

export default function License()
{
    const content =
        <>
            <Lazy />
            <Footer />
        </>;
    const element: React.ReactElement =
        <div className="wrapper">
            <Header
                h2Gray="Copyright"
                h2Black={<strong>License</strong>}
                responsive
            />
            <Page helmet={<title>Ghostwritten | License</title>} content={content} lazy />
        </div >;
    return element;
}