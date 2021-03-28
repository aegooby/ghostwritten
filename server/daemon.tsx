
import * as server from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/server/server.tsx";

import App from "../components/App.tsx";

import * as React from "https://esm.sh/react";
import * as yargs from "https://deno.land/x/yargs/deno.ts";
import * as dotenv from "https://deno.land/x/dotenv/mod.ts";

// @deno-types="https://raw.githubusercontent.com/aegooby/types/master/stripe/index.d.ts";
import Stripe from "https://jspm.dev/stripe";

import * as resolvers from "./resolvers.tsx";

const args = yargs.default(Deno.args)
    .usage("usage: $0 server/daemon.tsx --hostname <host> [--domain <name>] [--tls <path>]")
    .hide("help")
    .hide("version")
    .hide("hostname")
    .demandOption(["hostname"])
    .parse();

try
{
    const env = dotenv.config();
    const config =
    {
        apiVersion: "2020-08-27",
        typescript: true,
        protocol: "https" as const
    };
    const stripe = new Stripe(env.STRIPE_TEST_KEY, config);

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

        App: <App client={undefined} />,

        schema: "graphql/schema.gql",
        resolvers: new resolvers.Resolvers(env)
    };
    const httpserver = new server.Server(serverAttributes);
    await httpserver.serve();
}
catch (error)
{
    server.Console.error(error.toString());
    Deno.exit(1);
}