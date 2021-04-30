
import * as React from "react";
import * as ReactRouter from "react-router-dom";

export default function Navbar()
{
    const element: React.ReactElement =
        <div className="nav-wrapper">
            <nav>
                <ReactRouter.Link to="/" className="home">
                    <img className="logo" src="/logo.svg" height={50} width={30} alt="logo" />
                                Home
                </ReactRouter.Link>
                {/** @todo Restore links to About and Contact */}
                <div className="links">
                    <ReactRouter.Link to="/support">
                        Support
                    </ReactRouter.Link>
                </div>
            </nav>
        </div>;
    return element;
}