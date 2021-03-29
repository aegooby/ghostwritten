
import * as React from "https://esm.sh/react";

export default function Failure()
{
    const element =
        <div className="main-text">
            <h1>This shouldn't have happened</h1>
            <p>
                It seems like we've had trouble receiving your request at our
                servers. Try reloading the page and checking your internet
                connection.
            </p>
            <p>
                If the issue persists, send us an email
                at <a href="mailto:ghostwrittenhq@gmail.com">ghostwrittenhq@gmail.com</a> and
                our support team will do our best to help you immediately.
            </p>
        </div>;
    return element;
}
