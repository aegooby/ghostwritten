
import * as React from "react";
import * as ReactRouter from "react-router-dom";

export default function Navbar()
{
    const element: React.ReactElement =
        <div className="nav-wrapper">
            <nav>
                <ReactRouter.Link to="/" className="home">
                    <img className="logo" src="/logo.svg" height={39} width={50} alt="logo" />Home
                    </ReactRouter.Link>
                <div className="links">
                    <ReactRouter.Link to="/support">
                        Support
                        </ReactRouter.Link>
                </div>
            </nav>
        </div>;
    return element;
}
