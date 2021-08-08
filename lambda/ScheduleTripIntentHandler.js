const Alexa = require('ask-sdk-core');
const getResolvedSlotValue = require('./Helpers');

const ScheduleTripIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleTripIntent';
    },
    handle(handlerInput) {
        const destination = getResolvedSlotValue(handlerInput.requestEnvelope, 'destination');
        const departureDate = Alexa.getSlotValue(handlerInput.requestEnvelope, 'departureDate');
        const returnDate = Alexa.getSlotValue(handlerInput.requestEnvelope, 'returnDate');
        const speakOutput = handlerInput.t('SCHEDULED_MSG', {
            destination: destination,
            departureDate: departureDate,
            returnDate: returnDate
        });
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};

module.exports=ScheduleTripIntentHandler;