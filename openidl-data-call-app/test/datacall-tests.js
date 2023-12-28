const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const config = require('config');
const loginData = require('./data/login-credential.json').carrier;
const dataCallPostBody = require('./data/datacall-request-data.json');
chai.use(chaiHttp);

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
const url = `http://${host}:${port}/openidl/api`;
const server = require('../server/server');
let serverStart = false;
server.on('listened', () => {
    serverStart = true;
});
describe('Testing Regulator route ', () => {
    let accessToken = "";
    let orgId = "";
    let orgnizationType = "";
    let userName = "";
    let dataCallId = "";
    let version = '1';
    before(async() => {
        if (!serverStart) {
            await new Promise((resolve, reject) => {
                server.on('listened', () => {
                    console.log('server started inside test');
                    resolve();
                });
            });
        }
        const loginResponse = await chai.request(url).post('/login')
            .set('content-type', 'application/json')
            .send(loginData);
        expect(loginResponse.status).to.equal(200);
        expect(loginResponse.body).to.be.a('object');
        expect(loginResponse.body.result).to.be.a('object');
        expect(loginResponse.body.result.userToken).to.be.exist;
        const userToken = loginResponse.body.result.userToken;
        expect(userToken).to.be.a('string');
        accessToken = userToken;
        userName = loginResponse.body.result.username;
        orgId = loginResponse.body.result.attributes.organizationId;
        orgnizationType = loginResponse.body.result.attributes.role;

    });
    it('should create datacall ', async() => {
        const res = await chai.request(url).post('/data-call')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(dataCallPostBody);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');
        expect(res.body.dataCallId).to.be.a('string');
        dataCallId = res.body.dataCallId;
    });
    it('should get list datacalls by criteria ', async() => {
        const res = await chai.request(url).get('/list-data-calls-by-criteria')
            .set('Authorization', 'Bearer ' + accessToken)
            .query({
                'status': 'DRAFT',
                'pageSize': 10,
                'startIndex': 1,
                'version': 'latest'
            });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.result).to.exist;
        expect(res.body.message).to.not.exist;
        result = JSON.parse(res.body.result);
        expect(result.dataCallsList).to.be.a('array');
        expect(result.dataCallsList[0].dataCalls).to.be.a('object');
        expect(result.dataCallsList[0].dataCalls.status).to.equal('DRAFT');
    });

    it('should get all datacall versions by id ', async() => {
        const res = await chai.request(url).get('/data-call-versions/' + dataCallId)
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.not.exist;
        expect(res.body.success).to.equal(true);
        expect(res.body.result).to.exist;
        let result = JSON.parse(res.body.result);
        expect(result[0]).to.be.a('object');
        expect(result[0].id).to.equal(dataCallId);
        expect(result[0].version).to.equal(version);
        expect(result[0].status).to.equal('DRAFT');
    });

    it('should get datacall by id and version', async() => {
        const res = await chai.request(url).get('/data-call/' + dataCallId + '/' + version)
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.not.exist;
        expect(res.body.success).to.equal(true);
        expect(res.body.result).to.exist;
        const result = JSON.parse(res.body.result);
        expect(result).to.be.a('object');
        expect(result.id).to.equal(dataCallId);
        expect(result.version).to.equal(version);
        expect(result.status).to.equal('DRAFT');
    });

    it('should save new datacall draft ', async() => {
        dataCallPostBody['id'] = dataCallId;
        dataCallPostBody['version'] = version;
        dataCallPostBody['description'] = "data call save new draft ";
        const res = await chai.request(url).post('/save-new-draft')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(dataCallPostBody);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');
        dataCallPostBody['description'] = "description";
        const dataCallResponse = await chai.request(url).get('/data-call/' + dataCallId + '/2')
            .set('Authorization', 'Bearer ' + accessToken);
        expect(dataCallResponse.status).to.equal(200);
        expect(dataCallResponse.body).to.be.a('object');
        expect(dataCallResponse.body.message).to.not.exist;
        expect(dataCallResponse.body.success).to.equal(true);
        expect(dataCallResponse.body.result).to.exist;
        const result = JSON.parse(dataCallResponse.body.result);
        expect(result).to.be.a('object');
        expect(result.id).to.equal(dataCallId);
        expect(result.version).to.equal('2');
        expect(result.status).to.equal('DRAFT');

    });
    it('should ISSUE datacall ', async() => {
        let postData = {};
        postData['id'] = dataCallId;
        postData['version'] = version;
        postData['status'] = 'ISSUED';
        const res = await chai.request(url).put('/issue-data-call')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(postData);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');

        const dataCallResponse = await chai.request(url).get('/data-call/' + dataCallId + '/' + version)
            .set('Authorization', 'Bearer ' + accessToken);
        expect(dataCallResponse.status).to.equal(200);
        expect(dataCallResponse.body).to.be.a('object');
        expect(dataCallResponse.body.message).to.not.exist;
        expect(dataCallResponse.body.success).to.equal(true);
        expect(dataCallResponse.body.result).to.exist;
        const result = JSON.parse(dataCallResponse.body.result);
        expect(result).to.be.a('object');
        expect(result.id).to.equal(dataCallId);
        expect(result.version).to.equal(version);
        expect(result.status).to.equal('ISSUED');
    });

    it('should get data call logs ', async() => {
        const dataCallResponse = await chai.request(url).get('/data-call-log/' + dataCallId + '/' + version)
            .set('Authorization', 'Bearer ' + accessToken);
        expect(dataCallResponse.status).to.equal(200);
        expect(dataCallResponse.body).to.be.a('object');
        expect(dataCallResponse.body.message).to.not.exist;
        expect(dataCallResponse.body.success).to.equal(true);
        expect(dataCallResponse.body.result).to.exist;
        const result = JSON.parse(dataCallResponse.body.result);
        expect(result).to.be.exist;
        console.log('rsults-->');
        console.log(result);
        expect(result[0]).to.be.a('object');
        expect(result[0].actionID).to.be.equal('DATA_CALL_ISSUED');
    });

    it('should update delivery data in issued datacall ', async() => {
        let postData = {};
        postData['id'] = dataCallId;
        postData['version'] = version;
        let proposedDate = new Date();
        postData['proposedDeliveryDate'] = proposedDate.toISOString();
        const res = await chai.request(url).put('/data-call')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(postData);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');

        const dataCallResponse = await chai.request(url).get('/data-call/' + dataCallId + '/' + version)
            .set('Authorization', 'Bearer ' + accessToken);
        expect(dataCallResponse.status).to.equal(200);
        expect(dataCallResponse.body).to.be.a('object');
        expect(dataCallResponse.body.message).to.not.exist;
        expect(dataCallResponse.body.success).to.equal(true);
        expect(dataCallResponse.body.result).to.exist;
        const result = JSON.parse(dataCallResponse.body.result);
        expect(result).to.be.a('object');
        expect(result.id).to.equal(dataCallId);
        expect(result.version).to.equal(version);
        expect(result.proposedDeliveryDate).to.be.exist;
        expect(new Date(result.proposedDeliveryDate)).to.deep.equal(proposedDate);
    });


    it('should save and issue data call', async() => {
        const createResponse = await chai.request(url).post('/data-call')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(dataCallPostBody);
        expect(createResponse.status).to.equal(200);
        expect(createResponse.body).to.be.a('object');
        expect(createResponse.body.success).to.equal(true);
        expect(createResponse.body.message).to.equal('OK');
        expect(createResponse.body.dataCallId).to.be.a('string');
        dataCallPostBody.id = createResponse.body.dataCallId;
        dataCallPostBody.description = 'save and issue data call';

        const res = await chai.request(url).post('/save-and-issue-data-call')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(dataCallPostBody);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');

        const dataCallResponse = await chai.request(url).get('/data-call/' + dataCallPostBody.id + '/2')
            .set('Authorization', 'Bearer ' + accessToken);
        expect(dataCallResponse.status).to.equal(200);
        expect(dataCallResponse.body).to.be.a('object');
        expect(dataCallResponse.body.message).to.not.exist;
        expect(dataCallResponse.body.success).to.equal(true);
        expect(dataCallResponse.body.result).to.exist;
        const result = JSON.parse(dataCallResponse.body.result);
        expect(result).to.be.a('object');
        expect(result.id).to.equal(dataCallPostBody.id);
        expect(result.version).to.equal('2');
        expect(result.status).to.equal('ISSUED');
        expect(result.description).to.equal('save and issue data call');
    });

    it('should get block explorer info', async() => {
        const res = await chai.request(url).get('/block-explorer')
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.not.exist;
        expect(res.body.success).to.equal(true);
        expect(res.body.result).to.exist;
        expect(res.body.result).to.be.a('array');
    });

    describe('Carrier consent tests', async() => {
        it('should provide consent to data call ', async() => {
            const consentDataCallRequestData = {
                "datacallID": dataCallId,
                "dataCallVersion": version,
                "carrierID": orgId,
                "carrierName": userName,
                "createdBy": userName

            }
            const res = await chai.request(url).post('/consent')
                .set('content-type', 'application/json')
                .set('Authorization', 'Bearer ' + accessToken)
                .send(consentDataCallRequestData);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('OK');
        });
        it('should get datacall consent status', async() => {
            const listResponse = await chai.request(url).get('/consent-status-data-call/' + dataCallId + '/' + version + '/' + orgId)
                .set('Authorization', 'Bearer ' + accessToken);
            expect(listResponse.status).to.equal(200);
            expect(listResponse.body).to.be.a('object');
            expect(listResponse.body.success).to.equal(true);
            expect(listResponse.body.result).to.be.exist;
            const result = JSON.parse(listResponse.body.result);
            expect(result).to.be.a('array');
            expect(result).has.length;
            expect(result[0]).to.be.exist;
            expect(result[0].consent).to.be.exist;
            expect(result[0].consent.datacallID).to.equal(dataCallId);
            expect(result[0].consent.dataCallVersion).to.equal('1');
            expect(result[0].consent.carrierID).to.equal(orgId);
        });
        it('should get datacall consent count', async() => {
            const countResponse = await chai.request(url).get('/consent-count/' + dataCallId + '/' + version)
                .set('Authorization', 'Bearer ' + accessToken);
            expect(countResponse.status).to.equal(200);
            expect(countResponse.body).to.be.a('object');
            expect(countResponse.body.success).to.equal(true);
            expect(countResponse.body.result).to.be.exist;
            const count = JSON.parse(countResponse.body.result);
            expect(count.delta).to.be.exist;

        });
    });
});