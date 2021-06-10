import init, { greet } from '../pkg/wasm_deno.js';
async function run() {
  const file = await fetch('../public/pkg/wasm_deno_bg.wasm'); 
  await init(file);
  greet('hello');
}
run();

