const js = import('../pkg/wasm_deno.js');
js.then((js1)=>{
    js1.greet('WebAssembly');
});
