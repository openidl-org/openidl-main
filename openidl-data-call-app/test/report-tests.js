const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const config = require('config');

const server = require('../server/server');
const loginData = require('./data/login-credential.json').statagent;
const reportRequestData = require('./data/report-request-data.json');
chai.use(chaiHttp);

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
const url = `http://${host}:${port}/openidl/api`;

describe('Testing report route ', () => {
    let accessToken = "";
    let dataCallId = "";
    let version = "";
    let reportVersion = "";
    before(async() => {
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

        const res = await chai.request(url).get('/list-data-calls-by-criteria')
            .set('Authorization', 'Bearer ' + accessToken)
            .query({
                'status': 'ISSUED',
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
        expect(result.dataCallsList[0].dataCalls.status).to.equal('ISSUED');
        dataCallId = result.dataCallsList[0].dataCalls.id;
        version = result.dataCallsList[0].dataCalls.version;
    });
    it('should create report ', async() => {
        reportRequestData['dataCallID'] = dataCallId;
        reportRequestData['dataCallVersion'] = version;
        reportRequestData['hash'] = 'test_hash_' + Math.floor(100000 + Math.random() * 900000);
        const res = await chai.request(url).post('/report')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(reportRequestData);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');
        const reportListResponse = await chai.request(url).get('/report')
            .query({
                "startIndex": 1,
                "pageSize": 10,
                "dataCallVersion": version,
                "dataCallID": dataCallId
            })
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(reportRequestData);
        expect(reportListResponse.status).to.equal(200);
        expect(reportListResponse.body).to.be.a('object');
        expect(reportListResponse.body.success).to.equal(true);
        expect(reportListResponse.body.result).to.be.exist;
        const result = JSON.parse(reportListResponse.body.result);
        expect(result).to.be.a('array');
        expect(result[0]).to.be.a('object');
        reportVersion = result[0].reportVersion;
    });

    // it('regulator should update report ', async () => {
    //     reportRequestData['dataCallID'] = dataCallId;
    //     reportRequestData['dataCallVersion'] = version;
    //     reportRequestData['reportVersion']=reportVersion;
    //     reportRequestData['status'] = "ACCEPTED";
    //     const res = await chai.request(url).put('/report')
    //         .set('content-type', 'application/json')
    //         .set('Authorization', 'Bearer ' + accessToken)
    //         .send(reportRequestData);
    //     expect(res.status).to.equal(200);
    //     expect(res.body).to.be.a('object');
    //     expect(res.body.success).to.equal(true);
    //     expect(res.body.message).to.equal('OK');
    //     const reportListResponse = await chai.request(url).get('/report')
    //         .query({
    //             "startIndex": 1,
    //             "pageSize": 10,
    //             "dataCallVersion": version,
    //             "dataCallID": dataCallId
    //         })
    //         .set('content-type', 'application/json')
    //         .set('Authorization', 'Bearer ' + accessToken)
    //         .send(reportRequestData);
    //     expect(reportListResponse.status).to.equal(200);
    //     expect(reportListResponse.body).to.be.a('object');
    //     expect(reportListResponse.body.success).to.equal(true);
    //     expect(reportListResponse.body.result).to.be.exist;
    //     const result = JSON.parse(reportListResponse.body.result);
    //     expect(result).to.be.a('array');
    //     expect(result[0]).to.be.a('object');

    // });

});