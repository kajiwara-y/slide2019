# 産業社会特講  
(スマートスピーカーアプリ開発)

2019/05/14

---

## 前回のおさらい

* カスタムスキルを作ろう
* インテントとサンプル発話
* ASK SDK for Node.js

---

## スロット

* プログラムにおける変数のようなもの
* インテントに引数(パラメータ)を与えることができます。

--

## スロット

* コーヒーをください → CoffeeOrderIntent → CoffeeOrderIntentHandler

--

## スロット

* コーヒーをください → coffeeOrderIntent → coffeeOrderIntentHandler
* カフェラテをください → cafelatteOrderIntent → cafelatteOrderIntentHandler
* エスプレッソをください → espressoOrderIntent → espressoOrderIntentHandler
* ...

---

## DRY 原則

Don't repeat yourself (DRY) は、特にコンピューティングの領域で、重複を防ぐ考え方である。[Wikipedia](https://ja.wikipedia.org/wiki/Don%27t_repeat_yourself)

---

## スロット

* コーヒーをください → coffeeOrderIntent → coffeeOrderIntentHandler
* カフェラテをください → cafelatteOrderIntent → cafelatteOrderIntentHandler
* エスプレッソをください → espressoOrderIntent → espressoOrderIntentHandler

--

## スロット

* **コーヒー**をください
* **カフェラテ**をください 
* **エスプレッソ**をください

--

## スロット

* **コーヒー**をください → orderIntent → orderIntentHandler
* **カフェラテ**をください → orderIntent → orderIntentHandler
* **エスプレッソ**をください→ orderIntent → orderIntentHandler

--

## スロット

* **{menu}**をください → orderIntent → orderIntentHandler


---

## 数量を受け取る

* **コーヒー**を**１**つください
* **カフェラテ**を**２**つください 
* **エスプレッソ**を**３**つください

--

## 数量を受け取る

* **{menu}**を **{amount}** つください → orderIntent → orderIntentHandler

---

## スロットタイプ

* スロットに入る値を予め定義
  * ビルドインスロットタイプ - Amazonがプリセットしているリスト
  * カスタムスロットタイプ - 開発者が独自に定義するもの

---

## スロットタイプリファレンス

[スロットタイプリファレンス](https://developer.amazon.com/ja/docs/custom-skills/slot-type-reference.html)