# How to make wasm

```bash
$ cargo build --target wasm32-unknown-unknown --release
$ wasm-bindgen target/wasm32-unknown-unknown/release/wasm_deno.wasm --out-dir ./server/public/pkg --target web
$ deno bundle -c tsconfig.json server/public/ts/greet.ts server/public/js/greet.js
```
