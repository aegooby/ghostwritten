
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";

export default class Navbar extends React.Component<unknown, unknown>
{
    constructor(props: unknown)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        const element =
            <div className="nav-wrapper">
                <nav>
                    <ReactRouter.Link to="/" className="home">
                        <img className="logo" src="/static/logo.svg" height={50} width={30} alt="logo" />
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
}