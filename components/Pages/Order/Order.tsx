
import * as React from "https://esm.sh/react";
import * as ReactRouter from "https://esm.sh/react-router-dom";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import MediaQuery from "https://esm.sh/react-responsive";

import { GraphQL, Console } from "../../App.tsx";
import Form from "./Form.tsx";
import Success from "./Success.tsx";
import Failure from "./Failure.tsx";
import Navbar from "../../Navbar.tsx";

enum Status
{
    form,
    loading,
    success,
    failure,
    error,
}

interface HeaderProps
{
    responsive?: boolean;
    gray: React.ReactElement | string;
    black: React.ReactElement | string;
}

function Header(props: HeaderProps)
{
    const element =
        <h2>
            <span className="ghost-gray">{props.gray}</span>
            {
                props.responsive ?
                    <>
                        <MediaQuery maxWidth={399}><br /></MediaQuery>
                        <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
                    </> :
                    <>&nbsp;</>
            }
            <span>{props.black}</span>
        </h2>;
    return element;
}

function Loading()
{
    const element =
        <div className="lds-ring-wrapper">
            <div className="lds-ring">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>;
    return element;
}

interface Props
{
    referral: string | undefined;
}

export default function Order(props: Props)
{
    const [status, setStatus] = React.useState(Status.form);

    const client = GraphQL.useClient();

    let header: React.ReactElement = <></>;
    let body: React.ReactElement = <></>;

    function onSubmit(mutations: string[])
    {
        type EmailResult = Record<string, Record<string, Record<string, boolean>>>;

        if (!client) return;

        const fetches: Promise<Record<string, unknown>>[] =
            mutations.map(function (mutation) { return client.fetch({ query: mutation }); });
        const promises = Promise.all(fetches);
        setStatus(Status.loading);
        function checkError(response: Record<string, unknown>)
        {
            if (response.errors) 
            {
                Console.error(JSON.stringify(response));
                throw new Error();
            }
        }
        async function _(): Promise<void>
        {
            const responses = await promises;
            try { responses.forEach(checkError); }
            catch (error) 
            {
                setStatus(Status.error);
                return;
            }

            const dataResponses = responses as EmailResult[];
            const successes =
                dataResponses.map(function (response) { return response.data.sendEmail.success; });
            const success = successes.reduce(function (__a, __b) { return __a && __b; });
            success ? setStatus(Status.success) : setStatus(Status.failure);
        }
        _();
    }

    switch (status)
    {
        case Status.loading:
            header = <Header gray={"Loading..."} black={<></>} />;
            body = <Loading />;
            break;
        case Status.form:
            header = <Header gray={"Select"} black={"your essay."} />;
            body = <Form referral={props.referral} onSubmit={onSubmit} />;
            break;
        case Status.success:
            header = <Header gray={"Order"} black={<><strong>confirmed</strong>.</>} />;
            body = <Success />;
            break;
        case Status.failure:
            header = <Header gray={"Order"} black={<><strong>failed!</strong></>} />;
            body = <Failure />;
            break;
        case Status.error:
            return <ReactRouter.Redirect to="/error" />;
    }

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
                        {header}
                    </div>
                </div>
                <div className="page">
                    {body}
                    <p className="copyinfo">© 2021 Ghostwritten</p>
                </div>
            </div >
        </>;
    return element;
}
