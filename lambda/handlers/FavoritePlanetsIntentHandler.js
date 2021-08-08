const Alexa = require('ask-sdk-core');
const { getResolvedSlotValueV2 } = require('../Helpers');

const FavoritePlanetsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FavoritePlanetsIntent';
    },
    handle(handlerInput) {
        const planets = getResolvedSlotValueV2(handlerInput.requestEnvelope, 'planets');

        const planetList = planets.slice(0, -1).join(', ') + ' and ' + planets.slice(-1);
        const speakOutput = `I like ${planetList}, too!`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

module.exports=FavoritePlanetsIntentHandler;
