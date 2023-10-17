const { setListenerConfig } = require('../helpers/');

describe('setListenerConfig', () => {
    it('should return a listener config object with the expected properties', async () => {
        // Arrange
        const expectedListenerConfig = {
            applicationName: 'myApp',
            identity: {
                user: 'myUser',
                wallet: 'myWallet'
            },
            listenerChannels: [
                {
                    channelName: 'channel1',
                    events: [
                        { 'event1': expect.any(Function) },
                        { 'event2': expect.any(Function) },
                    ]
                },
                {
                    channelName: 'channel2',
                    events: [
                        { 'event3': expect.any(Function) }
                    ]
                }
            ]
        };

        // Act
        const listenerConfig = await setListenerConfig();

        // Assert
        expect(listenerConfig).toMatchObject(expectedListenerConfig);
    });
});
