# How to make wasm

### wasm-pack
```bash
$ wasm-pack build --out-dir ./server/public/pkg --target web
```

### bundle
```bash
$ deno bundle server/public/ts/greet.ts server/public/js/greet.js
```

### wasm-bindgen
```bash
$ cargo build --target wasm32-unknown-unknown --release
$ wasm-bindgen target/wasm32-unknown-unknown/release/wasm_deno.wasm --out-dir ./server/public/pkg --target deno
```

### MEMO
1. `deno bundle server/public/ts/greet.ts server/public/js/greet.js`
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
