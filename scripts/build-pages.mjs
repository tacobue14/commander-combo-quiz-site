import { copyFile, mkdir, rm, stat } from "node:fs/promises";
import { resolve, join } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "dist");
// Explicit allowlist: no repository metadata, tests, or local configuration files are deployed.
const publicFiles = ["index.html", "style.css", "quiz.js", "images.js", "_headers"];
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of publicFiles) {
  const src = join(root, file);
  const size = (await stat(src)).size;
  if (size > 25 * 1024 * 1024) throw new Error(`Cloudflare Pages file exceeds 25 MiB: ${file}`);
  await copyFile(src, join(out, file));
}
console.log(`Prepared ${publicFiles.length} static assets in dist/ for Cloudflare Pages.`);
