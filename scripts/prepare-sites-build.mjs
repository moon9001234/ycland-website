import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";

const distDir = "dist";
const hostingTarget = join(distDir, ".openai", "hosting.json");
const serverTarget = join(distDir, "server", "index.js");

mkdirSync(dirname(hostingTarget), { recursive: true });
mkdirSync(dirname(serverTarget), { recursive: true });

copyFileSync(join(".openai", "hosting.json"), hostingTarget);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function walkFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const relativePath = relative(distDir, fullPath);

    if (relativePath.startsWith(`server${sep}`) || relativePath.startsWith(`.openai${sep}`)) {
      return [];
    }

    if (statSync(fullPath).isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
}

const files = Object.fromEntries(
  walkFiles(distDir).map((filePath) => {
    const routePath = `/${relative(distDir, filePath).replaceAll(sep, "/")}`;
    const extension = extname(filePath);
    return [
      routePath,
      {
        body: readFileSync(filePath).toString("base64"),
        contentType: contentTypes[extension] ?? "application/octet-stream",
      },
    ];
  }),
);

writeFileSync(
  serverTarget,
  `const FILES = ${JSON.stringify(files)};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let file = FILES[url.pathname];

    if (!file && !url.pathname.includes(".")) {
      file = FILES["/index.html"];
    }

    if (!file) {
      return new Response("Not found", { status: 404 });
    }

    const bytes = Uint8Array.from(atob(file.body), (char) => char.charCodeAt(0));
    return new Response(bytes, {
      headers: {
        "Content-Type": file.contentType,
        "Cache-Control": url.pathname === "/index.html" ? "no-cache" : "public, max-age=31536000, immutable",
      },
    });
  },
};
`,
);
