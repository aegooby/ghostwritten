
import * as React from "react";

import * as Loading from "../../Loading.tsx";

export default function Privacy()
{
    Loading.useFinishLoading();
    const element: React.ReactElement =
        <div className="page">
            <div className="main-text">
                <p>
                    This policy describes our practices for handling
                    information provided by you (the "User") on this website
                    and/or via email communications (the "Services").
                        </p>
                <h1>Collection of Information</h1>
                <p>
                    When you use our Services, we may collect Information
                    containing: email addresses provided through the Services;
                    courses and/or curriculums studied by the User; payment
                    information (credit card or debit card number, purchase
                    amount, date of purchase); user account ID; IP address;
                    time(s) of access to and use of Services.
                        </p>
                <p>
                    Ghostwritten will not collect personally identifying
                    Information of Users such as, but not limited to, full
                    legal names, addresses, or government identification.
                    If provided by the User intentionally through use of
                    the Services, personanlly identifying Information may
                    be stored as part of communications through the Services.
                    By placing personal information into communications with
                    us through the Services, the User agrees to allow this
                    information to be stored as per above.
                        </p>
                <h1>Use of Information</h1>
                <p>
                    Information that you provide to us is used to improve
                    our Services, through analysis of user traffic and
                    financial data; for fulfillment of requsets made by
                    the User to complete the tasks requested by them and
                    as agreed to by Ghostwritten.
                        </p>
                <h1>Sharing of Information</h1>
                <p>
                    Information collected by Ghostwritten relevant to the
                    User may be shared in circumstances of: service provisions
                    to the User as agreed to by the User and Ghostwritten by
                    affiliate entities and/or service providers including
                    but not limited to Writers, Contractors, and Customer
                    Service Representatives; legal entities including but
                    not limited to court ourders, law enforcement requests,
                    and subpoenas to protect the interests and security of
                    Ghostwritten, our affiliates, owners, or users.
                        </p>
                <p>
                    Ghostwritten will not share personally identifying
                    Information as of Users such as, but not limited to,
                    full legal names, addresses, or government identification
                    with any third party, unless the User provides personally
                    identifying Information as part of their communications
                    with Ghostwritten through our Services. By providing
                    personally identifying Information, the User agress to
                    its use as above.
                        </p>
                <h1>Security</h1>
                <p>
                    We take measures to protect your Information through
                    our Services, such as encrypted connections and secure
                    payment services. Ghostwritten cannot guarantee perfect
                    security of Information collected or shared, and any
                    Information shared by the User is done at their own risk.
                    Any Information shared with third parties and collected
                    by them is subject to their own Privacy Policies and
                    may not abide by the measures here.
                        </p>
                <h1>Retention</h1>
                <p>
                    We reserve the right to retain for any period of time
                    in perpetuity, or discard at any time, Information
                    collected on the User.
                        </p>
                <h1>Children Under the Age of 13</h1>
                <p>
                    We do not knowingly collect any Information on children
                    under the Age of 13 unless permitted by law. By using
                    the Services, users hence affirm that they are over the
                    Age of 13 unless otherwise permitted by law. Upon
                    receipt of notice, any information collected by Ghostwritten
                    through the Services on children under the Age of 13
                    will be removed as soon as possible.
                        </p>
            </div>
        </div>;
    return element;
}
