# セッションアトリビュートを実装する

(スマートスピーカーアプリ開発)

2019/05/27

---

## スロットが一つしか存在しない発話を定義します。

* Menu のみ
* Amount のみ

---

## 前回の会話で既に登録された内容がないかの確認を行います。


```javascript
let attributes = handlerInput.attributesManager.getSessionAttributes();
let menu = Alexa.getSlotValue(handlerInput.requestEnvelope,"menu") || attributes.menu;
let amount = Alexa.getSlotValue(handlerInput.requestEnvelope,"amount") || attributes.amount;
```

---

## スロットが一つしか判明していないケースを実装します。(メニュー)

```javascript

if (menu === undefined){
  attribute.amount = amount;
  handlerInput.attributesManager.setSessionAttributes(attributes);
  const speechOutput = '何を注文しますか？'
  const reprompt = '何を注文しますか？'
  return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(reprompt)
    .getResponse();

}
```

---

## スロットが一つしか判明していないケースを実装します。(数量)

```javascript

if (amount === undefined){
  attribute.menu = menu;
  handlerInput.attributesManager.setSessionAttributes(attributes);
  const speechOutput = 'おいくつ注文しますか？'
  const reprompt = 'おいくつ注文しますか？'
  return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(reprompt)
    .getResponse();

}
```

---

## 課題

### 複数の注文を受け取れるように実装を進めてみましょう


---

<style type="text/css">
p {
float: left;
}
img {
width: 60px;
height: 60px;
float: left;
}
.mes{
  display:inline-block;
  vertical-align:top;
}
</style>
