import * as React from "react";
import * as ReactRouter from "react-router-dom";

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
            <ReactRouter.Routes>
                <ReactRouter.Route path="/" element={<Index />} />
                <ReactRouter.Route path="/referral/ptembo" element={<Order referral="ptembo" />} />
                <ReactRouter.Route path="/referral/yqassem" element={<Order referral="yqassem" />} />
                <ReactRouter.Route path="/referral/wmohammed" element={<Order referral="wmohammed" />} />
                <ReactRouter.Route path="/referral/nshehaby" element={<Order referral="nshehaby" />} />
                <ReactRouter.Route path="/order" element={<Order referral={undefined} />} />
                <ReactRouter.Route path="/checkout" element={<Checkout />} />
                <ReactRouter.Route path="/internalerror" element={<InternalError />} />
                <ReactRouter.Route path="*" element={<NotFound />} />
            </ReactRouter.Routes>
        </GraphQL.Provider>;
    return element;
}
