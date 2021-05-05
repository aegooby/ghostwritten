
import * as React from "react";

// import { Token, StripeCheckoutProps } from "https://esm.sh/react-stripe-checkout";
// import StripeCheckout from "https://cdn.skypack.dev/react-stripe-checkout";

import { GraphQL, throwOnClient } from "../Core/Core.tsx";
import Footer from "../Footer.tsx";
import Header from "../Header.tsx";
import Page from "../Page.tsx";

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
        try { throwOnClient(); }
        catch
        {
            const Stripe = await import("@stripe/stripe-js");
            await Stripe.loadStripe("pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVjhk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm");
        }
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
    const content: React.ReactElement =
        <div className="wrapper">
            <Header
                h2Gray="Pay with"
                h2Black={<><strong>credit</strong> or <strong>debit</strong>.</>}
                responsive
            />
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
            </div>
            <Footer />
        </div >;
    return <Page helmet={<title>Ghostwritten | Checkout</title>} content={content} />;
}