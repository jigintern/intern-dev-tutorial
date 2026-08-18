import { serveDir } from "jsr:@std/http@^1.1.3/file-server";

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }

  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }

  if (req.method === "GET" && pathname === "/greeting-me") {
    const param = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + param);
  }

  if (req.method === "POST" && pathname === "/auth") {
    const reqJson = await req.json();
    const pass = reqJson.pass;
    if (pass === "jigjp") {
      return new Response("Authentication Successful!!");
    } else {
      return new Response("Authentication Failure");
    }
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
