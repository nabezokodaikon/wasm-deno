# How to make wasm

### Pattern1
```typescript
const js = import('../pkg/wasm_deno.js');
js.then(js => {
  js.greet('WebAssembly')
});
```
```bash
$ cargo build --target wasm32-unknown-unknown --release
$ wasm-bindgen target/wasm32-unknown-unknown/release/wasm_deno.wasm --out-dir ./server/public/pkg
$ deno bundle server/public/ts/greet.ts server/public/js/greet.js
```
#### Error
```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/wasm". Strict MIME type checking is enforced for module scripts per HTML spec.
```

### Pattern2
```typescript
const js = import('../pkg/wasm_deno.js');
js.then(js => {
  js.greet('WebAssembly')
});
```
```bash
$ cargo build --target wasm32-unknown-unknown --release
$ wasm-bindgen target/wasm32-unknown-unknown/release/wasm_deno.wasm --out-dir ./server/public/pkg --target web
$ deno bundle server/public/ts/greet.ts server/public/js/greet.js
```
#### Error
```
Uncaught (in promise) TypeError: Cannot read property '__wbindgen_malloc' of undefined
    at Module.greet (wasm_deno.js:78)
    at greet.js:3
```

### Pattern3
```typescript
//@deno-types="../pkg/wasm_deno.d.ts"
import { greet } from '../pkg/wasm_deno.js';
greet('Hello');
```
```bash
$ cargo build --target wasm32-unknown-unknown --release
$ wasm-bindgen target/wasm32-unknown-unknown/release/wasm_deno.wasm --out-dir ./server/public/pkg --target deno
$ deno bundle server/public/ts/greet.ts server/public/js/greet.js
```
#### Error
```
Uncaught ReferenceError: Deno is not defined
    at greet.js:67
```













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
$ deno bundle server/public/ts/greet.ts server/public/js/greet.js
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
