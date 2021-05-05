
import * as React from "react";
import * as ReactRouter from "react-router-dom";

export default function Footer()
{
    const element =
        <div className="footer">
            <div className="links">
                <ReactRouter.Link to="/privacy">Privacy</ReactRouter.Link>
                <ReactRouter.Link to="/terms">Terms</ReactRouter.Link>
                <ReactRouter.Link to="/license">License</ReactRouter.Link>
            </div>
            <p className="copyinfo">© 2021 Ghostwritten</p>
        </div>;
    return element;
}
