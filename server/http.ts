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
