const js = import('../pkg/wasm_deno.js');
js.then(js => {
  js.greet('WebAssembly')
});

// import init, { greet } from '../pkg/wasm_deno.js';
// await init(Deno.readFile('../pkg/wasm_deno_bg.wasm'));
// greet('Hello');
