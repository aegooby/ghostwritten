
import * as React from "https://esm.sh/react";
import * as client from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/client/client.tsx";

import App from "../components/Core/App.tsx";

try
{
    const httpclient = new client.Client();
    httpclient.hydrate(<App />);
}
catch (error)
{
    client.Console.log(error);
}