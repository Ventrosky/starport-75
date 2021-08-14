const Alexa = require('ask-sdk-core');
const getResolvedSlotValue = require('../Helpers');

const ScheduleTripIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' 
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleTripIntent' 
            && Alexa.getRequest(handlerInput.requestEnvelope).intent.confirmationStatus === 'CONFIRMED'
            && Alexa.getDialogState(handlerInput.requestEnvelope) !== 'COMPLETED';
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

const ScheduleTripIntentHandler_InProgress = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' 
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleTripIntent' 
            && Alexa.getDialogState(handlerInput.requestEnvelope) !== 'COMPLETED';
    },
    handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        const departureString = Alexa.getSlotValue(handlerInput.requestEnvelope, 'departureDate');
        const returnString = Alexa.getSlotValue(handlerInput.requestEnvelope, 'returnDate');
        if (departureString && returnString) {
            const departureDate = new Date(departureString);
            const returnDate = new Date(returnString);
            if (departureDate >= returnDate) {
                currentIntent.slots['returnDate'].value = null;
                const speakOutput = handlerInput.t('DATE_MSG');
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    // sends a directive to Alexa, telling her to carry on with automatic dialog delegation
                    // same as if we had set the “delegationStrategy” to “ALWAYS”.
                    .addDelegateDirective(currentIntent)
                    .getResponse();
            }
        }
        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
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
    Denied: ScheduleTripIntentHandler_DENIED,
    InProgress: ScheduleTripIntentHandler_InProgress,
}