const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const config = require('config');
const server = require('../server/server');
const loginData = require('./data/login-credential.json').regulator;
chai.use(chaiHttp);

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
const url = `http://${host}:${port}`;



describe('Testing Server', () => {

    describe('/health', () => {
        let accessToken = "";
        before(async() => {
            const loginResponse = await chai.request(url).post('/openidl/api/login')
                .set('content-type', 'application/json')
                .send(loginData);
            expect(loginResponse.status).to.equal(200);
            expect(loginResponse.body).to.be.a('object');
            expect(loginResponse.body.result).to.be.a('object');
            expect(loginResponse.body.result.userToken).to.be.exist;
            const userToken = loginResponse.body.result.userToken;
            expect(userToken).to.be.a('string');
            accessToken = userToken;
        });

        it('should get status UP', async() => {

            const res = await chai.request(url).get('/openidl/api/health').set('Authorization', 'Bearer ' + accessToken);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.status).to.equal('UP');
        });
    });

    describe('/doesnotexist', () => {
        it('should return 404', async() => {
            const res = await chai.request(url).get('/openidl/api/doesnotexist')
            expect(res.status).to.equal(404);
            expect(res.body).to.be.a('object');
            expect(res.body.success).to.equal(false);
        });
    });

    describe('/', () => {
        it('should redirect to /api-docs', async() => {
            const res = await chai.request(url).get('/');
            expect(res).to.redirectTo(`${url}/api-docs`);
            expect(res.status).to.equal(200);
        });
    });
});