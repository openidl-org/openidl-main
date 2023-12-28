const util = require('../../server/helpers/util');

describe('util', () => {
    it('should return sendResponse payload', ()=> {
        const msg = {statusCode:200, success:true, message:'Success Message'};
        let jsonResponse;
        const res = {
            statusCode:0,
            setHeader: () => {},
            json: (payload) => {
                jsonResponse = payload;
            }
        }; 
        util.sendResponse(res,msg);
        expect(res.statusCode).toBe(200);
        expect(jsonResponse).toEqual({success:true, message:'Success Message'});
    });
    it('should get Network Config File Path', ()=>{
        const filePath = util.getNetworkConfigFilePath('openidl-org');
        expect(filePath).toContain('fabric-network/network-config-openidl-org.json');
    });
});