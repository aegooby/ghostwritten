
import * as React from "react";
import * as ReactRouter from "react-router-dom";

import { GraphQL, Console } from "../../components/Core/Core.tsx";
const Form = React.lazy(() => import("./Lazy/Order/Form.tsx"));
const Success = React.lazy(() => import("./Lazy/Order/Success.tsx"));
const Failure = React.lazy(() => import("./Lazy/Order/Failure.tsx"));
import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import Loading from "../Loading.tsx";
import Page from "../Page.tsx";

enum Status
{
    form,
    loading,
    success,
    failure,
    error,
}

interface Props
{
    referral?: string | undefined;
}

export default function Order(props: Props)
{
    const [status, setStatus] = React.useState(Status.form);

    const client = GraphQL.useClient();

    function onSubmit(mutations: GraphQL.Query[])
    {
        type EmailResult = Record<string, Record<string, Record<string, boolean>>>;

        if (!client) return;

        const fetches: Promise<Record<string, unknown>>[] =
            mutations.map(function (mutation) { return client.fetch(mutation); });
        const promises = Promise.all(fetches);
        setStatus(Status.loading);
        function checkError(response: Record<string, unknown>)
        {
            if (response.errors) 
            {
                Console.error(response);
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
            {
                const content: React.ReactElement =
                    <div className="wrapper">
                        <Header h2Gray={"Loading..."} h2Black={<></>} />
                        <div className="page">
                            <Loading />
                        </div>
                        <Footer />
                    </div >;
                return <Page helmet={<title>Ghostwritten | Order</title>} content={content} lazy />;
            }
        case Status.form:
            {
                const content =
                    <>
                        <div className="page">
                            <Form referral={props.referral} onSubmit={onSubmit} />
                        </div>
                        <Footer />
                    </>;
                const element: React.ReactElement =
                    <div className="wrapper">
                        <Header h2Gray={"Select"} h2Black={"your essay."} />
                        <Page helmet={<title>Ghostwritten | Order</title>} content={content} lazy />
                    </div >;
                return element;
            }
        case Status.success:
            {
                const content: React.ReactElement =
                    <div className="wrapper">
                        <Header h2Gray={"Order"} h2Black={<><strong>confirmed</strong>.</>} />
                        <div className="page">
                            <Success />
                        </div>
                        <Footer />
                    </div >;
                return <Page helmet={<title>Ghostwritten | Order</title>} content={content} lazy />;
            }
        case Status.failure:
            {
                const content: React.ReactElement =
                    <div className="wrapper">
                        <Header h2Gray={"Order"} h2Black={<><strong>failed!</strong></>} />
                        <div className="page">
                            <Failure />
                        </div>
                        <Footer />
                    </div >;
                return <Page helmet={<title>Ghostwritten | Order</title>} content={content} lazy />;
            }
        case Status.error:
            return <ReactRouter.Navigate to="/internalerror" />;
    }
}
