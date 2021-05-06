
import * as React from "react";

import * as Loading from "../../../Loading.tsx";

export default function Success()
{
    Loading.useFinishLoading();
    const element =
        <div className="main-text">
            <h1>We've received your order</h1>
            <p>
                You should receive a confirmation email from us very shortly.
                Make sure to check your junk and spam folders regularly so you
                don't miss it! In the meantime, sit back, relax, and let our
                writers do the rest.
            </p>
        </div>;
    return element;
}
