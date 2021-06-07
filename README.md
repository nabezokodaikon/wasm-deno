# How to make wasm

1. `cargo new --lib wasm-deno`
1. `wasm-pack build`
  1. `wasm-pack build --out-dir ./server/public/pkg --target web`
1. `deno run --allow-read --allow-net --allow-env --unstable http.ts` 

```
$ wasm-pack build --out-dir ./server/public/pkg --target web
```
```
$ deno run --allow-read --allow-net https://deno.land/std@0.97.0/http/file_server.ts
```
```
$ wasm-bindgen target/wasm32-unknown-unknown/release/wasm_deno.wasm --out-dir ./server/public/pkg --target web
```
