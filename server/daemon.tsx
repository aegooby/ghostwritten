
import * as server from "httpsaurus/server";

import App from "../components/App.tsx";

import * as yargs from "yargs";
import * as dotenv from "dotenv";

import * as sendgrid from "sendgrid";
// @deno-types="https://raw.githubusercontent.com/aegooby/types/master/stripe/index.d.ts";
import Stripe from "stripe";

const args = yargs.default(Deno.args)
    .usage("usage: $0 server/daemon.tsx --hostname <host> [--domain <name>] [--tls <path>]")
    .hide("help")
    .hide("version")
    .hide("hostname")
    .demandOption(["hostname"])
    .parse();

const env = dotenv.config();
// const stripeConfig =
// {
//     apiVersion: "2020-08-27" as const,
//     typescript: true as const,
//     protocol: "https" as const
// };
// const stripe = new Stripe(env.STRIPE_TEST_KEY, stripeConfig);

export interface Email
{
    from: string;
    to: string[];
    subject: string | undefined;
    text: string | undefined;
    html: string | undefined;
}
export interface EmailResult
{
    success: boolean;
    errors: string[] | undefined;
}

export class Resolvers
{
    private sendgridKey: string;
    constructor(env: Record<string, string>)
    {
        this.sendgridKey = env.SENDGRID_KEY;
    }
    public request(): string
    {
        return "response";
    }
    public async sendEmail({ email }: { email: Email; }): Promise<EmailResult>
    {
        const to: { email: string; }[] = email.to.map(function (recipient) { return { email: recipient }; });
        email.text ?? (email.text = "(no body)");
        email.html ?? (email.html = email.text);
        const mail: sendgrid.IRequestBody =
        {
            from: { email: email.from },
            personalizations: [{ subject: email.subject ?? "(no subject)", to: to }],
            content:
                [
                    { type: "text/plain", value: email.text },
                    { type: "text/html", value: email.html },
                ]
        };
        const result = await sendgrid.sendMail(mail, { apiKey: this.sendgridKey });
        return { success: result.success, errors: result.errors };
    }
}

try
{
    const serverAttributes =
    {
        protocol: args.tls ? "https" as const : "http" as const,
        domain: args.domain,
        routes:
        {
            "/favicon.ico": "/static/favicon.ico",
            "/robots.txt": "/static/robots.txt",
        },
        hostname: args.hostname,
        httpPort: 8080,

        httpsPort: 8443,
        cert: args.tls,

        App: App,

        schema: "graphql/schema.gql",
        resolvers: new Resolvers(env)
    };
    const httpserver = new server.Server(serverAttributes);
    await httpserver.serve();
}
catch (error)
{
    server.Console.error(error);
    Deno.exit(1);
}