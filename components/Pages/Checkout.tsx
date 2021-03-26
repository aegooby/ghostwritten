
import * as React from "https://esm.sh/react";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import MediaQuery from "https://esm.sh/react-responsive";

import { Token, StripeCheckoutProps } from "https://esm.sh/react-stripe-checkout";
import StripeCheckout from "https://cdn.skypack.dev/react-stripe-checkout@2.6.3";

import Navbar from "../Navbar.tsx";

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
            /** @todo Replace `stripeKey` with live key. */
            stripeKey: "pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVjhk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm",
            name: "Checkout",
            panelLabel: "Pay",
            currency: "USD",
            amount: 27500,
            allowRememberMe: false,
        };
        const element =
            <>
                <ReactHelmet.Helmet>
                    <title>Ghostwritten</title>
                </ReactHelmet.Helmet>
                <div className="wrapper">
                    <div className="header">
                        <Navbar />
                        <div className="title-wrapper">
                            <h1>
                                <strong><span><span className="ghost-gray">Ghost</span>written</span></strong>
                            </h1>
                            <h2>
                                <span className="ghost-gray">Pay with</span>
                                <MediaQuery maxWidth={399}><br /></MediaQuery>
                                <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
                                <strong>credit card</strong>.
                            </h2>
                            <div className="button-wrapper">
                                <StripeCheckout {...stripeCheckoutProps}>
                                    <button className="shadow">Checkout</button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </div>
                    <div className="page">
                        <div className="main-text">
                            <h1>100% secure</h1>
                            <p>
                                Payments are done through <a href="https://stripe.com">Stripe</a>,
                                an secure, reputable online payments facilitator
                                used by companies such as Amazon, Google, and Lyft.
                            </p>
                            <p>
                                Our team will contact you quickly by email to
                                confirm receipt of any payments for your order.
                            </p>
                        </div>
                        <p className="copyinfo">© 2021 Ghostwritten</p>
                    </div>
                </div >
            </>;
        return element;
    }
}