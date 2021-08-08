// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const i18next = require('i18next');
const languageStrings = require('./languageStrings');
const ScheduleTripIntentHandler = require('./handlers/ScheduleTripIntentHandler');
const HelloWorldIntentHandler = require('./handlers/HelloWorldIntentHandler');
const FavoritePlanetsIntentHandler = require('./handlers/FavoritePlanetsIntentHandler');
const StandardHandlers = require('./handlers/StandardHandlers');

const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18next.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((i18n) => {
            handlerInput.t = (...args) => i18n(...args);
        });
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        HelloWorldIntentHandler,
        ScheduleTripIntentHandler,
        FavoritePlanetsIntentHandler,
        StandardHandlers.LaunchRequestHandler,
        StandardHandlers.HelpIntentHandler,
        StandardHandlers.CancelAndStopIntentHandler,
        StandardHandlers.FallbackIntentHandler,
        StandardHandlers.SessionEndedRequestHandler,
        StandardHandlers.IntentReflectorHandler
        ) 
    .addErrorHandlers(
        StandardHandlers.ErrorHandler,
        )
    .addRequestInterceptors(
        LocalisationRequestInterceptor
        )
    .lambda();
