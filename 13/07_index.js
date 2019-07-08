// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'ドリンクショップへようこそ';
        const repromptText = '注文は何にしますか？'
        return handlerInput.responseBuilder
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
    handle(handlerInput) {
        let attributes = handlerInput.attributesManager.getSessionAttributes();
        let menu = Alexa.getSlotValue(handlerInput.requestEnvelope, "menu") || attributes.menu;
        let amount = Alexa.getSlotValue(handlerInput.requestEnvelope, "amount") || attributes.amount;
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
                if (amount === undefined) {
                    attributes.menu = menu;
                    handlerInput.attributesManager.setSessionAttributes(attributes);
                    const speechOutput = 'おいくつ注文しますか？'
                    const reprompt = 'おいくつ注文しますか？'
                    return handlerInput.responseBuilder
                        .speak(speechOutput)
                        .reprompt(reprompt)
                        .getResponse();
                }
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
            return handlerInput.responseBuilder
                .speak(speechText)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }

    }
};
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
    .lambda();
