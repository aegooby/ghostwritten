
import * as React from "react";

export default function Failure()
{
    const email = <a href="mailto:ghostwrittenhq@gmail.com">ghostwrittenhq@gmail.com</a>;
    const element =
        <div className="main-text">
            <h1>This shouldn't have happened</h1>
            <p>
                It seems like we've had trouble processing your request at our
                servers. Make sure you have entered a valid email address,
                or try refreshing the page and checking your internet connection.
            </p>
            <p>
                If the issue persists, send us an email at {email} and
                our support team will do our best to help you immediately.
            </p>
        </div>;
    return element;
}
