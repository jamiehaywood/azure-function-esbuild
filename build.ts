import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

import { readdir, mkdir } from "fs/promises";
import { rmSync } from "fs";
import path from "path";
async function build() {
  const sourcemap = !!process.argv[2];

  const buildDir = "lib";

  rmSync(buildDir, { recursive: true, force: true });
  await mkdir(buildDir).catch(() => {}); // catch and do nothing if dir already exists

  const getDirectories = async (source) =>
    (await readdir(source, { withFileTypes: true }))
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  const srcDirs = await getDirectories("./src");

  for (const directory of srcDirs) {
    const outdir = path.join(buildDir, `/${directory}`);

    await mkdir(outdir);

    await esbuild.build({
      entryPoints: [path.join("./src", directory, "/index.ts")],
      outdir,
      bundle: true,
      minify: true,
      sourcemap,
      watch: false,
      plugins: [
        copy({
          copyOnStart: true,
          assets: [
            {
              from: [`src/${directory}/function.json`],
              to: ["."],
            },
          ],
        }),
      ],
    });
  }
}
build();
// esbuild.build({
//   entryPoints: ["./src/**"],
//   outdir: "lib",
//   bundle: true,
//   minify: true,
//   sourcemap: false,
//   watch: false,
//   //   plugins: [copyStaticFiles()],
// });
