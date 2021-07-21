
import * as yargs from "@yargs/yargs";
import { Arguments } from "@yargs/types";
import * as colors from "@std/colors";

import { Console, version } from "@httpsaurus/server";
import * as cli from "@httpsaurus/cli";

Deno.env.set("DENO_DIR", ".cache/");
const [args, _] = [Deno.args, "turtle"];
if (import.meta.main)
{
    yargs.default(args)
        .help(false)
        .command("*", "", {}, cli.all)
        .command("version", "", {}, function (_: Arguments)
        {
            Console.log(`${colors.gray("Ghost")}${colors.reset("written")} v2.1.0`);
            Console.log(`${colors.bold("https")}${colors.reset("aurus")} ${version.string()}`);
        })
        .command("clean", "", {}, cli.clean)
        .command("install", "", {}, cli.install)
        .command("upgrade", "", {}, cli.upgrade)
        .command("pkg", "", {}, cli.pkg)
        .command("pkg:help", "", {}, cli.pkg)
        .command("pkg:add", "", {}, cli.pkgAdd)
        .command("pkg:remove", "", {}, cli.pkgRemove)
        .command("pkg:update", "", {}, cli.pkgUpdate)
        .command("cache", "", {}, cli.cache)
        .command("bundle", "", {}, cli.bundle)
        .command("codegen", "", {}, cli.codegen)
        .command("localhost", "", {}, cli.localhost)
        .command("localhost:help", "", {}, cli.localhost)
        .command("localhost:snowpack", "", {}, cli.localhostSnowpack)
        .command("localhost:deno", "", {}, cli.localhostDeno)
        .command("deploy", "", {}, cli.deploy)
        .command("deploy:help", "", {}, cli.deploy)
        .command("deploy:server", "", {}, cli.deployServer)
        .command("deploy:dgraph", "", {}, cli.deployDgraph)
        .command("test", "", {}, cli.test)
        .command("docker", "", {}, cli.docker)
        .command("docker:help", "", {}, cli.docker)
        .command("docker:prune", "", {}, cli.dockerPrune)
        .command("docker:image", "", {}, cli.dockerImage)
        .command("docker:container", "", {}, cli.dockerContainer)
        .command("sync", "", {}, cli.sync)
        .command("help", "", {}, cli.help)
        .parse();
}