
import * as React from "react";
import * as Stripe from "stripe";
import * as ReactPopup from "react-popup";
import Form from "./Form.tsx";
const stripeAPIKey = "pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVj" +
    "hk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm";
const stripe = Stripe.loadStripe();

export default class App extends React.Component<unknown, unknown>
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
                            <strong><span className="ghost-gray">Ghost</span>written</strong>
                        </h1>
                        <h3>
                            <span className="ghost-gray">Our expertise.</span>
                            <strong>Your</strong> essays.
                        </h3>
                        <div className="button-wrapper">
                            <Form />
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
