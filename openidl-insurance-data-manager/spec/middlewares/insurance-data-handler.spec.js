const insuranceDataHandler = require('../../server/middlewares/insurance-data-handler');
const emailHander = require('../../server/middlewares/sendemail');
const transactionFactory = require('../../server/helpers/transaction-factory');

// set some default value
const mockEmailData = [
    {
        fromemailaddress: 'sender-1@xyz.com',
        toemailaddress: 'receiver-1@xyz.com',
        emailsubject: 'test mail - <<BATCHID>>',
        bodytext: 'Hi, This is a test email.',
        service: 'mailer'
    },
    {
        fromemailaddress: 'sender-2@xyz.com',
        toemailaddress: 'receiver-2@xyz.com',
        emailsubject: 'test mail - <<BATCHID>>',
        bodytext: 'Hi, This is a test email.',
        service: 'dbDown'
    }
]
// const localMongoConfig = {
//     "persistentStore": "mongo",
//     "mongodb": "openidloffchaindb",
//     "simpleURI": global.__MONGO_URI__
// };
// process.env['OFF_CHAIN_DB_CONFIG'] =
//     JSON.stringify(localMongoConfig);

const validSaveInsuranceDataReq = { 
    batchId: '11',
    chunkId: '11',
    carrierId: '11',
    records: [1, 2] 
};

jest.mock('../../server/config/email.json', () => {
    return {
        Config: [
            {
                service: 'mailer'
            },
            {
                service: 'dbDown'
            }
        ]
    };
});

describe('insurance-data-handler', () => {
    describe('invokeEmail', () => {
        it('should successfully send the email.', () => {
            const sendEmailSpy = jest.spyOn(emailHander, 'sendEmail').mockImplementationOnce(() => {
                return Promise.resolve(true);
            });
            insuranceDataHandler.invokeEmail(mockEmailData, '', 'mailer', '', '', 100);
            expect(sendEmailSpy).toHaveBeenCalledTimes(1);
        });
        it('should log error message..', () => {
            const sendEmailSpy = jest.spyOn(emailHander, 'sendEmail');
            insuranceDataHandler.invokeEmail([], '', 'mailer', '', '', 100);
            expect(sendEmailSpy).not.toHaveBeenCalled();
        });
    });

    describe('insertBulkDocuments', () => {
        it('should return 503 error.', async () => {
            const saveBulkDocSpy = jest.spyOn(insuranceDataHandler,'saveBulkDocuments').mockImplementationOnce(async ()=>{
                return Promise.resolve({statusCode: 503});
            });
            await insuranceDataHandler.insertBulkDocuments(validSaveInsuranceDataReq);
            expect(saveBulkDocSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('saveInsuranceDataHash', () => {
        it('should successfully save Insurance Data Hash', async () => {
            const submitTransSpy = jest.spyOn(transactionFactory, 'getCarrierChannelTransaction').mockImplementationOnce(() => {
                return {
                    submitTransaction: () => {}
                };
            });
            const response = await insuranceDataHandler.saveInsuranceDataHash('11','11','11',[{key1:'val1'},{key2: 'val2'}],[]);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(response.message).toContain('Insurance documents saved into HDS and Hash value stored into Blockchain successfully');
        });
        it('should return error while saving Insurance Data Hash', async () => {
            const submitTransSpy = jest.spyOn(transactionFactory, 'getCarrierChannelTransaction').mockImplementationOnce(() => {
                return {
                    submitTransaction: async () => {
                        return Promise.reject('Some Error.')
                    }
                };
            });
            const response = await insuranceDataHandler.saveInsuranceDataHash('11','11','11',[{key1:'val1'},{key2: 'val2'}],[]);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(response.message).toContain('Some Error.');
        });
        it('should return error while generating Data Hash', async () => {
            const response = await insuranceDataHandler.saveInsuranceDataHash('11','11','11',[],[]);
            expect(response.success).toBe(false);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('saveBulkDocuments', () => {
        it('should successfully save bulk documents', async () => {
            const dbSpy = jest.spyOn(insuranceDataHandler, 'dbConnection').mockImplementationOnce(async () => {
                return Promise.resolve({
                    saveBulkDocuments: async () => {
                        return Promise.resolve(true);
                    }
                });
            });
            const response = await insuranceDataHandler.saveBulkDocuments('11','11','11',[],'hdAlias');
            expect(dbSpy).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);
        });
        it('should throw error while saving documents', async () => {
            const dbSpy = jest.spyOn(insuranceDataHandler, 'dbConnection').mockImplementationOnce(async () => {
                return Promise.resolve({
                    saveBulkDocuments: async () => {
                        return Promise.reject(new Error('Some Error.'));
                    }
                });
            });
            const response = await insuranceDataHandler.saveBulkDocuments('11','11','11',[],'hdAlias');
            expect(dbSpy).toHaveBeenCalledTimes(1);
            expect(response.success).toBe(false);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('saveLogDocument', () => {
        it('should successfully save Log documents', async () => {
            const dbSpy = jest.spyOn(insuranceDataHandler, 'dbConnection').mockImplementationOnce(async () => {
                return Promise.resolve({
                    saveLogDocument: async () => {
                        return Promise.resolve(true);
                    }
                });
            });
            const response = await insuranceDataHandler.saveLogDocument('collectionName', {key1: 'val1', key2: 'val2'});
            expect(dbSpy).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);
        });
        it('should throw error while saving documents', async () => {
            const dbSpy = jest.spyOn(insuranceDataHandler, 'dbConnection').mockImplementationOnce(async () => {
                return Promise.resolve({
                    saveLogDocument: async () => {
                        return Promise.reject('Some Error.');
                    }
                });
            });
            let errMsg;
            try {
                const response = await insuranceDataHandler.saveLogDocument('collectionName', {key1: 'val1', key2: 'val2'});
            } catch (error) {
                errMsg = error;
            }
            expect(dbSpy).toHaveBeenCalledTimes(1);
            expect(errMsg).toBe('Some Error.');
        });
    });

    describe('deleteBulkDocuments', () => {
        it('should successfully delete Bulk Documents', async () => {
            const deleteSpy = jest.spyOn(insuranceDataHandler,'deleteDocuments').mockImplementationOnce(async () => {
                return Promise.resolve(true);
            });
            const response = await insuranceDataHandler.deleteBulkDocuments('11','11','11','hdAlias');
            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);
        });

        it('should throw error while deleting Bulk Documents', async () => {
            const deleteSpy = jest.spyOn(insuranceDataHandler,'deleteDocuments').mockImplementationOnce(async () => {
                return Promise.reject();
            });
            const response = await insuranceDataHandler.deleteBulkDocuments('11','11','11','hdAlias');
            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(response.success).toBe(false);
            expect(response.statusCode).toBe(500);
        });
    });

});