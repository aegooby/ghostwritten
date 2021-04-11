
import * as server from "httpsaurus/server";
import * as assert from "std/asserts";
import * as delay from "std/delay";

import App from "../components/App.tsx";

try
{
    const tests: Deno.TestDefinition[] =
        [
            {
                name: ": run for 5 seconds (HTTP)",
                async fn(): Promise<void>
                {
                    const serverAttributes: server.ServerAttributes =
                    {
                        protocol: "http" as server.Protocol,
                        domain: undefined,
                        hostname: "localhost",
                        httpPort: 8080,
                        routes:
                        {
                            "/favicon.ico": "/static/favicon.ico",
                            "/robots.txt": "/static/robots.txt",
                        },

                        httpsPort: undefined,
                        cert: undefined,

                        App: App,

                        schema: "graphql/schema.gql",
                        resolvers: { request: function () { return "response"; } },
                    };
                    const httpserver = new server.Server(serverAttributes);
                    const time = delay.delay(5000);
                    const serve = httpserver.serve();
                    await time;
                    httpserver.close();
                    await serve;
                },
                sanitizeOps: false,
                sanitizeResources: false,
            },
            {
                name: ": run for 5 seconds (HTTPS)",
                async fn(): Promise<void>
                {
                    const serverAttributes: server.ServerAttributes =
                    {
                        protocol: "https" as server.Protocol,
                        domain: undefined,
                        hostname: "localhost",
                        httpPort: 8080,
                        routes:
                        {
                            "/favicon.ico": "/static/favicon.ico",
                            "/robots.txt": "/static/robots.txt",
                        },

                        httpsPort: 4430,
                        cert: "cert/localhost",

                        App: App,

                        schema: "graphql/schema.gql",
                        resolvers: { request: function () { return "response"; } },
                    };
                    const httpserver = new server.Server(serverAttributes);
                    const time = delay.delay(5000);
                    const serve = httpserver.serve();
                    await time;
                    httpserver.close();
                    await serve;
                },
                sanitizeOps: false,
                sanitizeResources: false,
            },
            {
                name: ": fetch (HTTP)",
                async fn(): Promise<void>
                {
                    const serverAttributes: server.ServerAttributes =
                    {
                        protocol: "http" as server.Protocol,
                        domain: undefined,
                        hostname: "localhost",
                        httpPort: 8080,
                        routes:
                        {
                            "/favicon.ico": "/static/favicon.ico",
                            "/robots.txt": "/static/robots.txt",
                        },

                        httpsPort: undefined,
                        cert: undefined,

                        App: App,

                        schema: "graphql/schema.gql",
                        resolvers: { request: function () { return "response"; } },
                    };
                    const httpserver = new server.Server(serverAttributes);
                    const complete = httpserver.serve();
                    const response = await fetch("http://localhost:8080/");
                    assert.assert(response.ok);
                    await response.text();
                    httpserver.close();
                    await complete;
                },
                sanitizeOps: false,
                sanitizeResources: false,
            },
        ];
    for (const test of tests)
        Deno.test(test);
}
catch (error)
{
    server.Console.error(error.toString());
    Deno.exit(1);
}
