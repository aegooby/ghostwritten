
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
        .command("pkg:update", "", {}, cli.pkgUpdate)
        .command("cache", "", {}, cli.cache)
        .command("bundle", "", {}, cli.bundle)
        .command("codegen", "", {}, cli.codegen)
        .command("localhost", "", {}, cli.localhost)
        .command("localhost:snowpack", "", {}, cli.localhostSnowpack)
        .command("localhost:deno", "", {}, cli.localhostDeno)
        .command("docker", "", {}, cli.docker)
        .command("docker:bundle", "", {}, cli.dockerBundle)
        .command("docker:dgraph", "", {}, cli.dockerDgraph)
        .command("docker:server", "", {}, cli.dockerServer)
        .command("test", "", {}, cli.test)
        .command("prune", "", {}, cli.prune)
        .command("image", "", {}, cli.image)
        .command("container", "", {}, cli.container)
        .command("sync", "", {}, cli.sync)
        .command("help", "", {}, cli.help)
        .parse();
}