import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

import { readdir, mkdir, readFile } from "fs/promises";
import { rmSync } from "fs";
import path from "path";

async function build() {
  const sourcemap = !!process.argv[2];
  const nvmrcVersion = await readFile(".nvmrc", { encoding: "utf-8" });
  const sourceFolder = "src";
  const buildDir = "dist";

  rmSync(buildDir, { recursive: true, force: true });
  await mkdir(buildDir).catch(() => {}); // catch and do nothing if dir already exists

  const getDirectories = async (source: string) =>
    (await readdir(source, { withFileTypes: true }))
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  const srcDirs = await getDirectories(sourceFolder);

  for (const directory of srcDirs) {
    const outdir = path.join(buildDir, directory);

    await mkdir(outdir);

    await esbuild.build({
      entryPoints: [path.join(sourceFolder, directory, "index.ts")],
      outdir,
      bundle: true,
      minify: true,
      platform: "node",
      treeShaking: true,
      target: [`node${nvmrcVersion}`],
      sourcemap,
      watch: false,
      plugins: [
        copy({
          copyOnStart: true,
          assets: [
            {
              from: [path.join(sourceFolder, directory, "function.json")],
              to: ["."],
            },
          ],
        }),
      ],
    });
  }
}
build();
