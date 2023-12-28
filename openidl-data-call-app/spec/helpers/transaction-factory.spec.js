const { Transaction } = require('@openidl-org/openidl-common-lib');
const transactionFactory = require('../../server/helpers/transaction-factory');

describe('transactionFactory', () => {
    it('should successfully call init', ()=> {
        const initSpy = jest.spyOn(Transaction,'initWallet').mockImplementationOnce(()=>{
            return;
        });
        transactionFactory.init();
        expect(initSpy).toHaveBeenCalledTimes(1);
    });
    it('init should throw error', ()=> {
        const initSpy = jest.spyOn(Transaction,'initWallet').mockImplementationOnce(()=>{
            throw new Error();
        });
        transactionFactory.init();
        expect(initSpy).toHaveBeenCalledTimes(1);
    });
    it('getDefaultChannelTransaction',() => {
        const defaultChannelTransaction = transactionFactory.getDefaultChannelTransaction();
        expect(defaultChannelTransaction).toBeDefined();
    });
    it('getCarrierChannelTransaction', () => {
        const carrierChannelTransaction = transactionFactory.getCarrierChannelTransaction();
        expect(carrierChannelTransaction).toBeDefined();
    });
});