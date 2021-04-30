import * as React from "react";
import * as ReactRouter from "react-router-dom";

import { GraphQL } from "./Core/Core.tsx";

import Index from "./Pages/Index.tsx";
import Support from "./Pages/Support.tsx";
import Order from "./Pages/Order.tsx";
import Checkout from "./Pages/Checkout.tsx";
import Error from "./Pages/Error.tsx";

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
                <ReactRouter.Route path="/support" element={<Support />} />
                <ReactRouter.Route path="/referral/ptembo" element={<Order referral="ptembo" />} />
                <ReactRouter.Route path="/referral/yqassem" element={<Order referral="yqassem" />} />
                <ReactRouter.Route path="/referral/wmohammed" element={<Order referral="wmohammed" />} />
                <ReactRouter.Route path="/referral/nshehaby" element={<Order referral="nshehaby" />} />
                <ReactRouter.Route path="/order" element={<Order />} />
                <ReactRouter.Route path="/checkout" element={<Checkout />} />
                <ReactRouter.Route path="*" element={<Error code={404} text="Not Found" />} />
            </ReactRouter.Routes>
        </GraphQL.Provider>;
    return element;
}
