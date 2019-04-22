# 産業社会特講  
(スマートスピーカーアプリ開発)

2019/04/23

---

## 今回初回参加の場合アンケートに回答してください

* https://goo.gl/forms/8MKieMriDY94eL7x2

---

## 前回のおさらいのその前に

* チャットツールの導入をお願いします。
  * https://discord.gg/fSKHqQr
  * ユーザー名はメールアドレスの@tama.ac.jp の前を推奨します。

---

## 前回のおさらい

* Amazon開発者アカウントの作成
* Alexaアプリ(iOS / Android)の導入
* Alexa Skills BlueprintでノンプログラミングでのSkillの制作

---

## Alexa Skill で ハローワールド

1. [Alexa Skills Kit開発者コンソール](https://developer.amazon.com/alexa/console/ask#) に遷移します。
2. スキルの作成ボタンを押します。

--

## Alexa Skill で ハローワールド

3. スキル名を `ハローワールド` と入力します。
4. `スキルに追加するモデルを選択` は `カスタム`を選択します。
5. `スキルのバックエンドリソースをホスティングする方法を選択` は `Alexaがホスト` を選択します。


--
## Alexa Skill で ハローワールド

6. `スキルを作成` のボタンを押します。
4. `テスト` のタブを選択し、`このスキルでは、テストは無効になっています` の横のリストを `開発中` とすることでテストができるようになります。


--

## Alexa Skill で ハローワールド

8. `Alexaシミュレータ` に`ハローワールドを開いて`と入力し、Alexaが応答することを確認します。
9. 次に`ハロー` と入力することで、別の応答をすることを確認します。
10. 同様にスマートフォンに入れたAlexaアプリ上でも同じように発話することで、`Alexaシミュレータ`でうごかしたときと同じ反応をすることを確認します。


---

## Alexaに日本語を喋らせてみる。

コードエディタを開き、11行目や24行目を書き換え、`デプロイ` を押下し、その後テストでAlexaからの応答が変わったことを確認します。

---

## Alexaスキルのしくみ

https://www.youtube.com/watch?v=bzOeFN25sxU

---

## Alexa とは

クラウドベースの音声サービスで、Amazon EchoやAmazon Echo DotといったAlexa対応端末を通じて利用されます。Alexaからリクエストを受け取りレスポンスを返す独自サービスをクラウド上に作ることで、Alexaに新たな能力を追加することができます。

--

## Alexa とは

* 自動音声認識(ASR)
* 自然言語理解(NLU)
* 音声合成(TTS)
* 機械学習(ML)

---

## Alexaテクニカルドキュメント

[カスタムスキルのJSONインターフェースのリファレンス](https://developer.amazon.com/ja/docs/custom-skills/request-and-response-json-reference.html)

---

## Alexaスキルの種類

* カスタムスキル
* フラッシュブリーフィング
* スマートホーム

---

## カスタムスキル

* 呼び出し名
  * Alexa(ウェイクワード) xxx を開いて

<style type="text/css">
  .reveal h1,
  .reveal h2,
  .reveal h3,
  .reveal h4,
  .reveal h5,
  .reveal h6 {
    text-transform: none;
  }
</style>