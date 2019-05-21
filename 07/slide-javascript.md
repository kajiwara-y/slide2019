# Javascript 入門

(スマートスピーカーアプリ開発)

2019/05/21

---

## JSFiddle

[jsFiddle](https://jsfiddle.net/)

---

## 変数宣言

- let
- const **const は再代入不可**

```javascript
let let_mes = "message";
console.log(let_mes);
let_mes = "hello";
console.log(let_mes);
const const_mes = "message";
console.log(const_mes);
const_mes = "hello";
console.log(const_mes);
```

---

## データ型

- 数値型
- 文字列
- boolean
- ...

---

## データ型

```javascript
let num = 1;
let message = "message";
let flag = false;
console.log(num);
console.log(message);
console.log(flag);
```

---

## 配列

```javascript
let array = [0, 1, 2, 3, 4, 5];
console.log(array);
console.log(array[0]);
```

---

## オブジェクト

```javascript
let order = {
  menu : "コーヒー",
  amount : 1
}
console.log(order);
order.menu = "ブレンド"
order.amount = 1
console.log(order);
```
