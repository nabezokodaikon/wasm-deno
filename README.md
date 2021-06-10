# How to make wasm
WebブラウザでWebAssemblyをDeno(TypeScript)で書いたコードで読み込む

みなさんDenoやってますか？流行ってますもんね！
あとWebAssemblyもやってますか？流行ってますもんね！
んでDenoを使ってWebAssemblyを実行させたいんだけど、Webブラウザ上でそれをやるのにどハマリしたので、備忘録です。
webpackを使う方法はググればたくさん出てくるんですけど、Denoでは見つからなかったんですよね...。
やっぱDenoはDenoだけで完結したいじゃないですか！

というわけで以下をどうぞ！

### 実行環境
#### ディレクトリ構成

```
.
├── Cargo.toml
├── server
│   └── public
│       ├── greet.html
│       └── ts
│           └── greet.ts
└── src
    └── lib.rs
```

#### Cargo.toml
libに`cdylib`、dependenciesに`wasm_bindgen`を指定します。

```
[package]
name = "wasm-deno"
version = "0.1.0"
authors = ["nabezokodaikon <nabezoko.daikon@gmail.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.74"
```

#### Rustコード(./src/lib.rs)
シンプルにアラートを呼び出します。

```rust
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    #[allow(unused_unsafe)]
    unsafe {
        alert(&format!("Hello, {}!", name));
    }
}
```

#### TypeScriptコード(./server/public/ts/greet.ts)
WebAssemblyへアラートを表示するように指示します。
ここでハマりました...。
wasmファイルはファイルプロトコル(`file://`)でしか読み込んでくれなく、別途、fetchで動的に読み込むことにしました。

```typescript
import init, { greet } from '../pkg/wasm_deno.js';
async function run() {
  const file = await fetch('../public/pkg/wasm_deno_bg.wasm'); 
  await init(file);
  greet('hello');
}
run();
```

#### Webページ(./server/public/greet.html)
最終的に出力する`greet.js`をscriptタグに指定しておきます。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Deno in WebAssembly</title>
  </head>
  <body>
    <script src="js/greet.js"></script>
  </body>
</html>
```

### 準備
#### 1. `wasm-bindgen`をインストール

```bash
cargo install wasm-bindgen-cli
```

#### 2. `wasm32-unknown-unknown`ツールチェインを追加

```bash
rustup target add wasm32-unknown-unknown
```

### WebAssemblyをDenoで読み込む
#### 1. ターゲットを`wasm32-unknown-unknown`にしてビルド

```bash
cargo build --target wasm32-unknown-unknown --release
```

すると、target以下のディレクトリに、WebAssemblyを実行するために必要なファイルが二つ作成されます。
`./target/wasm32-unknown-unknown/release`
`wasm_deno.d`
`wasm_deno.wasm`

#### 2. `wasm-bindgen`を実行して、TypeScriptから読み込むファイルを生成
ターゲット`--target`を`web`にするのがポイントです。
`deno`もオプションにありますが、Webブラウザ上で実行できるコードを生成してくれません。
`--out-dir`オプションで、生成先を指定できます。

```bash
wasm-bindgen target/wasm32-unknown-unknown/release/wasm_deno.wasm --target web --out-dir ./server/public/pkg
```

ここまでのディレクトリ構成です。(不要なファイルは省いています。)

```
.
├── Cargo.toml
├── server
│   ├── http.ts
│   └── public
│       ├── greet.html
│       ├── pkg
│       │   ├── wasm_deno.d.ts
│       │   ├── wasm_deno.js
│       │   ├── wasm_deno_bg.wasm
│       │   └── wasm_deno_bg.wasm.d.ts
│       └── ts
│           └── greet.ts
├── src
│   └── lib.rs
└── target
    └── wasm32-unknown-unknown
        └── release
            ├── wasm_deno.d
            └── wasm_deno.wasm
```

#### 3. JavaScriptファイルを生成 
Denoを通して、TypeScriptをJavaScriptに変換します。

```bash
deno bundle server/public/ts/greet.ts server/public/js/greet.js
```

### 実行

```bash
deno run --allow-net --allow-read  https://deno.land/std@0.98.0/http/file_server.ts
```

そして表示されたホストから、以下のアドレスにアクセスします。
`http://localhost:4507/server/public/greet.html`
アラートが表示されれば成功です！
