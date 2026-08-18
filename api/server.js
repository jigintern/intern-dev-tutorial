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
    const name = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + name);
  }

  if (req.method === "GET" && pathname === "/profile") {
    return Response.json({
      name: "たにぐち",
      favorite: "ラーメン",
    });
  }

  if (req.method === "POST" && pathname === "/auth") {
    const body = await req.json();
    if (body.password === "jigjp") {
      return Response.json({ ok: true, message: "ログインできました" });
    }
    return Response.json({ ok: false, message: "パスワードが違います" });
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
