
import * as React from "https://esm.sh/react";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import MediaQuery from "https://esm.sh/react-responsive";

// import { Token, StripeCheckoutProps } from "https://esm.sh/react-stripe-checkout";
// import StripeCheckout from "https://cdn.skypack.dev/react-stripe-checkout";

import { GraphQL, throwOnClient } from "../Core/Core.tsx";
import Navbar from "../Navbar.tsx";

let stripePromise: Promise<Record<string, unknown>> | undefined = undefined;

try { throwOnClient(); }
catch
{
    const Stripe = await import("./stripe-js.prebuilt.bundle.js");
    stripePromise = Stripe.loadStripe("pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVjhk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm");
}

interface Value
{
    value: string;
}

export default function Checkout()
{
    const client = GraphQL.useClient();
    const [amount, setAmount] = React.useState(0);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        const stripe = await stripePromise;
    }

    // const stripeCheckoutProps: StripeCheckoutProps =
    // {
    //     token: (token: Token) => console.log(token),
    //     /** @todo Replace `stripeKey` with live key. */
    //     stripeKey: "pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVjhk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm",
    //     name: "Checkout",
    //     panelLabel: "Pay",
    //     currency: "USD",
    //     amount: 27500,
    //     allowRememberMe: false,
    // };
    const element: React.ReactElement =
        <>
            <ReactHelmet.Helmet>
                <title>Ghostwritten | Checkout</title>
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
                            <strong>credit</strong> or <strong>debit</strong>.
                        </h2>
                    </div>
                </div>
                <div className="page">
                    <div className="main-text">
                        <form className="order" onSubmit={onSubmit}>
                            <div className="form-item-wrapper">
                                <input
                                    type="text" id="amount" name="amount" required
                                    placeholder={"Enter amount to be paid (USD)"}
                                    onChange={function (event) { setAmount(parseInt((event as (typeof event & Value)).value)); }}
                                />
                            </div>
                            <div className="form-item-wrapper">
                                {/* <StripeCheckout onClick={() => ""} {...stripeCheckoutProps}> */}
                                <input type="submit" value="Checkout" className="button shadow" />
                                {/* </StripeCheckout> */}
                            </div>
                        </form>
                        <h1>100% secure</h1>
                        <p>
                            Payments are done through <a href="https://stripe.com">Stripe</a>,
                                a secure, reputable online payments facilitator
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