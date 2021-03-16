
import * as React from "https://esm.sh/react";
import * as client from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/client/client.tsx";

import App from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/components/Core/App.tsx";
import Index from "../components/Pages/Index.tsx";
import Order from "../components/Pages/Order.tsx";

try
{
    const clientAttributes =
    {
        api: "https://localhost/graphql"
    };
    const httpclient = new client.Client(clientAttributes);
    httpclient.hydrate(<App routes={{ "/": <Index />, "/test": <Order /> }} fetch={httpclient.fetch} />);
}
catch (error)
{
    client.Console.log(error);
}