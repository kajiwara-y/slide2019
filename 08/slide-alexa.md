# 産業社会特講

(スマートスピーカーアプリ開発)

2019/06/04

---

## 前回のおさらい

- Javascript(オブジェクト)
- セッションアトリビュート

---

## フランス語を話せるようにしてみた

```
handle(handlerInput) {
    const speechText = '注文は決まりですか？';
    const speechTextFR = '<voice name="Celine"><lang xml:lang="fr-FR">Bienvenue au café？</lang></voice>';
    const reporomptText = '注文はお決まりですか？'
    return handlerInput.responseBuilder
        .speak(speechText + speechTextFR)
        .reprompt(reporomptText)
        .getResponse();
}
```

--

## フランス語を話せるようにしてみた

[[日本語Alexa] AlexaスキルからPollyで喋らせることができるようになった（Generally Available）](https://dev.classmethod.jp/cloud/alexa-polly/)
[Amazon Polly の音声](https://docs.aws.amazon.com/ja_jp/polly/latest/dg/voicelist.html)

---

## アップデート

[スキル内課金を使ったスキルを日本のAlexaユーザー向けに開発できるようになりました](https://developer.amazon.com/ja/blogs/alexa/tag/japang)

---

## 実装例

<div style="text-align: left;">
<p class="left">
  <img src="user.png" alt="user" title="ユーザー">「アレクサ、コーヒーショップを開いて、コーヒーをください」
</p> 
<p class="left"> {menu="coffee"}をセッションアトリビュートに保存する。</p>
<p class="left">
  <img src="alexa.png" alt="alexa" title="Alexa">「コーヒーですね。おいくつご用意しましょうか?」
</p>
</div>

--

## セッションアトリビュート

<div style="text-align: left;">

<p class="left">
  <img src="user.png" alt="user" title="ユーザー">「二つお願い」</p>
</p>
<p class="left"> {menu="coffee"}をセッションアトリビュートから取得する。</p>
<p class="left">
  <img src="alexa.png" alt="alexa" title="Alexa">「コーヒーを2つですね。ご利用ありがとうございます。」
</p>
</div>

---

## ドキュメントを読んで見る

[アトリビュートの管理](https://ask-sdk-for-nodejs.readthedocs.io/ja/latest/Managing-Attributes.html)

---

## セッションにアトリビュートをセットする

```javascript
const attributes = {menu: "コーヒー", amount:1}
// attributes.menu = "コーヒー"
// attributes.amount = 1
handlerInput.attributesManager.setSessionAttributes(attributes);
```

---

## セッションからアトリビュートを取得する

```javascript
const attributes = handlerInput.attributesManager.getSessionAttributes();
let menu =  attributes.menu;
let amount = attributes.amount;
```

---

## OrderHandlerの処理

1. スロットもしくはセッションアトリビュートにmenu および amount の値が入っているかを調べる
2. menu がなければamountをセッションに保存し、menuを聞く
3. amount がなければmenuをセッションに保存し、amountを聞く
4. menu, amount の両方の値があれば、注文を処理して終了。

---

## セッションの仕組みをさぐる

[セッションの仕組みを探る](https://www.youtube.com/watch?v=3VNOZZp7ztg&feature=youtu.be)

<style type="text/css">
  .reveal h1,
  .reveal h2,
  .reveal h3,
  .reveal h4,
  .reveal h5,
  .reveal h6 {
    text-transform: none;
  }
.left {
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

---
