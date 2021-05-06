
import * as React from "react";
import nprogress from "nprogress";

import { throwOnClient } from "./Core/Core.tsx";

export function useStartLoading()
{
    try { throwOnClient(); }
    catch
    {
        if (!nprogress.isStarted())
            nprogress.start();
    }
}
export function useFinishLoading()
{
    try { throwOnClient(); }
    catch
    {
        if (nprogress.isStarted())
            nprogress.done();
    }
}


interface Props
{
    size?: string | undefined;
}

export function Spinner(props: Props)
{
    const element =
        <div className="load-spinner-wrapper">
            <div className="load-spinner">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
        </div>;
    return element;
}
