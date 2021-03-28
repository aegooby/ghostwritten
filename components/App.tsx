import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";


import * as client from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/client/client.tsx";

import Index from "./Pages/Index.tsx";
import OrderForm from "./Pages/OrderForm.tsx";
import NotFound from "./Pages/NotFound.tsx";
import Checkout from "./Pages/Checkout.tsx";

interface Props
{
    client: client.Client | undefined;
}

export default function App(props: Props)
{
    function effect()
    {
        async function __effect()
        {
            if (!props.client)
                return;
            const response = await props.client.fetch({ query: "query{ request }" });
            const data = response.data;
            client.Console.log(JSON.stringify(data));
        }
        __effect();
    }
    React.useEffect(effect);
    const element: React.ReactElement =
        <ReactRouter.Switch>
            <ReactRouter.Route exact path="/">
                <Index />
            </ReactRouter.Route>
            <ReactRouter.Route exact path="/referral/ptembo">
                <OrderForm referral="ptembo" />
            </ReactRouter.Route>
            <ReactRouter.Route exact path="/referral/yqassem">
                <OrderForm referral="yqassem" />
            </ReactRouter.Route>
            <ReactRouter.Route exact path="/referral/wmohammed">
                <OrderForm referral="wmohammed" />
            </ReactRouter.Route>
            <ReactRouter.Route exact path="/referral/nshehaby">
                <OrderForm referral="nshehaby" />
            </ReactRouter.Route>
            <ReactRouter.Route exact path="/order">
                <OrderForm referral={undefined} />
            </ReactRouter.Route>
            <ReactRouter.Route exact path="/checkout">
                <Checkout />
            </ReactRouter.Route>
            <ReactRouter.Route render={function (props) { return <NotFound {...props} />; }} />
        </ReactRouter.Switch>;
    return element;
}
