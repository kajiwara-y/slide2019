# ASK SDK for Node.js

2019/05/07

---

## Alexa Skills Kit SDK for Node.js(ASK SDK for Node.js)

* [AlexaのGithubのページ](https://github.com/alexa/) 
* [alexa-skills-kit-sdk-for-nodejs](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) を選び日本語の[技術資料](https://ask-sdk-for-nodejs.readthedocs.io/ja/latest/)
* [初めてのスキル開発](https://ask-sdk-for-nodejs.readthedocs.io/ja/latest/Developing-Your-First-Skill.html)


---

## プログラムコードの基本構造

[S2-EP9 ASK SDK for Node js を使おう](https://youtu.be/itsNdkr8btU?t=138)

---

## リクエストハンドラを追加する(1)

18行目 `HelloWorldIntentHandler` を `OrderRequestIntentHandler`とします。
21行目 `HelloWorldIntent` を `OrderRequestIntent`とします。

--

## リクエストハンドラを追加する(2)

コード内の111行目の `HelloWorldIntentHandler` を `OrderRequestIntentHandler`とします。

---

## レスポンスビルダーを使いこなす

[ドキュメント](https://ask-sdk-for-nodejs.readthedocs.io/ja/latest/Building-Response.html)
[レスポンスビルダーの例](https://youtu.be/ugdC1G5y_Z8?t=157)

---

## レスポンス(応答)を実装する

各種Handler内のspeechText を書き換えて実装を進めていきます。

* `LaunchRequestHandler` はrepromtする際の内容は`speechText` と別の内容とします。
* `OrderIntentHandler` は注文後にくるので、repromptは不要です。
* `HelpIntentHandler` は使い方を聞く箇所になるので、問いかけである必要があります。
* `CancelAndStopIntentHandler` は処理を中断するメッセージとします。

--

## レスポンス(応答)を実装する

* `IntentReflectorHandler` はIntentとしてのリクエストだが、コード内にマッチしなかった場合に来る箇所になります。

* `ErrorHandler` はエラーがあった際に動きます。