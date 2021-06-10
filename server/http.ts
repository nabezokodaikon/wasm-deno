import {
  Application,
  Context,
  send,
} from 'https://deno.land/x/oak@v7.5.0/mod.ts';

const app = new Application();

app.use(async (context: Context)=> {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: 'index.html'
  });
});

await app.listen({ hostname: '127.0.0.1', port: 8080 });

// import { serve } from "https://deno.land/std@0.98.0/http/server.ts";
// import { serveFile } from 'https://deno.land/std@0.98.0/http/file_server.ts';

// const server = serve({ port: 8000 });
// console.log("http://localhost:8000/");

// for await (const req of server) {
  // console.log(req.url);
  // if(req.url === '/') {
    // const response = await serveFile(req, 'index.html');
    // req.respond(response)
  // }
// }
