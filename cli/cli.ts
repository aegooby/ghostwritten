
import * as yargs from "@yargs/yargs";
import { Arguments } from "@yargs/types";
import * as colors from "@std/colors";

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
const [args, _] = createCommand();

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
async function codegen(args: Arguments)
{
    return await cli.codegen(args);
}
async function localhost(args: Arguments)
{
    return await cli.localhost(args);
}
async function docker(args: Arguments)
{
    await cli.docker(args);
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
    await cli.image(args);
}
async function container(args: Arguments)
{
    await cli.container(args);
}
async function sync(args: Arguments)
{
    await cli.sync(args);
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
        .command("codegen", "", {}, bundle)
        .command("localhost", "", {}, localhost)
        .command("docker", "", {}, docker)
        .command("test", "", {}, test)
        .command("prune", "", {}, prune)
        .command("image", "", {}, image)
        .command("container", "", {}, container)
        .command("sync", "", {}, sync)
        .command("help", "", {}, help)
        .parse();
}