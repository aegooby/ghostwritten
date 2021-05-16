
import * as React from "react";

import * as Loading from "../../Loading.tsx";

export default function Terms()
{
    Loading.useFinishLoading();
    const element: React.ReactElement =
        <div className="page">
            <div className="main-text">
                <h1>Definitions</h1>
                <p>
                    "Work" will refer to any works created by Ghostwritten
                    or affiliates, including but not limited to Writers and
                    Contractors, to be given to you, the "User", as requested
                    by the User and agreed to by Ghostwritten and delivered
                    as such, including, but not limited to, essays, worked
                    solutions, and/or films.
        </p>
                <p>
                    The "Service" will refer to all Ghostwritten services:
                    the website, communications with Ghostwritten, intellectual
                    property of Ghostwritten, and any technological services
                    offered and operated by Ghostwritten, such as APIs.
        </p>
                <p>
                    The "Terms" will refer to the clauses and details listed
                    in this document — in their entirety — governing the use
                    of the Service.
        </p>
                <p>
                    "Agreement" will refer to an agreement reached between
                    Ghostwritten and the User detailing the nature and details
                    of the Work, when it should be completed, and the price it
                    will incur upon the User, to the satisfaction of both
                    Ghostwritten and the User at the time of Agreement.
        </p>
                <h1>Consent to Terms</h1>
                <p>
                    The Service is offered to the User subject to their acceptance
                    of the Terms in their entirety. By using the Service in any
                    capacity, the User agrees to be bound by the Terms as written.
                    If the user does not consent to the Terms, they may not use
                    the Service in any capacity.
        </p>
                <h1>Making an Agreement</h1>
                <p>
                    Upon placement of an order via the designated page(s)
                    or otherwise designated features of the Service, including
                    email communications with Ghostwritten, the User has initiated
                    a Request for a potential Work to be completed by us.
                    Once details are discussed as needed, both we and the User
                    provide affirmative confirmation of an Agreement regarding
                    the Work. Once an Agreement has been reached, it is binding,
                    and the User is required to make the payment defined by the
                    latest mutually confirmed Agreement between us and the User
                    so that we begin creating the Work. We are not obliged to
                    begin the creation of any Work for which we have not received
                    the payment as per the Agreement.
        </p>
                <p>
                    It is the User's sole responsibility to provide complete,
                    detailed information regarding the Work and its completion.
                    Ghostwritten is only required to complete the Work as
                    specified in the Agreement once payment is received by us
                    and confirmed.
        </p>
                <p>
                    Once an Agreement is made, it cannot be reversed or changed
                    unless a new Agreement is made to supersede it with the mutual
                    consent of both Ghostwritten and the User. Once payment is
                    received for a Work as per an Agreement, the payment will
                    not be refunded without the mutual consent of Ghostwritten
                    and the User, through a new Agreement regarding the Work
                    or any other form of affirmative mutual consent between
                    the two parties.
        </p>
                <h1>Discounts</h1>
                <p>
                    We reserve the right to offer discounts at any rate and
                    with any structure to the User, whether through a referral
                    code or through any other mechanisms.
        </p>
                <h1>Right to Cancellation of Agreement</h1>
                <p>
                    At any time, and for any reason, we reserve the right to
                    unilaterally cancel an Agreement with the User, and
                    cancel the completion of any Work specified in the Agreement.
                    Upon cancellation, we guarantee the User a refund opportunity.
                    If the User does not agree within a period of 30 days to take
                    the refund from first delivrance of the opportunity, they have
                    agreed to forfeit it.
        </p>
                <h1>Delivery of Work</h1>
                <p>
                    We are responsible for timely delivery of the Work as
                    specified by the Agreement. If the Work is delivered
                    after the deadline, we guarantee the User a refund opportunity.
                    If the User does not agree within a period of 30 days to take
                    the refund from first delivrance of the opportunity, they have
                    agreed to forfeit it.
        </p>
                <p>
                    It is the User's sole responsibility when selecting a
                    deadline to ensure it is appropriate for them. We reserve
                    the right to deliver the Work at any point in time up to and
                    including the exact deadline date, hour, minute, and second
                    specified in the Agreement.
        </p>
                <h1>Licensing and Intellectual Property of Work</h1>
                <p>
                    Any Work created by us is the intellectual property and copyright
                    of Ghostwritten, exclusively. Upon reaching an Agreement
                    specifying the Work, by making payment for and receiving
                    the Work, the User is licensed to use the Work under the
                    following terms:
        </p>
                <p>
                    Under the license, the User is permitted to use the Work
                    for personal, non-commercial purposes only. The User may
                    not modify, reproduce, distribute, or display the Work in
                    any capacity without explicit written permission from
                    Ghoswtrwitten.
        </p>
                <p>
                    We reserve the right, at any time, and for any reason,
                    to unilaterally revoke the license, rendering the User
                    barred from any use of the Work whatsoever.
        </p>
                <h1>Limitation of Liability</h1>
                <p>
                    Any Work produced by us is licensed only for personal use.
                    Violations of this by any User, such as plagiarism, fraud,
                    deception, academic dishonesty, or any actions otherwise
                    breaking the law or the policy of anyone with whom the User
                    interacts using the Work, are the sole responsibility of the
                    User alone.
        </p>
                <p>
                    Ghostwritten is not responsible for and does not condone
                    any illegal or policy-breaking actions and/or uses of the
                    Work committed by the User.
        </p>
                <p>
                    The User will not hold Ghostwritten or its affiliates liable
                    for any losses, damages, actions, claims, or rights of any
                    kind resulting from circumstances including but not limited to:
                    technological malfunctions or bugs, hardware or software;
                    unread, unreceived, or undelivered electronic communications;
                    any circumstances beyond our control causing the Work to be
                    rendered incomplete or delayed; any injuries or losses
                    arising from general use of the Service.
        </p>
                <p>
                    Likewise, the User will not hold Ghostwritten or its affiliates
                    liable for any claims, damages, or injuries brought against
                    the User relating to the Work, their use of the Service, or
                    Ghostwritten as a whole.
        </p>
                <h1>Termination of Service</h1>
                <p>
                    We reserve the right to unilaterally terminate the right
                    of any User to use of the Service in all capacities at
                    our discretion, for any reason, at any time.
        </p>
                <h1>Amendment of Terms</h1>
                <p>
                    We reserve the right to unilaterally amend these Terms
                    at any point in time, for any reason. Immediately upon
                    amendment, any further use of the Service by the User
                    renders them bound and consenting to the amended Terms.
        </p>
            </div>
        </div>;
    return element;
}
