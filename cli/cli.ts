
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
            return [Deno.args, defaultCommand];
    }
}
const [args, command] = createCommand();

function all(args: Arguments)
{
    return cli.all(args);
}
async function clean(args: Arguments)
{
    return await cli.clean(args);
}
async function install(args: Arguments)
{
    return await cli.install(args);
}
async function upgrade(args: Arguments)
{
    return await cli.upgrade(args);
}
async function cache(args: Arguments)
{
    return await cli.cache(args);
}
async function bundle(args: Arguments)
{
    return await cli.bundle(args);
}
async function localhost(args: Arguments)
{
    return await cli.localhost(args);
}
async function docker(args: Arguments)
{
    if (!args.target || !(["localhost", "dev", "live"].includes(args.target)))
    {
        Console.error(`usage: ${command} docker --target <localhost | dev | live>`);
        return;
    }

    if (await cache(args))
        throw new Error("Caching failed");

    const targetDomain = function ()
    {
        switch (args.target)
        {
            case "localhost": return "localhost";
            case "dev": return "dev.ghostwritten.me";
            case "live": return "ghostwritten.me";
            default:
                Console.error(`usage: ${command} docker --target <localhost | dev | live>`);
                throw new Error();
        }
    };
    const domain = targetDomain();

    const snowpackRunOptions: Deno.RunOptions =
    {
        cmd:
            [
                "yarn", "run", "snowpack", "--config",
                `config/docker-${args.target}.snowpack.js`, "build"
            ],
    };
    const snowpackProcess = Deno.run(snowpackRunOptions);
    const snowpackStatus = await snowpackProcess.status();
    snowpackProcess.close();
    if (!snowpackStatus.success)
        return snowpackStatus.code;

    /** @todo Add Deno TLS. */
    const serverRunOptions: Deno.RunOptions =
    {
        cmd:
            [
                "deno", "run", "--unstable", "--allow-all",
                "--import-map", "import-map.json",
                "server/daemon.tsx", "--hostname", "0.0.0.0",
                "--domain", domain, // "--tls", `/etc/letsencrypt/live/${domain}/`
            ],
        env: { DENO_DIR: ".cache/" }
    };
    const ready = async function (): Promise<void>
    {
        while (true)
        {
            try
            {
                await async.delay(750);
                const init = { headers: { "x-http-only": "" } };
                await fetch(`http://${domain}:5080/`, init);
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
            Console.success("fetch(): server is ready", { time: true });
            await serverProcess.status();
        }
        catch { Console.error("fetch(): server is down, restarting", { time: true }); }
        serverProcess.close();
    }
}
async function test(args: Arguments)
{
    return await cli.test(args);
}
async function prune(args: Arguments)
{
    return await cli.prune(args);
}
async function image(args: Arguments)
{
    if (!args.target)
    {
        Console.error(`usage: ${command} image --target <value>`);
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
function help(args: Arguments)
{
    return cli.help(args);
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
        .command("docker", "", {}, docker)
        .command("test", "", {}, test)
        .command("prune", "", {}, prune)
        .command("image", "", {}, image)
        .command("help", "", {}, help)
        .parse();
}