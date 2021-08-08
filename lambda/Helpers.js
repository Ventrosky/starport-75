const Alexa = require('ask-sdk-core');

const getResolvedSlotValue = (requestEnvelope, slotName) => {
    const slotResolution = Alexa.getSlot(requestEnvelope, slotName)
        .resolutions.resolutionsPerAuthority[0];
    return slotResolution.status.code === 'ER_SUCCESS_MATCH' ? slotResolution.values[0].value.name : Alexa.getSlotValue(requestEnvelope, slotName);
};
module.exports = getResolvedSlotValue;