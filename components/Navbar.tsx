
import * as React from "react";
import * as ReactRouter from "react-router";

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
                    {/* <a href="#">About</a> */}
                    {/* <a href="#">Contact</a> */}
                </div>
            </nav>
        </div>;
    return element;
}