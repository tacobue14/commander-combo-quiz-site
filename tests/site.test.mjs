import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (name) => readFileSync(join(root, name), "utf8");

test("static app entrypoints exist", () => {
  for (const name of ["index.html", "style.css", "quiz.js", "images.js"]) {
    assert.ok(existsSync(join(root, name)), `missing ${name}`);
  }
});
test("entrypoint has no inline JavaScript or inline event handlers", () => {
  const html = read("index.html");
  assert.match(html, /<script\s+src=["']\.\/images\.js\?/);
  assert.match(html, /<script\s+src=["']\.\/quiz\.js\?/);
  assert.doesNotMatch(html, /<script(?:\s[^>]*)?>\s*[^\s<]/i);
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i);
  assert.doesNotMatch(html, /javascript\s*:/i);
});
test("Cloudflare Pages headers limit script sources and reduce browser exposure", () => {
  const headers = read("_headers");
  assert.match(headers, /^\/\*/m);
  for (const setting of ["Content-Security-Policy:", "script-src 'self'", "connect-src 'self' https://api.scryfall.com", "frame-ancestors 'none'", "X-Content-Type-Options: nosniff", "Referrer-Policy:", "Permissions-Policy:"]) {
    assert.ok(headers.includes(setting), `missing header setting: ${setting}`);
  }
  assert.doesNotMatch(headers, /'unsafe-inline'|'unsafe-eval'/i);
});
test("release build exposes allowlisted assets only", () => {
  const folder = join(root, "dist");
  assert.ok(existsSync(folder), "run build-pages.mjs before test suite");
  assert.deepEqual(readdirSync(folder).sort(), ["_headers", "images.js", "index.html", "quiz.js", "style.css"].sort());
});
