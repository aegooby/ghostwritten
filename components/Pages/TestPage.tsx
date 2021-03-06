
import * as React from "react";

export default class TestPage extends React.Component<unknown, unknown>
{
    constructor(props: unknown)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        const element =
            <div className="wrapper">
                <div className="header">
                    <div className="nav-wrapper">
                        <nav>
                            <a className="home" href="/">Home</a>
                            <div className="links">
                                <a href="#">About</a>
                                <a href="#">Contact</a>
                            </div>
                        </nav>
                    </div>
                    <div className="title-wrapper">
                        <h1>
                            <strong><span className="ghost-gray">Penis</span>written</strong>
                        </h1>
                        <h3>
                            <span className="ghost-gray">Our expertise.</span>
                            <strong>Your</strong> essays.
                        </h3>
                        <div className="button-wrapper">
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>
                <div className="page">
                    <div className="main-text">
                        <p>
                            Sample text goes here. Envision yourself, for
                            just one moment, as a schlong. A long schlong.
                        </p>
                        <p>
                            More sample text.
                        </p>
                    </div>
                    <p className="copyinfo">© 2021 Ghostwritten</p>
                </div>
            </div >;

        return element;
    }
}