import { cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "public");

mkdirSync(output, { recursive: true });

for (const file of ["index.html", "script.js", "style.css"]) {
    cpSync(resolve(root, file), resolve(output, file));
}

for (const directory of ["Files", "Images", "Favicon"]) {
    cpSync(resolve(root, directory), resolve(output, directory), {
        recursive: true,
        force: true,
    });
}

console.log("Static portfolio copied to public/.");
