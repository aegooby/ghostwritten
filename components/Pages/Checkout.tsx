
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import { Token, StripeCheckoutProps } from "https://esm.sh/react-stripe-checkout";
import StripeCheckout from "https://cdn.skypack.dev/react-stripe-checkout@2.6.3";

export default class Checkout extends React.Component<unknown, unknown>
{
    constructor(props: unknown)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        const stripeCheckoutProps: StripeCheckoutProps =
        {
            token: (token: Token) => console.log(token),
            /** @todo Replace `stripeKey` with "pk_live_51IPELvBCMz7QpSOWPhEDdU5yqV0JyrrrpTOz6RKerNkXnsoV5tHum7BjNmsTXVjfPekIgqnAiVUigWWXfaNRVYHN00zjBRkDg0". */
            stripeKey: "pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVjhk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm",
            name: "Checkout",
            panelLabel: "Pay",
            amount: 27500,
        };
        const element =
            <>
                <ReactHelmet.Helmet>
                    <title>Ghostwritten</title>
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
                                <strong><span><span className="ghost-gray">Ghost</span>written</span></strong>
                            </h1>
                            <h3>
                                <span className="ghost-gray">Our expertise.</span>&nbsp;<span><strong>Your</strong> essays.</span>
                            </h3>
                            <div className="button-wrapper">
                                {/** @todo Restore original button link to form */}
                                {/* <UILink href="/test" element={<button className="shadow">Get Started</button>} /> */}
                                <StripeCheckout {...stripeCheckoutProps}>
                                    <button className="shadow">Checkout</button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </div>
                    <div className="page">
                        <div className="main-text">
                            <p>Temp text.</p>
                        </div>
                        <p className="copyinfo">© 2021 Ghostwritten</p>
                    </div>
                </div >
            </>;
        return element;
    }
}