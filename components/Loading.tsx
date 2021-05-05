
import * as React from "react";

interface Props
{
    size?: string | undefined;
}

export default function Loading(props: Props)
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
