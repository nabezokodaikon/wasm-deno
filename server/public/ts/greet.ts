const js = import('../pkg/wasm_deno.js');
js.then(js => {
  js.greet('WebAssembly')
});
