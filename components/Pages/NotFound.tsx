
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";
import * as ReactHelmet from "https://esm.sh/react-helmet";

export default class NotFound extends React.Component<ReactRouter.RouteComponentProps, unknown>
{
    constructor(props: ReactRouter.RouteComponentProps)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        if (this.props.staticContext)
            this.props.staticContext.statusCode = 404;
        const element =
            <>
                <ReactHelmet.Helmet>
                    <title>Not Found</title>
                </ReactHelmet.Helmet>
                <div className="wrapper">
                    <div className="header">
                        <div className="nav-wrapper">
                            <nav>
                                <ReactRouter.Link to="/" className="home">
                                    <img className="logo" src="/static/logo.svg" height={50} alt="logo" />
                                Home
                            </ReactRouter.Link>
                                {/** @todo Restore links to About and Contact */}
                                <div className="links">
                                    {/* <a href="#">About</a> */}
                                    {/* <a href="#">Contact</a> */}
                                </div>
                            </nav>
                        </div>
                        <div className="title-wrapper">
                            <h1>
                                <strong>
                                    <span className="ghost-gray">404</span>
                                    &nbsp;
                                    <span>Not Found</span>
                                </strong>
                            </h1>
                        </div>
                    </div>
                    <div className="page">
                        <div className="main-text"></div>
                        <p className="copyinfo">© 2021 Ghostwritten</p>
                    </div>
                </div>
            </>;
        return element;
    }
}