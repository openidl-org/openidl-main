const { Transaction } = require('@openidl-org/openidl-common-lib');
const transactionFactory = require('../../server/helpers/transaction-factory');

describe('transactionFactory', () => {

    it('init', () => {
        transactionFactory.init();
    });

    it('init should throw error', () => {
        jest.spyOn(Transaction, 'initWallet').mockImplementationOnce(() => {
            throw new Error();
        });
        transactionFactory.init();
    });

    it('getCarrierChannelTransaction', () => {
        const carrierChannelTransaction = transactionFactory.getCarrierChannelTransaction();
        expect(carrierChannelTransaction).toBeDefined();
    });
});