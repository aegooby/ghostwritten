
import * as React from "react";
import * as Stripe from "stripe";

import Index from "./Pages/Index.tsx";
import Order from "./Pages/Order.tsx";
import * as UIRouter from "./Router/UIRouter.tsx";

/** @todo Integrate. */
const stripeAPIKey = "pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVj" +
    "hk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm";
const stripe = Stripe.loadStripe();

export default class App extends React.Component
{
    routes: Map<string, React.ReactElement> = new Map<string, React.ReactElement>();
    constructor(props: Readonly<unknown>)
    {
        super(props);

        this.routes.set("/", <Index />);
        this.routes.set("/test", <Order />);
    }
    render(): React.ReactElement
    {
        return <UIRouter.Component routes={this.routes} />;
    }
}
