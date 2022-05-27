/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const AWS = require('aws-sdk');
const request = require("request-promise");
const Q = require("q");
var appUserRegister = {};
const config = require('../config/default.json');
const log4js = require('log4js');
const logger = log4js.getLogger('app - appuser');
logger.level = config.logLevel;

/**
 * Creates a user in aws cognito
 */
appUserRegister.createUserInCognito = async (usersConfig) => {
	let users = usersConfig.users;

	const cognitoConfig = JSON.parse(process.env.IDP_CONFIG);;
	AWS.config.update(JSON.parse(process.env.IDP_ADMIN_CONFIG));
	const accessparams = await getAccessParams(JSON.parse(process.env.IDP_ADMIN_CONFIG));
	const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
		accessparams,
		{
		apiVersion: '2016-04-18',
		region: cognitoConfig.region
	});

	for (var i = 0; i < users.length; i++) {
		logger.debug("Request > " + users[i]);
		let params = {
			UserPoolId: cognitoConfig.userPoolId,
			Username: users[i].username,
			TemporaryPassword: users[i].password,
			UserAttributes: [
				{
					Name: 'email_verified',
					Value: "true"
				}
			]
		};
		Object.keys(users[i].attributes).forEach(function (key) {
			params.UserAttributes.push({
				Name: key,
				Value: users[i].attributes[key]
			})
		});
		if (users[i].familyName) {
			params.UserAttributes.push({
				Name: 'family_name',
				Value: users[i].familyName
			})
		}
		if (users[i].givenName) {
			params.UserAttributes.push({
				Name: 'given_name',
				Value: users[i].givenName
			})
		}
		params.UserAttributes.push({
			Name: 'email',
			Value: users[i].email
		});
		await cognitoidentityserviceprovider.adminCreateUser(params).promise();

		params = {
			UserPoolId: cognitoConfig.userPoolId,
			Username: users[i].username,
			Password: users[i].password,
			Permanent: true
		};
		await cognitoidentityserviceprovider.adminSetUserPassword(params).promise();
	}
}


/**
 * Update user atrributes in aws cognito
 */
appUserRegister.updateCognitoUserAttributes = async (usersConfig) => {
	logger.info('updateCognitoUserAttributes method entry -');
	let users = usersConfig.users;

	const cognitoConfig = JSON.parse(process.env.IDP_CONFIG);;
	AWS.config.update(JSON.parse(process.env.IDP_ADMIN_CONFIG));
	const accessparams = await getAccessParams(JSON.parse(process.env.IDP_ADMIN_CONFIG));
	const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
		accessparams,
		{
		apiVersion: '2016-04-18',
		region: cognitoConfig.region
	});

	for (var i = 0; i < users.length; i++) {
		logger.debug("Request > " + users[i]);
		const params = {
			UserPoolId: cognitoConfig.userPoolId,
			Username: users[i].username,
			UserAttributes: []
		};
		Object.keys(users[i].attributes).forEach(function (key) {
			params.UserAttributes.push({
				Name: key,
				Value: users[i].attributes[key]
			})
		});
		if (users[i].familyName) {
			params.UserAttributes.push({
				Name: 'family_name',
				Value: users[i].familyName
			})
		}
		if (users[i].givenName) {
			params.UserAttributes.push({
				Name: 'given_name',
				Value: users[i].givenName
			})
		}
		if (users[i].email) {
			params.UserAttributes.push({
				Name: 'email',
				Value: users[i].email
			});
		}
		await cognitoidentityserviceprovider.adminUpdateUserAttributes(params).promise();
	}
}

/**
 * Creates a user in cloud directory
 */
appUserRegister.createUserInCloudDirectory = async (usersConfig) => {
	const appIdConfig = JSON.parse(process.env.IDP_CONFIG);
	const deferred = Q.defer();
	let users = usersConfig.users;
	var accessToken = usersConfig.authKey;
	var method = "POST"
	var url = appIdConfig.managementUrl + appIdConfig.cloudDirectoryPath;
	logger.debug("URL >> " + url);
	logger.debug(appIdConfig.managementUrl);
	var headers = {
		"Content-Type": "application/json",
		"Authorization": "Bearer " + accessToken
	};

	for (var i = 0; i < users.length; i++) {
		// var reqBody = users[i];
		const reqBody = {
			"directory": "cloud_directory",
			"name": {
				"givenName": users[i].givenName,
				"familyName": users[i].familyName,
			},
			"emails": [
				{
					"value": users[i].attributes.email,
					"primary": true
				}
			],
			"userName": users[i].username,
			"password": users[i].password,
			"status": "CONFIRMED",
			"profile": {
				"attributes": {
				}
			}
		}
		Object.keys(users[i].attributes).forEach(function (key) {
			reqBody.profile.attributes[key] = users[i].attributes[key];
		});
		logger.debug("Request > " + reqBody);
		logger.debug(reqBody);
		handleRequest(headers, reqBody, method, url, deferred, true);
	}
	return deferred.promise;
}
/**
 * Sign in the user to APPID
 */
