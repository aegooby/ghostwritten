
import * as httpsaurus from "https://raw.githubusercontent.com/aegooby/httpsaurus/master/httpsaurus.ts";
import * as assert from "https://deno.land/std/testing/asserts.ts";
import * as delay from "https://deno.land/std/async/delay.ts";

try
{
    const tests: Deno.TestDefinition[] =
        [
            {
                name: ": run for 5 seconds (HTTP)",
                async fn(): Promise<void>
                {
                    const serverAttributes =
                    {
                        protocol: "http" as httpsaurus.server.Protocol,
                        hostname: "localhost",
                        httpPort: 8080,

                        domain: "localhost",

                        schema: "graphql/schema.gql",
                        resolvers: { request: function () { return "response"; } },
                        routes:
                        {
                            "/favicon.ico": "/static/favicon.ico",
                            "/404.html": "/static/404.html",
                            "/robots.txt": "/static/robots.txt",
                        }
                    };
                    const server = new httpsaurus.server.Server(serverAttributes);
                    const time = delay.delay(5000);
                    const serve = server.serve();
                    await time;
                    server.close();
                    await serve;
                },
                sanitizeOps: false,
                sanitizeResources: false,
            },
            {
                name: ": run for 5 seconds (HTTPS)",
                async fn(): Promise<void>
                {
                    const serverAttributes =
                    {
                        protocol: "https" as httpsaurus.server.Protocol,
                        hostname: "localhost",
                        httpPort: 8080,

                        httpsPort: 4430,
                        cert: "cert/localhost",

                        domain: "localhost",

                        schema: "graphql/schema.gql",
                        resolvers: { request: function () { return "response"; } },
                        routes:
                        {
                            "/favicon.ico": "/static/favicon.ico",
                            "/404.html": "/static/404.html",
                            "/robots.txt": "/static/robots.txt",
                        }
                    };
                    const server = new httpsaurus.server.Server(serverAttributes);
                    const time = delay.delay(5000);
                    const serve = server.serve();
                    await time;
                    server.close();
                    await serve;
                },
                sanitizeOps: false,
                sanitizeResources: false,
            },
            {
                name: ": fetch (HTTP)",
                async fn(): Promise<void>
                {
                    const serverAttributes =
                    {
                        protocol: "http" as httpsaurus.server.Protocol,
                        hostname: "localhost",
                        httpPort: 8080,

                        domain: "localhost",

                        schema: "graphql/schema.gql",
                        resolvers: { request: function () { return "response"; } },
                        routes:
                        {
                            "/favicon.ico": "/static/favicon.ico",
                            "/404.html": "/static/404.html",
                            "/robots.txt": "/static/robots.txt",
                        }
                    };
                    const server = new httpsaurus.server.Server(serverAttributes);
                    const complete = server.serve();
                    const response = await fetch("http://localhost:8080/");
                    assert.assert(response.ok);
                    await response.text();
                    server.close();
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
    httpsaurus.server.Console.error(error.toString());
    Deno.exit(1);
}
