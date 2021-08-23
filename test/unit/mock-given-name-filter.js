const nock = require('nock');

module.exports = {
    onRequest: (test, requestEnvelope) => {
        const mockGivenName = test.testSuite.configuration.givenName;
        const TEST_API_ENDPOINT = 'https://api.endpoint.com';
        requestEnvelope.context.System.apiEndpoint = TEST_API_ENDPOINT;
        requestEnvelope.context.System.apiAccessToken = 'API_ACCESS_TOKEN';
        if (mockGivenName) {
            nock(TEST_API_ENDPOINT)
                .get('/v2/accounts/~current/settings/Profile.givenName')
                .reply(200, `"${mockGivenName}"`);
        } else {
            nock(TEST_API_ENDPOINT)
                .get('/v2/accounts/~current/settings/Profile.givenName')
                .reply(403,
                    {
                        "code": "ACCESS_DENIED",
                        "message": "Access denied with reason: FORBIDDEN"
                    });
        }
    }
};