appUserRegister.signInUserToAppId = async (usersConfig) => {
	const appIdConfig = JSON.parse(process.env.IDP_CONFIG);
	const deferred = Q.defer();
	let users = usersConfig.users;
	logger.debug(users)
	var method = "POST"
	var url = appIdConfig.oauthServerUrl + appIdConfig.tokenPath;
	logger.debug(new Buffer(appIdConfig.clientId + ":" + appIdConfig.secret).toString('base64'));
	var headers = {
		"Content-Type": "application/json",
		'Authorization': 'Basic ' + new Buffer(appIdConfig.clientId + ":" + appIdConfig.secret).toString('base64')
	};

	for (var i = 0; i < users.length; i++) {
		var reqBody = '{' + '"username":' + '"' + users[i].userName + '",' + '"password":' + '"' + users[i].password + '",' + '"grant_type":' + '"' + "password" + '"}';
		handleRequest(headers, reqBody, method, url, deferred, false);
	}
	return deferred.promise;
}


/**
 * Updates user profile attributes in APPID
 * No need to create user in appid as once it is signed in it is already activated in APP ID
 */
appUserRegister.updateUserProfileInAppId = async (usersConfig) => {
	const appIdConfig = JSON.parse(process.env.IDP_CONFIG);
	const deferred = Q.defer();
	let users = usersConfig.users;

	for (var i = 0; i < users.length; i++) {
		let email = users[i].emails[0].value;
		var accessToken = usersConfig.authKey;
		let response = await getUserIdFromAppId(accessToken, email);
		logger.debug("Response>>" + response);
		let appIdUserDetails = JSON.parse(response);

		var headers = {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		};

		logger.info("Users[i] >> " + users[i]);

		var method = "PUT";

		var url = appIdConfig.managementUrl + appIdConfig.usersPath + appIdUserDetails.users[0].id + appIdConfig.profilePath;
		var reqBody = JSON.stringify(users[i].profile);

		logger.info("Request" + reqBody);
		handleRequest(headers, reqBody, method, url, deferred);

	}
	return deferred.promise;
}

/**
 * Get users profile attributes using users email address
 * @param  user 
 */
async function getUserIdFromAppId(accessToken, email) {
	const appIdConfig = JSON.parse(process.env.IDP_CONFIG);
	const deferred = Q.defer();
	var method = "GET"
	// use first and only email id
	var url = appIdConfig.managementUrl + appIdConfig.userEmailPath + email;
	var headers = {
		"Content-Type": "application/json",
		"Authorization": "Bearer " + accessToken
	};
	let reqBody = JSON.stringify({});
	handleRequest(headers, reqBody, method, url, deferred);
	return deferred.promise;
}
 async function getAccessParams(bucketConfig) {
	if (!bucketConfig.region || !bucketConfig.accessKeyId
		|| ! bucketConfig.secretAccessKey || !bucketConfig.roleParams) {
			throw Error("Missing config for AWS")
		}
        const sts = new AWS.STS({
            region: bucketConfig.region,
            accessKeyId: bucketConfig.accessKeyId,
            secretAccessKey: bucketConfig.secretAccessKey

        });
        const params = bucketConfig.roleParams;

        const accessParamInfo = await sts.assumeRole(params).promise();
        logger.debug('Changed Credentials');

        const accessparams = {
            accessKeyId: accessParamInfo.Credentials.AccessKeyId,
            secretAccessKey: accessParamInfo.Credentials.SecretAccessKey,
            sessionToken: accessParamInfo.Credentials.SessionToken,
        };
        return accessparams;
    }
/**
 * Generic HTTP call
 * @param {*} headers 
 * @param {*} reqBody 
 * @param {*} method 
 * @param {*} url 
 * @param {*} deferred 
 * @param {*} isjson 
 */
async function handleRequest(headers, reqBody, method, url, deferred, isjson) {
	logger.debug(url)
	return request({
		url: url,
		method: method,
		body: reqBody,
		headers: headers,
		json: isjson
	}, function (err, response, body) {
		if (err) {
			logger.error(err);
			return deferred.reject(new Error("Failed to " + action));
		} else if (response.statusCode === 401 || response.statusCode === 403) {
			logger.error(err);
			return deferred.reject(new Error());
		} else if (response.statusCode === 404) {
			return deferred.reject(new Error("Not found"));
		} else if (response.statusCode === 409) {
			return deferred.reject(body);
		} else if (response.statusCode >= 200 && response.statusCode < 300) {
			return deferred.resolve(body ? body : null);
		} else {
			logger.error(err, response.headers);
			return deferred.reject(new Error("Unexpected error"));
		}
	});
}

module.exports = appUserRegister;