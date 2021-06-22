
import * as React from "react";
import * as ReactRouter from "react-router-dom";

import { GraphQL } from "../../../Core/Core.tsx";
import graphql from "../../../../graphql/graphql.tsx";
import * as Loading from "../../../Loading.tsx";

type ServiceType = "unknown" | "tutoring" | "essay";

interface Props
{
    referral: string | undefined;
    onSubmit: (mutations: GraphQL.Query[]) => Promise<void> | void;
}

interface Value
{
    value: string;
}

export default function Form(props: Props)
{
    Loading.useFinishLoading();
    const [serviceType, setServiceType] = React.useState("unknown" as ServiceType);
    const [details, setDetails] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [referral, setReferral] = React.useState(props.referral ?? "");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void>
    {
        event.preventDefault();

        const query =
            graphql`mutation SendEmail($email: Email){ sendEmail(email: $email) { success } }`;

        const referralText = referral === "" ?
            `No referral code` :
            `Referral code: ${referral}`;
        const referralHtml = referral === "" ?
            `<p><strong>No referral code</strong></p>` :
            `<p></strong>Referral code</strong></p><p>${referral}</p>`;
        const gwText = `Details: ${details} * ${referralText}`;
        const detailsSplit = details.split("\n");
        const detailsHtml = detailsSplit.map(function (value: string) { return `<p>${value}</p>`; });
        const detailsJoined = detailsHtml.reduce(function (prev: string, next: string) { return prev + next; });
        const gwHtml = `<p><strong>Details</strong></p><p>${detailsJoined}</p>${referralHtml}`;

        const gwMutation: GraphQL.Query =
        {
            query: query,
            variables:
            {
                "email":
                {
                    "from": `noreply@ghostwritten.me`,
                    "to": `ghostwrittenhq@gmail.com`,
                    "replyTo": email,
                    "subject": `Request for ${serviceType} from <${email}>`,
                    "text": gwText,
                    "html": gwHtml,
                }
            }
        };

        const clientText = `Hello, and thanks for choosing Ghostwritten! ` +
            `This is a confirmation email to let you know that we have ` +
            `received your request. You will be hearing from us shortly.`;
        const clientHtml = `<p>Hello,</p><p>Thanks for choosing Ghostwritten!` +
            ` This is a is a confirmation email to let you know that we have ` +
            `received your request. You will be hearing from us shortly.</p>`;

        const clientMutation: GraphQL.Query =
        {
            query: query,
            variables:
            {
                "email":
                {
                    "from": `noreply@ghostwritten.me`,
                    "to": `${email}`,
                    "subject": `We've received your request!`,
                    "text": clientText,
                    "html": clientHtml,
                }
            }
        };

        return await props.onSubmit([gwMutation, clientMutation]);
    }

    const complete = serviceType !== "unknown" && details !== "" && email !== "";

    const element =
        <div className="form-wrapper">
            <form className="order" onSubmit={onSubmit}>
                <h1><strong>Service</strong><span className="info required">(required)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="radio" id="radio-tutoring" name="essay-type" required
                        onChange={function () { setServiceType("tutoring"); }}
                    />
                    <label className="radio" htmlFor="radio-tutoring">Tutoring</label>
                    <input
                        type="radio" id="radio-essay" name="essay-type" required
                        onChange={function () { setServiceType("essay"); }}
                    />
                    <label className="radio" htmlFor="radio-essay">Essay</label>
                </div>
                <h1><strong>Details</strong><span className="info required">(required)</span></h1>
                <div className="form-item-wrapper">
                    <textarea
                        wrap="soft" name="details" required
                        placeholder="Enter details here..."
                        value={details}
                        onChange={function (event) { setDetails((event.target as (typeof event.target & Value)).value); }}
                    />
                </div>
                <h1><strong>Email</strong><span className="info required">(required)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="email" name="email" required
                        placeholder="email@example.com"
                        onChange={function (event) { setEmail((event.target as (typeof event.target & Value)).value.trim()); }}
                    />
                </div>
                <h1><strong>Referral code</strong><span className="info">(optional)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="referral" name="referral"
                        value={props.referral ?? referral}
                        placeholder={"Enter a valid referral code for 5% off!"}
                        disabled={props.referral ? true : undefined}
                        onChange={function (event) { setReferral((event.target as (typeof event.target & Value)).value.trim()); }}
                    />
                </div>
                <div className="form-item-wrapper">
                    <div className="terms-item-wrapper">
                        <span className="terms-text">By confirming, you agree to the <ReactRouter.Link to="/terms">Terms of Service</ReactRouter.Link></span>
                    </div>
                </div>
                <div className="form-item-wrapper">
                    <input type="submit" value="Confirm"
                        className={"button" + (complete ? " shadow" : "")}
                    />
                </div>
            </form>
        </div>;
    return element;
}
