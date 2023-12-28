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

const config = require('../config/app-config');
const appUserRegistration = require('./app-user');
const selectedOption = process.argv[4];
const log4js = require('log4js');
const logger = log4js.getLogger('app - app-user registration');
logger.level = config.logLevel;
logger.info("Selected Option >> " + selectedOption);
const usersConfig = require('../config/user-config.json');
logger.info("User Details config file >> " + usersConfig);

async function main() {
	logger.info('Start Executing Job');
	const idpConfig = JSON.parse(process.env.IDP_CONFIG);
	if (selectedOption === "-c") {
		switch (idpConfig.idpType) {
			case "appid":
				// Step 1 Create User in Cloud Directory
				await appUserRegistration.createUserInCloudDirectory(usersConfig);
				// Step 2 Sign in user to App ID
				await appUserRegistration.signInUserToAppId(usersConfig);
				// Step 3 Update user's profile attributes in App ID
				await appUserRegistration.updateUserProfileInAppId(usersConfig);
				break;
			case "cognito":
				await appUserRegistration.createUserInCognito(usersConfig);
				break;
			default:
				logger.error("Incorrect Usage of identity provider type. Refer README for more details");
				break;
		}
	} else if (selectedOption === "-u") {
		switch (idpConfig.idpType) {
			case "appid":
				// Step 1 Sign in user to App ID to get user's internal resource id
				await appUserRegistration.signInUserToAppId(usersConfig);
				// Step 2 Update user's profile attributes in App ID
				await appUserRegistration.updateUserProfileInAppId(usersConfig);
			case "cognito":
				await appUserRegistration.updateCognitoUserAttributes(usersConfig);
				break;
			default:
				logger.error("Incorrect Usage of identity provider type. Refer README for more details");
				break;
		}
	} else if (selectedOption === "-d") {
		// TODO Add code for DELETE

	} else {
		logger.error("Invalid Options Selected! Valid options are -c to create users, -u to update user attributes and -d to delete users.");
		return;
	}
}
main();
