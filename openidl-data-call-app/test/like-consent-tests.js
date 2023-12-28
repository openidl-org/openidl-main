const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const config = require('config');

const server = require('../server/server');
const loginData = require('./data/login-credential.json');
const dataCallRequestData = require('./data/datacall-request-data.json');
chai.use(chaiHttp);

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
const url = `http://${host}:${port}/openidl/api`;

describe('Testing carrier route ', () => {
    let accessToken = "";
    let orgId = "";
    let orgnizationType = "";
    let userName = "";
    let datacallID = "";
    let DraftDataCalls = {};
    before(async() => {

        const loginResponse = await chai.request(url).post('/login')
            .set('content-type', 'application/json')
            .send(loginData.carrier);
        expect(loginResponse.status).to.equal(200);
        expect(loginResponse.body).to.be.a('object');
        expect(loginResponse.body.result).to.be.a('object');
        expect(loginResponse.body.result.username).to.be.a('string');
        expect(loginResponse.body.result.attributes).to.be.a('object');
        expect(loginResponse.body.result.attributes.role).to.be.a('string');
        expect(loginResponse.body.result.attributes.organizationId).to.be.a('string');
        expect(loginResponse.body.result.userToken).to.be.exist;
        const userToken = loginResponse.body.result.userToken;
        expect(userToken).to.be.a('string');
        accessToken = userToken;
        userName = loginResponse.body.result.username;
        orgId = loginResponse.body.result.attributes.organizationId;
        orgnizationType = loginResponse.body.result.attributes.role;

        const res = await chai.request(url).post('/data-call')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(dataCallRequestData);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');
        expect(res.body.dataCallId).to.be.a('string');
        datacallID = res.body.dataCallId;

    });
    it('should like data call ', async() => {
        const likeDataCallRequestData = {
            "datacallID": datacallID,
            "dataCallVersion": '1',
            "OrganizationType": orgnizationType,
            "OrganizationID": orgId,
            "UpdatedBy": userName,
            "liked": true
        }
        const res = await chai.request(url).post('/like')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(likeDataCallRequestData);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');
    });
    it('should get datacall like liked=true status', async() => {
        const listResponse = await chai.request(url).get('/like-status-data-call/' + datacallID + '/1/' + orgId)
            .set('Authorization', 'Bearer ' + accessToken);
        expect(listResponse.status).to.equal(200);
        expect(listResponse.body).to.be.a('object');
        expect(listResponse.body.success).to.equal(true);
        expect(listResponse.body.result).to.be.exist;
        const result = JSON.parse(listResponse.body.result);
        expect(result).to.be.a('array');
        expect(result).has.length;
        expect(result[0]).to.be.exist;
        expect(result[0].like).to.be.exist;
        expect(result[0].like.datacallID).to.equal(datacallID);
        expect(result[0].like.dataCallVersion).to.equal('1');
        expect(result[0].like.organizationID).to.equal(orgId);
        expect(result[0].like.liked).to.equal(true);

    });
    it('should get datacall like count', async() => {
        const countResponse = await chai.request(url).get('/like-count/' + datacallID + '/1')
            .set('Authorization', 'Bearer ' + accessToken);
        expect(countResponse.status).to.equal(200);
        expect(countResponse.body).to.be.a('object');
        expect(countResponse.body.success).to.equal(true);
        expect(countResponse.body.result).to.be.exist;
        let count = JSON.parse(countResponse.body.result);
        expect(count.delta).to.be.exist;
    });

    it('should unlike data call ', async() => {
        const likeDataCallRequestData = {
            "datacallID": datacallID,
            "dataCallVersion": '1',
            "OrganizationType": orgnizationType,
            "OrganizationID": orgId,
            "UpdatedBy": userName,
            "liked": false
        }
        const res = await chai.request(url).post('/like')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(likeDataCallRequestData);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('OK');
    });

    it('should get datacall like liked=false status', async() => {

        const listResponse = await chai.request(url).get('/like-status-data-call/' + datacallID + '/1/' + orgId)
            .set('Authorization', 'Bearer ' + accessToken);
        expect(listResponse.status).to.equal(200);
        expect(listResponse.body).to.be.a('object');
        expect(listResponse.body.success).to.equal(true);
        const result = JSON.parse(listResponse.body.result);
        expect(result).has.length;
        expect(result[0]).to.be.exist;
        expect(result[0].like).to.be.exist;
        expect(result[0].like.datacallID).to.equal(datacallID);
        expect(result[0].like.dataCallVersion).to.equal('1');
        expect(result[0].like.organizationID).to.equal(orgId);
        expect(result[0].like.liked).to.equal(false);
    });


});