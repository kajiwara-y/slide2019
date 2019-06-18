# Javascript 入門

APIと連携してみる

2019/06/11


## APIとは
Application Programming Interface（アプリケーション・プログラミング・インターフェイス）の略称です。

```
APIとは、あるコンピュータプログラム（ソフトウェア）の機能や管理するデータなどを、外部の他のプログラムから呼び出して利用するための手順やデータ形式などを定めた規約のこと。
```

---

## AWSだってAlexaだってFacebookだってGoogleだってAPI

(サービス名) API で検索してみてください。

--

## 閑話休題 AWSだってAPI

[なぜ技術ブログを書きまくるのか？
『Developers.IO』のクラスメソッドが教える、エンジニアの成長サイクル](https://logmi.jp/tech/articles/282034)

---

## DiscordのAPIを探してみる

![sample](discord_api_result.png "サンプル")

---

## SDKを使う

使うサービスによっては、提供されているAPIを呼び出すツールとしてSDKが提供されているケースがあります。
この場合SDKを用いて実装することで、APIについては意識することなく実装を進めていくことが可能です。

---

## Discord.js

今回連絡用に用いているDiscordには[Discord.js](https://discord.js.org/#/)というSDKが提供されています。
こちらを用いてAlexaスキルからDiscordにメッセージを送ってみます。

---

## 実装方針

今回例では、Discordを見るのは店舗のスタッフというシナリオにします。
ユーザーがコーヒーを発注したら、Discordにその内容が転送されるといった内容を実装したいと思います。

---

## ハッピーパスを作る

* ハッピーパス、とはユーザとAlexaが適切なやり取りを最後までする内容のこと
* この時点で会話が長いと感じたらパスを考え直す
* 音声より画面がいい、と感じたらイチから考え直すことも

## 実装例

<div style="text-align: left;">
    <p class="left">
        <img class="icon" src="alexa.png" alt="alexa" title="Alexa">「コーヒーを2つですね。ご利用ありがとうございます。」
    </p>
</div>
