import init, { greet } from '../pkg/wasm_deno.js';
async function run() {
  await init(await fetch('../public/pkg/wasm_deno_bg.wasm'));
  greet('hello');
}
run();
