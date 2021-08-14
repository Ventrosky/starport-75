const Alexa = require('ask-sdk-core');
const getResolvedSlotValue = require('../Helpers');

const ScheduleTripIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' 
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleTripIntent' 
            && Alexa.getRequest(handlerInput.requestEnvelope).intent.confirmationStatus === 'CONFIRMED';
    },
    handle(handlerInput) {
        const destination = getResolvedSlotValue(handlerInput.requestEnvelope, 'destination');
        // const departureDate = Alexa.getSlotValue(handlerInput.requestEnvelope, 'departureDate');
        // const returnDate = Alexa.getSlotValue(handlerInput.requestEnvelope, 'returnDate');
        const speakOutput = handlerInput.t('SCHEDULED_MSG', {
            destination: destination
        });
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const ScheduleTripIntentHandler_DENIED = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleTripIntent' && Alexa.getRequest(handlerInput.requestEnvelope).intent.confirmationStatus === 'DENIED';
    },
    handle(handlerInput) {
        // const destinationSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'destination');
        // const destinationSlotJSON = JSON.stringify(destinationSlot);
        const speakOutput = handlerInput.t('DENIED_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("How can I help you?")
            .getResponse();
    },
};

module.exports={
    Confirmed: ScheduleTripIntentHandler,
    Denied: ScheduleTripIntentHandler_DENIED
}