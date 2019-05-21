# 産業社会特講

(スマートスピーカーアプリ開発)

2019/05/21

---

## 前回のおさらい

- スロット
- スロットを活用してい
- リクエストからスロット値を受け取ろう

---

## 前回のおさらい

商品の価格を計算してみましょう。

```javascript
let menu = handlerInput.requestEnvelope.request.intent.slots.menu.value;
let amount = handlerInput.requestEnvelope.request.intent.slots.amount.value;

const product_price = "200";
const speechText = `${menu} ${amount}つですね、お支払いは${product_price *
  amount}円になります。ご利用ありがとうございます。`;
```

[算術演算子](https://qiita.com/abcang/items/824681cb88676da4f9a8#%E7%AE%97%E8%A1%93%E6%BC%94%E7%AE%97%E5%AD%90)

---

## シノニム(同義語)

同じ意味を持つ言葉でも様々なフレーズを用います。

- コーヒー
- ホットコーヒー
- 温かいコーヒー
- あったかいコーヒー
- ブレンド

--

## シノニム(同義語)

これらを一つ一つカスタムスロットで定義するのではなく、シノニムで集約することが可能です。

また、集約した際に id を採番することで、プログラムとして扱いやすくすることが可能です。

---

## シノニムを定義してみる

定義するカスタムスロットは以下の通りです。

値 : ホットコーヒー
id : 001
同義語: コーヒー / 暖かいコーヒー / 温かいコーヒー

---

## シノニムで解決されたことを確認する

- シノニムで設定された語
- シノニムで設定されていない語

---

## シノニムに設定した基準値の取得方法(下準備)

[【Alexa】ASK SDK にスキルエンジニアの強い味方「ASK SDK Utilities」が登場。 #Alexa #AlexaDevs](https://dev.classmethod.jp/voice-assistant/introduce-to-ask-sdk-utilities/)

--

## シノニムに設定した基準値の取得方法(下準備)

### package.json

```json
  "dependencies": {
    "ask-sdk-core": "^2.5.0",
    "ask-sdk-model": "^1.4.1",
    "aws-sdk": "^2.326.0"
  }
```

--

## シノニムに設定した基準値の取得方法(下準備)

### index.js

```javascript
let menu = Alexa.getSlotValue(handlerInput.requestEnvelope, "menu");
let amount = Alexa.getSlotValue(handlerInput.requestEnvelope, "amount");
const speechText = `${menu} ${amount}つですね、ありがとうございます。`;
```

--

## シノニムに設定した基準値の取得方法(シノニムの代表値の取得)

### index.js

```javascript
// スロットの取得
let menuSlot = Alexa.getSlot(handlerInput.requestEnvelope, "menu");

// ステータスコードの取得
let status = menuSlot.resolutions.resolutionsPerAuthority[0].status.code;
if (status === "ER_SUCCESS_MATCH") {
  // ステータスコードを調べて、MATCHだったら代表値を取得してmenuにセットする
  menu = menuSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
}
```

---

## 課題

### 1. メニューリストの他の項目にシノニムを設定して、代表値が取得できることを確認してみよう

### 2. 代表値の無いリクエストが来た場合、リクエストされた商品が無い旨を伝え、他の商品の注文を促してみましょう。

参考: [if\.\.\.else \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/if...else)
