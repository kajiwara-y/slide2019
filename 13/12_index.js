// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');
const request = require('request');
const util = require("./util.js")
const APLDocs = {
    launch: require('./documents/launchRequest.json'),
    order: require('./documents/order.json')
};
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        let speechText = 'ドリンクショップへようこそ';
        const repromptText = '注文は何にしますか？'
        // 永続アトリビュートから情報を取得
        const attr = await handlerInput.attributesManager.getPersistentAttributes();
        const lastOrder = attr.lastOrder;
        if (lastOrder !== undefined) {
            speechText += `前回は ${lastOrder}を注文しましたね。`;
        }
        const responseBuilder = handlerInput.responseBuilder;
        // APL対応デバイスかの確認を行う
        if (util.supportsAPL(handlerInput)) {
            // APL対応デバイスなら画面表示を行う
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: APLDocs.launch,
                datasources: {}
            });
        }
        return responseBuilder
            .speak(speechText + repromptText)
            .reprompt(repromptText)
            .getResponse();
    }
};
const OrderRequestIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OrderIntent';
    },
    async handle(handlerInput) {
        let attributes = handlerInput.attributesManager.getSessionAttributes();
        let menu = Alexa.getSlotValue(handlerInput.requestEnvelope, "menu") || attributes.menu;
        let amount = Alexa.getSlotValue(handlerInput.requestEnvelope, "amount") || attributes.amount;
        let menu_id = attributes.menu_id;
        // menuが判明していない
        if (menu === undefined) {
            attributes.amount = amount;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            const speechOutput = '何を注文しますか？'
            const reprompt = '何を注文しますか？'
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(reprompt)
                .getResponse();
        }
        // スロットの取得
        let menuSlot = Alexa.getSlot(handlerInput.requestEnvelope, "menu");
        // menuSlotの存在チェック
        if (menuSlot && menuSlot.resolutions) {
            // menuSlotが存在している かつ menuSlot.resolutionsが存在している = メニューに関連する発話の処理
            // ステータスコードの取得
            let status = menuSlot.resolutions.resolutionsPerAuthority[0].status.code;
            if (status === "ER_SUCCESS_MATCH") {
                // 数量が定義されていなかった
                const menu_id = menuSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
                attributes.menu_id = menu_id;
                if (amount === undefined) {
                    attributes.menu = menu;
                    const speechOutput = 'おいくつ注文しますか？'
                    const reprompt = 'おいくつ注文しますか？'
                    return handlerInput.responseBuilder
                        .speak(speechOutput)
                        .reprompt(reprompt)
                        .getResponse();
                }
                handlerInput.attributesManager.setSessionAttributes(attributes);
            } else {
                // ステータスコードを調べて、MATCHでない場合は商品提供できないため、その旨を伝える。
                let menu = Alexa.getSlotValue(handlerInput.requestEnvelope, "menu");
                const sorryMessage = `申し訳無いのですが、 ${menu} はご提供できません。 コーヒーはいかがですか？`
                const repromptText = 'コーヒーはいかがですか？'
                return handlerInput.responseBuilder
                    .speak(sorryMessage)
                    .reprompt(repromptText)
                    .getResponse();
            }
        }
        // menu amount が両方とも存在している場合 = 注文に必要な情報が全てある状態
        if (menu && amount) {
            const product_price = "200";
            const speechText = `${menu} ${amount}つですね、お支払いは${product_price *
                amount}円になります。ご利用ありがとうございます。`;

            // discordに注文情報を通知する
            sendDiscordMessage(`${menu}が ${amount} つ注文されました。準備をお願いします。`)
            // 注文した商品情報を永続アトリビュートに書き込む
            const attr = await handlerInput.attributesManager.getPersistentAttributes();
            attr.lastOrder = menu;
            handlerInput.attributesManager.setPersistentAttributes(attr);
            await handlerInput.attributesManager.savePersistentAttributes();
            const responseBuilder = handlerInput.responseBuilder;
            // APL対応デバイスかの確認を行う
            if (util.supportsAPL(handlerInput)) {
                // APL対応デバイスなら画面表示を行う
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    Version: '1.0',
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
            return responseBuilder
                .speak(speechText)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }

    }
};
const sendDiscordMessage = function(message) {
    const request = require('request');
    const discordWebHookUri = 'https://discordapp.com/api/webhooks/590278284491882536/IIFCbkyCfJmqI4PE5PLLzMDgDYvXRU6TzE8Gd_bQH-lHbg68ENBGmn2rS2G9utOBwfLC'
    const options = {
        uri: discordWebHookUri,
        headers: {
            "Content-type": "application/json",
        },
        json: {
            "username": "AlexaSkill DrinkShop",
            "content": message
        }
    };
    request.post(options, function(error, response, body) { });
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = '美味しいコーヒーを提供します。コーヒーはいかがですか？';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'またね!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `エラーが発生しました。もう一度発話してみてください。`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OrderRequestIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .withPersistenceAdapter(
        new persistenceAdapter.S3PersistenceAdapter(
            { bucketName: process.env.S3_PERSISTENCE_BUCKET }))
    .lambda();
