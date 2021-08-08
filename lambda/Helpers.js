const Alexa = require('ask-sdk-core');

const extractValue= (sv) =>  {
    const slotResolution = sv.resolutions.resolutionsPerAuthority[0];
    return slotResolution.status.code === 'ER_SUCCESS_MATCH' ? slotResolution.values[0].value.name : Alexa.getSlotValue(requestEnvelope, slotName);
}

const getResolvedSlotValue = (requestEnvelope, slotName) => {
    const slotResolution = Alexa.getSlot(requestEnvelope, slotName);
    return extractValue(slotResolution)
};

const getResolvedSlotValueV2 = (requestEnvelope, slotName) => {
    const slotValueV2 = Alexa.getSlotValueV2(requestEnvelope, slotName);
    const simpleSlotValue = Alexa.getSimpleSlotValues(slotValueV2);
    return simpleSlotValue.map(sv => sv.resolutions ? extractValue(sv) : sv.value);
}

module.exports = {
    getResolvedSlotValue,
    getResolvedSlotValueV2
};
