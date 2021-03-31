import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";

import { GraphQL } from "./Core/Core.tsx";

import Index from "./Pages/Index.tsx";
import Order from "./Pages/Order/Order.tsx";
import Checkout from "./Pages/Checkout.tsx";

import InternalError from "./Pages/InternalError.tsx";
import NotFound from "./Pages/NotFound.tsx";

interface Props
{
    client: GraphQL.Client | undefined;
}

export default function App(props: Props)
{
    const element: React.ReactElement =
        <GraphQL.Provider value={props.client}>
            <ReactRouter.Switch>
                <ReactRouter.Route exact path="/">
                    <Index />
                </ReactRouter.Route>
                <ReactRouter.Route exact path="/referral/ptembo">
                    <Order referral="ptembo" />
                </ReactRouter.Route>
                <ReactRouter.Route exact path="/referral/yqassem">
                    <Order referral="yqassem" />
                </ReactRouter.Route>
                <ReactRouter.Route exact path="/referral/wmohammed">
                    <Order referral="wmohammed" />
                </ReactRouter.Route>
                <ReactRouter.Route exact path="/referral/nshehaby">
                    <Order referral="nshehaby" />
                </ReactRouter.Route>
                <ReactRouter.Route exact path="/order">
                    <Order referral={undefined} />
                </ReactRouter.Route>
                <ReactRouter.Route exact path="/checkout">
                    <Checkout />
                </ReactRouter.Route>
                <ReactRouter.Route exact path="/internalerror" component={InternalError} />
                <ReactRouter.Route component={NotFound} />
            </ReactRouter.Switch>
        </GraphQL.Provider>;
    return element;
}
