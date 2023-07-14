import { serve } from "https://deno.land/std@0.180.0/http/server.ts";


serve((req) => {
    const pathname = new URL(req.url).pathname;
    console.log(pathname);
  
    if (req.method === "GET" && pathname === "/cors") {
      return new Response("CORS access complete! ");
    }

    if (req.method === "GET" && pathname === "/cors-additional-header"){
        return new Response("CORS access complete! ",{headers: {"Access-Control-Allow-Origin":"*"}});
    }

    if (req.method === "POST" && pathname === "/cors-additional-header"){
        return new Response("CORS access complete! ",{headers: {"Access-Control-Allow-Origin":"*"}});
    }

    if(req.method === "OPTIONS" && pathname === "/cors-additional-header"){
        return new Response("",{headers: {"Access-Control-Allow-Methods":"POST","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers": "*"}})
    }
},{port: "3000"});