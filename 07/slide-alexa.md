# 産業社会特講

(スマートスピーカーアプリ開発)

2019/05/27

---

## 前回のおさらい

- シノニム(同義語)
- シノニムを定義してみる
- シノニムに設定した基準値の取得

---

## 前回のおさらい

代表値の無いリクエストが来た場合、リクエストされた商品が無い旨を伝え、他の商品の注文を促してみましょう

```javascript
let status = menuSlot.resolutions.resolutionsPerAuthority[0].status.code;
if(status === "ER_SUCCESS_MATCH"){
    menu = menuSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
}else{
    const sorryMessage = `申し訳無いのですが、 ${menu} はご提供できません。 コーヒーはいかがですか？`
    return handlerInput.responseBuilder
        .speak(sorryMessage)
        .getResponse();
}
```

---
