# 産業社会特講

(スマートスピーカーアプリ開発)

2019/06/11

---

## 前回のおさらい

- セッションアトリビュート

---

## 永続アトリビュート

セッションをまたがるアトリビュートを管理する方法です。

AWS DynamoDBまたは、AWS S3を用いた方法が SDKから提供されています。

今回のスキルを実装しているAlexa Hosted SkillではAWS S3をサポートしています。


---

## AWS S3

![S3](./Amazon-Simple-Storage-Service-S3_light-bg.png "サンプル")

---

## AWS S3

Amazon Web Services(AWS) が提供するストレージサービスです。
イレブン・ナインとも言われる耐久性が特徴のストレージで、様々なAWSのサービスで、
世界中の何百万ものアプリケーションのデータを保存するのに用いられています。


---

## AWS S3  を利用する際の制限

Amazon S3： 月あたり、5 GBのAmazon S3ストレージ、20,000件のGETリクエスト、2,000件のPUTリクエスト、15 GBのデータ転送を利用できます

[Alexa-hostedスキルを使用してスキルをエンドツーエンドで作成する](https://developer.amazon.com/ja/docs/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html?&sc_category=Owned&sc_channel=BG&sc_campaign=roundup&sc_content_category=Prodictivity&sc_funnel=&sc_country=WW&sc_segment=)


---


## 閑話休題: AWS S3の利用料金

最初の 50 TB/月	0.025USD/GB

[Amazon S3 の料金](https://aws.amazon.com/jp/s3/pricing/)


