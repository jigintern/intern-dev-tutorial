#!/usr/bin/env  deno run --allow-read --allow-net --allow-write --allow-env --watch serve.ts
import { fetchChat } from "https://code4fukui.github.io/ai_chat/fetchChat.js";
import { fetchConversation } from "https://code4fukui.github.io/ai_chat/fetchConversation.js";
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import { serve } from "https://deno.land/std@0.180.0/http/server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (pathname === "/api/conversation" && req.method === "POST") {
    const json = await req.json();
    console.log(json);
    const res = await fetchConversation(json.messages, null, true);
    console.log(res);
    return new Response(JSON.stringify({ message: res }));
  }

  if (pathname ==="/api/chat" && req.method === "POST") {
    const json = await req.json();
    console.log(json);
    const res = await fetchChat(json.message);
    console.log(res);
    return new Response(JSON.stringify({ message: res }));
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
