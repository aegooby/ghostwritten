
import * as yargs from "@yargs/yargs";
import { Arguments } from "@yargs/types";
import * as colors from "@std/colors";
import * as async from "@std/async";

import { Console, version } from "@httpsaurus/server";
import * as cli from "@httpsaurus/cli";

Deno.env.set("DENO_DIR", ".cache/");
function createCommand(): [string[], string]
{
    const targetIndex = Deno.args.indexOf("--target");
    const targetValueIndex = targetIndex + 1;
    const defaultCommand =
        "deno run --unstable --import-map import-map.json --allow-all cli/cli.ts";
    if (targetIndex < 0 || targetValueIndex >= Deno.args.length)
        return [Deno.args, defaultCommand];
    const target = Deno.args[targetValueIndex];
    const args = Deno.args.slice(targetValueIndex + 1);
    switch (target)
    {
        case "windows":
            return [args, "build/windows.exe"];
        case "macos":
            return [args, "build/macos"];
        case "linux":
            return [args, "build/linux"];
        default:
            return [args, defaultCommand];
    }
}
const [args, command] = createCommand();

function all(_: Arguments)
{
    return cli.all(_);
}
async function clean(args: Arguments)
{
    return await cli.clean(args);
}
async function install(_: Arguments)
{
    return await cli.install(_);
}
async function upgrade(_: Arguments)
{
    return await cli.upgrade(_);
}
async function cache(_: Arguments)
{
    return await cli.cache(_);
}
async function bundle(args: Arguments)
{
    return await cli.bundle(args);
}
async function localhost(args: Arguments)
{
    return await cli.localhost(args);
}
async function remote(args: Arguments)
{
    if (!args.target || (args.target !== "dev" && args.target !== "live"))
    {
        Console.error(`usage: ${command} remote --target <dev | live>`);
        return;
    }
    if (await install(args))
        throw new Error("Installation failed");
    if (await cache(args))
        throw new Error("Caching failed");

    const domain =
        (args.target === "dev") ? "dev.ghostwritten.me" : "ghostwritten.me";

    const snowpackRunOptions: Deno.RunOptions =
    {
        cmd:
            [
                "yarn", "run", "snowpack", "--config",
                `config/remote-${args.target}.snowpack.js`, "build"
            ],
    };
    const snowpackProcess = Deno.run(snowpackRunOptions);
    const snowpackStatus = await snowpackProcess.status();
    snowpackProcess.close();
    if (!snowpackStatus.success)
        return snowpackStatus.code;

    const serverRunOptions: Deno.RunOptions =
    {
        cmd:
            [
                "deno", "run", "--unstable", "--allow-all",
                "--import-map", "import-map.json",
                "server/daemon.tsx", "--hostname", "0.0.0.0",
                "--domain", domain, "--tls", `/etc/letsencrypt/live/${domain}/`
            ],
        env: { DENO_DIR: ".cache/" }
    };
    const fetcher = async function (): Promise<never>
    {
        while (true)
        {
            const controller = new AbortController();
            async.delay(5000).then(function () { controller.abort(); });
            const init = { signal: controller.signal };
            const response = await fetch(`https://${domain}:8443/`, init);
            if (!response.ok)
                throw new Error(`${domain} is down`);
            await async.delay(5000);
        }
    };
    const ready = async function (): Promise<void>
    {
        while (true)
        {
            try
            {
                await async.delay(750);
                const init = { headers: { "x-http-only": "" } };
                await fetch(`http://${domain}:8080/`, init);
                return;
            }
            catch { undefined; }
        }
    };
    while (true)
    {
        const serverProcess = Deno.run(serverRunOptions);
        try
        {
            await ready();
            await Promise.race([serverProcess.status(), fetcher()]);
        }
        catch (error) { Console.log(error); }
        serverProcess.close();
    }
}
async function test(_: Arguments)
{
    return await cli.test(_);
}
async function prune(_: Arguments)
{
    return await cli.prune(_);
}
async function docker(args: Arguments)
{
    if (!args.target)
    {
        Console.error(`usage: ${command} docker --target <value>`);
        return;
    }

    if (args.prune)
        await prune(args);

    const buildRunOptions: Deno.RunOptions =
        { cmd: ["docker", "build", "--target", args.target, "--tag", "ghostwritten/server", "."] };
    const buildProcess = Deno.run(buildRunOptions);
    const buildStatus = await buildProcess.status();
    buildProcess.close();
    if (!buildStatus.success)
        return buildStatus.code;
}
function help(_: Arguments)
{
    return cli.help(_);
}

if (import.meta.main)
{
    yargs.default(args)
        .help(false)
        .command("*", "", {}, all)
        .command("version", "", {}, function (_: Arguments)
        {
            Console.log(`${colors.gray("Ghost")}${colors.reset("written")} v2.1.0`);
            Console.log(`${colors.bold("https")}${colors.reset("aurus")} ${version.string()}`);
        })
        .command("clean", "", {}, clean)
        .command("install", "", {}, install)
        .command("upgrade", "", {}, upgrade)
        .command("cache", "", {}, cache)
        .command("bundle", "", {}, bundle)
        .command("localhost", "", {}, localhost)
        .command("remote", "", {}, remote)
        .command("test", "", {}, test)
        .command("prune", "", {}, prune)
        .command("docker", "", {}, docker)
        .command("help", "", {}, help)
        .parse();
}