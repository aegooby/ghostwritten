
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";

import * as client from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/client/client.tsx";

import App from "../components/App.tsx";

try
{
    const clientAttributes =
    {
        api: "https://localhost:8443/graphql"
    };
    const httpclient = new client.Client(clientAttributes);
    const element: React.ReactElement =
        <ReactRouter.BrowserRouter>
            <App fetch={httpclient.fetch} />
        </ReactRouter.BrowserRouter>;
    httpclient.hydrate(element);
}
catch (error) { client.Console.error(error); }