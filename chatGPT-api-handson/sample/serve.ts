#!/usr/bin/env  deno run --allow-read --allow-net --allow-write --allow-env --watch serve.ts
import { fetchChat } from "https://code4fukui.github.io/ai_chat/fetchChat.js";
import { fetchConversation } from "https://code4fukui.github.io/ai_chat/fetchConversation.js";
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import { serve } from "https://deno.land/std@0.180.0/http/server.ts";

serve(async (request) => {
  const pathname = new URL(request.url).pathname;
  console.log(pathname);

  if (pathname === "/api/conversation" && request.method === "POST") {
    const json = await request.json();
    console.log(json);
    const response = await fetchConversation(json.messages, null, true);
    console.log(response);
    return new Response(JSON.stringify({ message: response }));
  }

  if (pathname ==="/api/chat" && request.method === "POST") {
    const json = await request.json();
    console.log(json);
    const response = await fetchChat(json.message);
    console.log(response);
    return new Response(JSON.stringify({ message: response }));
  }

  return serveDir(request, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
