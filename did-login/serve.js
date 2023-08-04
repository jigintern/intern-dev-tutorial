import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import { serve } from "https://deno.land/std@0.180.0/http/server.ts";
import { DIDAuth } from "https://jigintern.github.io/did-login/auth/DIDAuth.js";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
