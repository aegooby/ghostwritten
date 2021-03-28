
import * as React from "https://esm.sh/react";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import * as Formik from "https://cdn.skypack.dev/formik";
import MediaQuery from "https://esm.sh/react-responsive";

import Navbar from "../Navbar.tsx";

type EssayType = "unknown" | "highschool" | "college";

interface Props
{
    referral: string | undefined;
}

interface State
{
    essayType: EssayType;
    details: string;
    email: string;
    referral: string;
}

type TargetExtend = EventTarget & HTMLTextAreaElement;
interface Target extends TargetExtend
{
    value: unknown;
}

export default function OrderForm(props: Props)
{
    const [essayType, setEssayType] = React.useState("unknown" as EssayType);
    const [details, setDetails] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [referral, setReferral] = React.useState(props.referral ?? "");

    function onSubmit(event: React.FormEvent<HTMLFormElement>): void
    {
        event.preventDefault();
    }

    const complete = essayType !== "unknown" && details !== "" && email !== "";
    const element =
        <>
            <ReactHelmet.Helmet>
                <title>Ghostwritten | Order</title>
            </ReactHelmet.Helmet>
            <div className="wrapper">
                <div className="header">
                    <Navbar />
                    <div className="title-wrapper">
                        <h1>
                            <strong><span><span className="ghost-gray">Ghost</span>written</span></strong>
                        </h1>
                        <h2>
                            <span className="ghost-gray">Select</span>
                            <MediaQuery maxWidth={399}><br /></MediaQuery>
                            <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
                                your essay.
                            </h2>
                    </div>
                </div>
                <div className="page">
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
                    </div>
                    <p className="copyinfo">© 2021 Ghostwritten</p>
                </div>
            </div >
        </>;

    return element;
}
