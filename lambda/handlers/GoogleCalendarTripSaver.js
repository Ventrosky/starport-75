const Alexa = require('ask-sdk-core');
const fetch = require('node-fetch');

function addOneToDate(yyyyMMddString) {
    var asDate = new Date(yyyyMMddString);
    asDate.setDate(asDate.getDate() + 1);
    return [ asDate.getFullYear(), ('0' + (asDate.getMonth() + 1)).slice(-2), ('0' + asDate.getDate()).slice(-2)].join('-');
}

module.exports = {
    async saveTrip(handlerInput, destination, departureDate, returnDate) {
        const accessToken = Alexa.getAccountLinkingAccessToken(handlerInput.requestEnvelope);
        const payload = {
            summary: `Trip to ${destination}`,
            description: `Trip to ${destination}`,
            start: { 'date': departureDate },
            end : { 'date': addOneToDate(returnDate) }
        };

        await fetch( 'https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }
};
