const js = import('../pkg/wasm_deno.d.ts');
js.then(js => {
  js.greet('WebAssembly')
});
