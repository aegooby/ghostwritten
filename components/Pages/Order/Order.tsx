
import * as React from "https://esm.sh/react";
import * as ReactHelmet from "https://esm.sh/react-helmet";
import MediaQuery from "https://esm.sh/react-responsive";

import { GraphQL } from "../../App.tsx";
import Form from "./Form.tsx";
import Success from "./Success.tsx";
import Failure from "./Failure.tsx";
import Navbar from "../../Navbar.tsx";

enum Status
{
    unknown,
    loading,
    success,
    failure
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
    const [status, setStatus] = React.useState(Status.unknown);

    const client = GraphQL.useClient();

    let header: React.ReactElement = <></>;
    let body: React.ReactElement = <></>;

    function onSubmit(mutation: string)
    {
        if (!client) return;
        const promise = client.fetch({ query: mutation });
        setStatus(Status.loading);
        async function _()
        {
            const response = await promise as Record<string, Record<string, Record<string, boolean>>>;
            const success = response.data.sendEmail.success;
            success ? setStatus(Status.success) : setStatus(Status.failure);
        }
        _();
    }

    switch (status)
    {
        case Status.success:
            header = <Header gray={"Order"} black={<><strong>confirmed</strong>.</>} />;
            body = <Success />;
            break;
        case Status.failure:
            header = <Header gray={"Order"} black={<><strong>failed!</strong></>} />;
            body = <Failure />;
            break;
        case Status.loading:
            header = <Header gray={"Loading..."} black={<></>} />;
            body = <Loading />;
            break;
        default:
            header = <Header gray={"Select"} black={"your essay."} />;
            body = <Form referral={props.referral} onSubmit={onSubmit} />;
            break;
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
