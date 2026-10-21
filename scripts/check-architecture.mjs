import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const allowedDependencies = {
  domain: new Set(["domain"]),
  application: new Set(["application", "domain"]),
  infrastructure: new Set(["infrastructure", "application", "domain"]),
  presentation: new Set(["presentation", "features", "application", "domain"]),
  features: new Set(["presentation", "features", "application", "domain"]),
  interface: new Set(["interface", "application", "domain"]),
};
const violations = [];

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(file);
      continue;
    }
    if (!/\.(?:ts|tsx)$/.test(entry.name)) continue;

    const source = await readFile(file, "utf8");
    const sourceLayer = path.relative(root, file).split(path.sep)[0];
    const allowed = allowedDependencies[sourceLayer];
    if (!allowed) continue;
    const imports = source.matchAll(/(?:from\s*|import\s*)["']([^"']+)["']/g);

    for (const [, specifier] of imports) {
      if (sourceLayer === "domain" || sourceLayer === "application") {
        if (!specifier.startsWith("@/") && !specifier.startsWith(".")) {
          violations.push(`${path.relative(root, file)} imports external package ${specifier}`);
          continue;
        }
      }
      let target;
      if (specifier.startsWith("@/")) {
        target = specifier.slice(2).split("/")[0];
      } else if (specifier.startsWith(".")) {
        target = path.relative(root, path.resolve(path.dirname(file), specifier)).split(path.sep)[0];
      } else {
        continue;
      }
      if (!allowed.has(target)) {
        violations.push(`${path.relative(root, file)} imports ${specifier}`);
      }
    }
  }
}

await visit(root);
if (violations.length) {
  console.error("Clean Architecture dependency violations:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log("Clean Architecture dependency rules passed.");
}
