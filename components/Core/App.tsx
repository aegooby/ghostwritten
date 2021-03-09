
import * as React from "react";

import Index from "../Pages/Index.tsx";
import Order from "../Pages/Order.tsx";
import * as UIRouter from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/components/Core/Router/UIRouter.tsx";

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
