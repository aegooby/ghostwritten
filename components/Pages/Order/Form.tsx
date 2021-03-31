
import * as React from "https://esm.sh/react";

import { GraphQL, Console } from "../../App.tsx";

type EssayType = "unknown" | "highschool" | "college";

interface Props
{
    referral: string | undefined;
    onSubmit: (mutations: GraphQL.Query[]) => Promise<void> | void;
}

type TargetExtend = EventTarget & HTMLTextAreaElement;
interface Target extends TargetExtend
{
    value: unknown;
}

export default function Form(props: Props)
{
    const [essayType, setEssayType] = React.useState("unknown" as EssayType);
    const [details, setDetails] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [referral, setReferral] = React.useState(props.referral ?? "");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void>
    {
        event.preventDefault();

        const query =
            `
                mutation SendEmail($email: Email)
                { sendEmail(email: $email) { success } }
            `;

        const referralText = referral === "" ?
            `No referral code` :
            `Referral code: ${referral}`;
        const referralHtml = referral === "" ?
            `<h1></strong>No referral code</strong></h1>` :
            `<h1></strong>Referral code</strong></h1><p>${referral}</p>`;
        const gwText = `Details: ${details} * ${referralText}`;
        const gwHtml = `<h1><strong>Details</strong></h1><p>${details}</p>${referralHtml}`;

        const gwMutation: GraphQL.Query =
        {
            query: query,
            variables:
            {
                "email":
                {
                    "from": `noreply@ghostwritten.me`,
                    "to": `ghostwrittenhq@gmail.com`,
                    "subject": `Request for ${essayType} essay from <${email}>`,
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

    const complete = essayType !== "unknown" && details !== "" && email !== "";

    const element =
        <div className="form-wrapper">
            <form className="order" onSubmit={onSubmit}>
                <h1><strong>Essay type</strong><span className="info">(required)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="radio" id="radio-highschool" name="essay-type" required
                        onChange={function () { setEssayType("highschool"); }}
                    />
                    <label htmlFor="radio-highschool">High School<br /> Level</label>
                    <input
                        type="radio" id="radio-college" name="essay-type" required
                        onChange={function () { setEssayType("college"); }}
                    />
                    <label htmlFor="radio-college">College<br /> Level</label>
                </div>
                <h1><strong>Details</strong><span className="info">(required)</span></h1>
                <div className="form-item-wrapper">
                    <textarea
                        wrap="soft" name="details" required
                        placeholder="Enter details here..."
                        value={details}
                        onChange={function (event) { setDetails((event.target as Target).value as string); }}
                    />
                </div>
                <h1><strong>Email</strong><span className="info">(required)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="email" name="email" required
                        placeholder="someone@example.com"
                        onChange={function (event) { setEmail(((event.target as Target).value as string).trim()); }}
                    />
                </div>
                <h1><strong>Referral code</strong><span className="info">(optional)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="referral" name="referral"
                        value={props.referral ?? referral}
                        placeholder={"Enter a valid referral code for 5% off!"}
                        disabled={props.referral ? true : undefined}
                        onChange={function (event) { setReferral(((event.target as Target).value as string).trim()); }}
                    />
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
