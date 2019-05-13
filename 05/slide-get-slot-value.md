# リクエストからスロット値を受け取ろう

2019/05/14

---

## Alexaシミュレータでテストする

発話を行い、どのようなリクエストがAlexaからくるのかを確認します。

--

## Alexaシミュレータでテストする

1, `request` → `intent ` → `slots`


---

## Lambdaからスロット値を取得する

1. `OrderIntent`内に以下を記載していきます。

```javascript
let menu = handlerInput.requestEnvelope.request.intent.slots.menu.value;
let amount = handlerInput.requestEnvelope.request.intent.slots.amount.value;
const speechText = `${menu} ${amount}つですね、ありがとうございます。`;
```

---

## Alexaシミュレータでテストする

数量と商品名が取得できることを確認します。