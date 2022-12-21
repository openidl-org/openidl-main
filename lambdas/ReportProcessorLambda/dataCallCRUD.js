const fetch = require('node-fetch');
const defaultconfig = require('config');
const logger = require('loglevel');
logger.setLevel(defaultconfig.get('loglevel'));
const config = require('./config/datacall-config.json')


async function login(baseURL, username, password) {
    logger.debug("Inside login")
    try {
        let response = await fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": username, "password": password }),
        });
        if (response.status !== 200) {
            throw new Error("Error response from Server: ", response.status)
        }
        result = await response.json()
        let userToken = result.result.userToken
        logger.debug("Login done")
        return userToken
    } catch (error) {
        logger.error("Error with login: " + error);
        return;
    }
}
async function callAPI(apiUrl, method, payload, token) {
    try {
        logger.debug("Calling API with URL: ", apiUrl)
        const apiFields = {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            }
        }
        if (method != "GET" && payload != "") {
            apiFields.body = payload;
        }

        let response = await fetch(apiUrl, apiFields);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error("Error response from Server: " + JSON.stringify(data.message))
        }
        logger.debug("CallAPI done")
        return data
    } catch (error) {
        logger.error("Error in calling API  " + error);
    }
}

module.exports.getDatacall = async function (datacallId) {
    logger.debug("Inside getDatacall")
    let URL = config.loginURL
    let userToken = await login(URL, config.username, config.password)
    payload = "";
    URL = config.getDatacallURL + datacallId
    const datacall = await callAPI(URL, "GET", payload, userToken);
    logger.debug("getDatacall done")
    return datacall;
}

module.exports.updateDatacall = async function (datacall) {
    logger.debug("Inside updateDatacall")
    let URL = config.loginURL
    let userToken = await login(URL, config.username, config.password)
    payload = datacall;
    URL = config.updateDatacallURL
    await callAPI(URL, "PUT", payload, userToken)
    logger.debug("updateDatacall done")
}



module.exports.postReport = async function (report) {
    logger.debug("Inside postreport")
    let URL = config.loginURL
    let userToken = await login(URL, config.username, config.password)
    payload = report;
    URL = config.postReportURL
    logger.debug("URL for postReport: ", URL)
    await callAPI(URL, "POST", payload, userToken)
    logger.debug("postReport done")
}

module.exports.getReport = async function (datacallId, version) {
    logger.debug("Inside getReport")
    let URL = config.loginURL
    let userToken = await login(URL, config.username, config.password)
    payload = "";
    URL = config.getReportURL
        + new URLSearchParams({
            dataCallId: datacallId,
            dataCallVersion: version
        })
    logger.debug("URL for getReport: ", URL)
    const datacall = await callAPI(URL, "GET", payload, userToken);
    logger.debug("getReport done")
    return datacall;
}

module.exports.getDMVData = async function (organizationId, transactionMonth) {
    logger.debug("Inside getDMVData")
    let URL = config.loginURL
    let userToken = await login(URL, config.username, config.password)
    payload = "";
    URL = config.getDMVDataURL
        + new URLSearchParams({
            organizationId: organizationId,
            transactionMonth: transactionMonth,
            isReport: true
        })
    logger.debug("URL for getDMVData: ", URL)
    const dmvData = await callAPI(URL, "GET", payload, userToken);
    logger.debug("getDMVData done")
    return dmvData;
}
