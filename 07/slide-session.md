# セッションとは

(スマートスピーカーアプリ開発)

2019/05/27

---

## 以下のようなケースの場合どうなるでしょうか？

- ユーザーが商品だけを発話し、数量を言わなかった場合
- ユーザーが数量だけを発話し、商品を言わなかった場合

---

## セッションアトリビュート

ユーザーが対話を継続している間(セッション)、一時的に情報を保存することができます。
セッションアトリビュートを用いたスキルの以下のような会話の流れになります。

--

## セッションアトリビュート

<div style="text-align: left;">
<p>
  <img src="user.png" alt="user" title="ユーザー">「アレクサ、コーヒーショップを開いて、コーヒーをください」
</p> 
<p>
  <img src="alexa.png" alt="alexa" title="Alexa">「コーヒーですね。おいくつご用意しましょうか?」
</p>
<p>
  <img src="user.png" alt="user" title="ユーザー">「二つお願い」</p>
</p>
</div>

--

## セッションアトリビュート

<div style="text-align: left;">

<p>
  <img src="alexa.png" alt="alexa" title="Alexa">「コーヒーを2つですね。お砂糖はおつけしますか?」
</p>
<p>
  <img src="user.png" alt="user" title="ユーザー">「はい」
</p> 
<p>
  <img src="alexa.png" alt="alexa" title="Alexa">「コーヒー２つ、お砂糖つけてご用意します。ご利用ありがとうございました。」
</p>
</div>

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
