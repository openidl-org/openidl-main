//
// SPDX-License-Identifier: Apache-2.0
//
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const host = "localhost"
const port = "8080"
const url = 'http://localhost:8080/openidl/api'

const loginData = require('./data/login-credential.json').regulator;

const ExtractionPatternManager = require('../service/extraction-pattern-manager')

describe('Testing the api', () => {

    describe('api tests', () => {

        before(async () => {
            const loginResponse = await chai.request(url).post('/login')
                .set('content-type', 'application/json')
                .send(loginData);
            expect(loginResponse.status).to.equal(200);
            expect(loginResponse.body).to.be.a('object');
            expect(loginResponse.body.result).to.be.a('object');
            expect(loginResponse.body.result.apiToken).to.be.exist;
            let apiToken = JSON.parse(loginResponse.body.result.apiToken);
            expect(apiToken).to.be.a('object');
            expect(apiToken.accessToken).to.be.a('string');
            accessToken = apiToken.accessToken;
        })

        it('should get status UP', async() => {

            const res = await chai.request(url).get('/health').set('Authorization', 'Bearer ' + accessToken);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.status).to.equal('UP');
        });

        it('should get ping', async() => {

            const res = await chai.request(url).get('/ping').set('Authorization', 'Bearer ' + accessToken);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.result).to.equal('Ping OK');
        });

        it('should get list of extraction patterns', async() => {

            const res = await chai.request(url).get('/list-extraction-patterns').set('Authorization', 'Bearer ' + accessToken);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.success).to.equal(true);
            var patterns = JSON.parse(res.body.result)
            expect(patterns).to.be.a('array');
            expect(patterns.length).to.eq(4)
        });

        // it('create a new extracton patter', async () => {
        //     var manager = new ExtractionPatternManager()
        //     let map = function map() {
        //         emit( this.SequenceNum, {"sicCode": this.agrmnt.bsnssActvty[0].indstryCd})
        //     }
        //     let reduce = function reduce(key,value) {
        //         return value;
        //     }
          
        //     var ep = manager.createExtractionPattern("ep01","extracton pattern 01", "described", map, reduce, "0.1", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "jack.bubba@bubba.com")

        //     const res = await chai.request(url).post('/create-extraction-pattern').set('Authorization', 'Bearer ' + accessToken).send(ep);
        //     expect(res.status).to.equal(200)
        // })
     })

})