# 産業社会特講  
(スマートスピーカーアプリ開発)

2019/04/23

---

## Node.js 入門

* なぜNode.jsを学ぶのか？

---
## 環境導入

*  [Node.js](https://nodejs.org/ja/)
*  [VisualStudioCode](https://code.visualstudio.com/)

---
## まずはHelloWorld

## hello.jsを作成して実行してみる

```hello.js

// 文字列を変数に代入
const text = 'HelloWorld';
console.log(text); // メソッドを実行
```

```bash
$ node hello.js
HelloWorld
```

---

## コメント
* コードとして実行されない文字列

```js
// 1行コメント
// 行末までコメントになる

/*
複数行
コメント
*/
/*この間がコメントになる*/
```
---

### セミコロン
* 文を区切る
    * 文は一つの手続き
    * 文の末尾にはセミコロンを付ける
* ブロック文の後ろには付けない
    * ブロックは文をグループ化する
    * `{}`で文を囲む
* 関数やクラスの`{}`の後ろにもつけない
    * 関数やクラスについては後述

--

```js
'use strict'; // 文
const text = 'HelloWorld'; // 代入も文
console.log(text); // メソッドの呼び出しも文

// ブロックの前にはifやforなどの制御文が来ることが多い
if (text) {
  console.log(text); // 文
} // ブロックの後ろには付けない

function print(str) {
  console.log(str);
} // 関数の後ろにも付けない
```

---

## 変数
* データを格納するための入れ物
* `const`の他に`let`や`var`などの修飾子がある
    * スコープ(変数の有効範囲)や代入の制限などに違いがある
    * `const`と`let`はES2015から
* 修飾子の後に変数名を書くことで変数を作れる(変数宣言)
    * 同時に代入も可能
        * 代入は`=`演算子を利用
    * `const`は宣言時に代入が必須
* 基本的に`const`を使い、再代入が必要な場合は`let`を使うのがオススメ

--

|        | const  | let    | var  |
|--------|--------|--------|------|
| スコープ | ブロック | ブロック | 関数 |
| 再代入  | 不可能 | 可能    | 可能 |

--

```js
{ // ブロック(単体で使うことはあまりない)
  const foo = '1'; // 変数の定義時に代入を行う
  foo = '10'; // 再代入はエラー
  let bar = '2';
  bar = '20'; // 再代入可能
  var baz = '30';
}
console.log(foo); // スコープの外なので参照できずエラー
console.log(bar); // 上に同じ

// varはスコープが関数
// 関数の外の場合はグローバル変数になる
console.log(baz); // 30
```

---

## [文字列](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String)
* `''`で囲むと文字列のデータになる
    * `""`で囲んでも同じように文字列になる
    * 文字列結合する場合は`+`演算子を利用
* ``` `` ```(バッククオート)で囲むと、式展開ができる
    * テンプレートリテラルと呼ばれている
    * ES2015からの機能
    * `${hoge}`と書いた場合、`hoge`が展開される
    * `+`演算子を使って結合するより、テンプレートリテラルを使う方がいい

```js
const name = 'abcang';
console.log('hello ' + name); // hello abcang
console.log("hello " + name); // hello abcang
console.log(`hello ${name}`); // hello abcang
```

---

<style type="text/css">
  .reveal h1,
  .reveal h2,
  .reveal h3,
  .reveal h4,
  .reveal h5,
  .reveal h6 {
    text-transform: none;
  }
</style>