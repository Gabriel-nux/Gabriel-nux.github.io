import { readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const template = path.join(dist, "index.html");
const serverEntry = path.join(root, "dist-server", "entry-server.js");

const { render } = await import(pathToFileURL(serverEntry).href);
let html = await readFile(template, "utf-8");

const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("marcador do #root não encontrado em dist/index.html");
html = html.replace(marker, `<div id="root">${render()}</div>`);

// O CSS vai dentro da própria página: a primeira tela não espera um segundo pedido nem o JavaScript.
const link = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!link) throw new Error("link do CSS não encontrado em dist/index.html");
const css = await readFile(path.join(dist, link[1]), "utf-8");
html = html.replace(link[0], `<style>${css}</style>`);
await rm(path.join(dist, link[1]));

await writeFile(template, html);
await rm(path.join(root, "dist-server"), { recursive: true, force: true });
console.log(
  `HTML pré-renderizado, com CSS embutido (${(css.length / 1024).toFixed(0)} kB), em dist/index.html`,
);
