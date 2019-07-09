# 産業社会特講

(スマートスピーカーアプリ開発)

2019/07/09

---

## 前回のおさらい

- APL を用いた画面付きスキルの開発
- [シノニムの解決に関して](https://dev.classmethod.jp/cloud/alexa-dialog-model-validate/)

---

## ここまでのおさらい

- Alexa ブループリントでスキルを作成する(第２回)

--

- カスタムスキルを作成する (第３回)
- 対話モデル (第４回)
  - インテントとサンプル発話
    - ビルドインインテント
    - カスタムインテント
- Alexa Skills Kit SDK for Node.js を用いた実装(第４回)
  - リクエストハンドラ
  - レスポンスビルダーを用いたレスポンスの実装

--

- スロット(第５回)
  - ビルドインスロットタイプ
  - カスタムスロットタイプ
- リクエストからのスロット値の取得(第５回)
- シノニム(同義語)(第６回)

--

- セッションアトリビュート(第７・８回)
- 永続アトリビュート(第９回)
  - AWS S3

--

- Discord 連携(第１０回)

--

- Display インターフェース(第１１回)
- APL(第１２回)

---

## おさらいサンプルを作成しました。

[kajiwara-y/coffeeshop_2019](https://github.com/kajiwara-y/coffeeshop_2019)

--

## 適用方法

1. Commits から適用したい授業の回を選択します。
2. 適用するファイルは下記のファイルになります。
   - coffeeshop_2019/lambda/ 以下のファイル
   - coffeeshop_2019/models/ 以下のファイル

--

3. ファイルを選択し、Raw というボタンを押します。
4. coffeeshop_2019/lambda/ 以下のファイルの場合は、内容をすべてコピーし、その内容を Alexa コードエディタに貼り付けます。

5. coffeeshop_2019/models/ 以下のファイルの場合は、内容をすべてコピーし、その内容を JSON エディタに貼り付けます。

---

## 画面のボタン押下に対応してみる

デモ

---

## 実装

[差分](https://github.com/kajiwara-y/coffeeshop_2019/commit/b7bd6597658fd33a7589c81ce66ac77498ae4f52#diff-66148b0a8271f0a4b53efc334387c8b1)

--

[documents/launchRequest.json](https://github.com/kajiwara-y/coffeeshop_2019/blob/b7bd6597658fd33a7589c81ce66ac77498ae4f52/lambda/documents/launchRequest.json)

--

[lambda/index.js](https://github.com/kajiwara-y/coffeeshop_2019/blob/b7bd6597658fd33a7589c81ce66ac77498ae4f52/lambda/index.js)