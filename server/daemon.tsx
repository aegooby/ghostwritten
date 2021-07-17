
import * as React from "react";
import * as server from "@httpsaurus/server";

import App from "../components/App.tsx";

import * as Oak from "oak";
import * as dotenv from "dotenv";
import * as sendgrid from "sendgrid";
import * as yargs from "@yargs/yargs";

import type { Email, EmailResult, Resolvers } from "./types.d.tsx";

const args = yargs.default(Deno.args)
    .usage("usage: $0 server/daemon.tsx --hostname <host> [--domain <name>] [--tls <path>]")
    .hide("help")
    .hide("version")
    .hide("hostname")
    .demandOption(["hostname"])
    .parse();

const env = dotenv.config();
// env.STRIPE_TEST_KEY

try
{
    const resolvers: Resolvers =
    {
        Query:
        {
            request(_1: unknown, _2: unknown, context: Oak.Context)
            {
                return context.request.url.pathname;
            }
        },
        Mutation:
        {
            async sendEmail(_1: unknown, { email }: { email: Email; }, context: Oak.Context, _2: unknown)
            {
                const to = email.to.map(function (recipient) { return { email: recipient }; });
                email.text ?? (email.text = "(no body)");
                email.html ?? (email.html = email.text);
                const mail: sendgrid.IRequestBody =
                {
                    from: { email: email.from },
                    replyTo: email.replyTo ? { email: email.replyTo } : undefined,
                    personalizations: [{ subject: email.subject ?? "(no subject)", to: to }],
                    content:
                        [
                            { type: "text/plain", value: email.text },
                            { type: "text/html", value: email.html },
                        ]
                };
                const result = await sendgrid.sendMail(mail, { apiKey: env.SENDGRID_KEY });
                const emailResult: EmailResult =
                {
                    success: result.success,
                    errors: result.errors
                };
                return emailResult;
            }
        }
    };
    const serverAttributes: server.ServerAttributes =
    {
        secure: !!args.tls,
        domain: args.domain,
        routes: {},
        hostname: args.hostname,
        port: 3080,

        portTls: 3443,
        cert: args.tls,

        App: <App client={undefined} />,
        headElements:
            [
                <title>Ghostwritten</title>,
                <meta name="description" content="Fast, reliable essays written by skilled writers." />
            ],

        customSchema: "graphql/custom.gql",
        schema: "graphql/schema.gql",
        resolvers: resolvers,
        dgraph: args.dgraph
    };
    const httpserver = new server.Server(serverAttributes);
    await httpserver.serve();
}
catch (error) { server.Console.error(error); }