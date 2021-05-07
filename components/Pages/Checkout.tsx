
import * as React from "react";

import { GraphQL } from "../Core/Core.tsx";
import graphql from "../../graphql/graphql.tsx";
import Footer from "../Footer.tsx";
import Header from "../Header.tsx";
import Page from "../Page.tsx";

let Stripe: typeof import("@stripe/stripe-js") | undefined = undefined;
const stripeKey = "pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVjhk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm";

interface Value
{
    value: string;
}

export default function Checkout()
{
    const client = GraphQL.useClient();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (!client) return;
        if (!Stripe)
        {
            Stripe = await import("@stripe/stripe-js");
            await Stripe.loadStripe(stripeKey);
        }
    }
    const content: React.ReactElement =
        <div className="wrapper">
            <Header
                h2Gray="Pay with"
                h2Black={<><strong>credit</strong> or <strong>debit</strong>.</>}
                button={<button className="button shadow">Checkout</button>}
                responsive
            />
            <div className="page">
                <div className="main-text">
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