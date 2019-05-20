# 課題回答例 

(スマートスピーカーアプリ開発)

2019/05/21

---

## 2. 代表値の無いリクエストが来た場合、リクエストされた商品が無い旨を伝え、他の商品の注文を促してみましょう。

```javascript
  if (status === "ER_SUCCESS_MATCH"){
      // ステータスコードを調ベて、MATCHだったら代表値を取得してmenuにセットする
      menu = menuSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
  }else{
      const sorryMessage = `申し訳無いのですが、 ${menu} はご提供できません。 コーヒーはいかがですか？`
      return handlerInput.responseBuilder
          .speak(sorryMessage)
          .getResponse();
  }
```