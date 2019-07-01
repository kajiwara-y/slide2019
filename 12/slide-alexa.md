# 産業社会特講

(スマートスピーカーアプリ開発)

2019/07/02

---

## 前回のおさらい

- Displayインターフェースを用いたスキルの開発

---

## AlexaPresentationLanguage

[概要](https://developer.amazon.com/ja/docs/alexa-presentation-language/apl-overview.html)

---

## ALEXA_PRESENTATION_APLインターフェースを有効にする

開発者コンソールからインターフェース→Alexa Presentation Languageで有効にします。


--

![インターフェースを有効にする](interface.png "インターフェースを有効にする")

---

## APLの定義を配置する

Lambdaに新しいフォルダ(lambda/documents) を作成します。

--

新しく作成した documents フォルダ内に新規 json ファイルを作成します。ポップアップ画面の「file path」に「lambda/documents/launchRequest.json」と入力し「create file」をクリックします。

--

[ダウンロード](./12/launchRequest.json)した内容コピー&ペーストします。

---

## APLを使えるかの判定用ヘルパー関数を実装する

前回の画面付スキルの開発と同様、デバイスがAPLを使えるかの判定を行う必要があります。
判定ヘルパー関数は以下のようになります。

--

```javascript
module.exports.supportsAPL = function supportsAPL(handlerInput) {
  const supportedInterfaces = handlerInput.requestEnvelope.context
    .System.device.supportedInterfaces;
  const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
  return aplInterface !== null && aplInterface !== undefined;
}
```

---

## APLを呼び出す実装を行う

呼び出すAPLの定義をオブジェクトでまとめておきます。

```javascript
const APLDocs = {
  launch: require('./documents/launchRequest.json')
};
```

--

スキルのレスポンスとして、APLを返します。

```javascript
const reporomptText = '注文はお決まりですか？'
const responseBuilder = handlerInput.responseBuilder;
if (util.supportsAPL(handlerInput)) {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
         document: APLDocs.launch,				
        datasources: {}
    });
}
return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();
```

---

## 注文結果をAPLで表示する

注文完了時の画面をAPLで表示するようにしてみます。
また、その際、注文結果の情報をAPLにパラメータとして渡してみます。

--

### APLのテンプレートをダウンロードして配置します。

テンプレートは[こちら](./12/order.json)
配置方法は先程と同様で、ファイル名はorder.jsonとします。

--

### 追加したAPLテンプレートをAPLの定義に追加します。

```javascript
const APLDocs = {
  launch: require('./documents/launchRequest.json')
  order: require('./documents/order.json')
};
```

--

### APL対応デバイスの場合、APLにセットするパラメータを取得し、APLに渡し画面の描画を行います。


```javascript
const attributes = handlerInput.attributesManager.getSessionAttributes();
let menu_id = attributes.menu_id;
if (util.supportsAPL(handlerInput)) {
  responseBuilder.addDirective({
      type: 'Alexa.Presentation.APL.RenderDocument',
      version: '1.0',
      document: APLDocs.order,				
      datasources: {
          orderData: {
              properties: {
                  orderMenuImage: `https://alexa-tama-img.s3-ap-northeast-1.amazonaws.com/${menu_id}.png`,
                  orderMenuString: menu
              }
          }
          
      }
  });
}
```

<style type="text/css">
  .reveal h1,
  .reveal h2,
  .reveal h3,
  .reveal h4,
  .reveal h5,
  .reveal h6 {
    text-transform: none;
  }
  .reveal h3
   {
       text-align: left;
  }
.left {
float: left;
}
.image70 {
    max-height: 70% !important;
    max-width: 70% !important;
}
.center{
  text-align: center;
}
img.icon {
width: 60px;
height: 60px;
float: left;
}
.mes{
  display:inline-block;
  vertical-align:top;
}
</style>