
'use strict';
/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const log4js = require('log4js');
const request = require('request');
const logger = log4js.getLogger('helpers - certificate manager');
logger.level = process.env.LOG_LEVEL || 'debug';
const itm = require('@ibm-functions/iam-token-manager');
const certificateManagerConfig = require('./config/certification_manager.json');
/**
 * This class defines an implementation of an Identity wallet that persists
 * to a IBM certificate manager
 *
 * @class
 * @extends {BaseWallet}
 */
class CertificatemanagerWallet {

	/**
	 * Creates an instance of the CertificatemanagerWallet
	 * @param {Object} options contains required property <code>url</code> and other Nano options
	 * @param {WalletMixin} mixin
	 * @memberof CertificatemanagerWallet
	 */
	constructor(options) {
		this.CMOptions = options;
	}

	static async loadoptions(options) {
		return new CertificatemanagerWallet(options);
	}

	//list all certificates from repository and then retrives the certificate id based on the label
	async getCertificateId(label, authtoken) {
		logger.info("in getCertificateId");
		const instanceid = this.CMOptions.instance_id;
		const url = certificateManagerConfig.url + "/" + encodeURIComponent(instanceid) + "/certificates";
		const authorization = authtoken;
		const contenttype = certificateManagerConfig.contenttype;
		const certificateIdNotFound = -1;
		const header = {
			"content-type": contenttype,
			"Authorization": authorization,
			"instance_id": instanceid,
			"order": "name",
			"page_number": 0,
			"page_size": 100
		};
		return new Promise((resolve, reject) => {
			request.get({
				"headers": header,
				"url": url,
			}, (error, response, body) => {
				if (error) {
					reject(error);
				} else {
					var responsebody = JSON.parse(body);
					var responsebodykeys = Object.keys(responsebody);
					for (let i = 0; i < responsebodykeys.length; i++) {
						if ('certificates' === responsebodykeys[i]) {
							var objectkeys = Object.keys(responsebody[responsebodykeys[i]]);
							for (let j = 0; j < objectkeys.length; j++) {
								var value = responsebody[responsebodykeys[i]][objectkeys[j]];
								if (label === value['name']) {
									var certId = value['_id'];
									logger.debug("Cert id ..........   " + certId);
									resolve(certId);
								}
							}
						}
					}
					resolve(certificateIdNotFound);
				}
			});
		});
	}

	async getCertificate(certificate_id, authtoken) {
		logger.info("in getCertificate");
		const baseurl = certificateManagerConfig.getcertbaseurl;
		const url = baseurl + encodeURIComponent(certificate_id);
		const authorization = authtoken;
		const contenttype = certificateManagerConfig.contenttype;
		const header = {
			"content-type": contenttype,
			"Authorization": authorization,
			"order": "name",
			"page_number": 0,
			"page_size": 100
		};
		return new Promise((resolve, reject) => {
			request.get({
				"headers": header,
				"url": url,
			}, (error, response, body) => {
				if (error) {
					reject(error);
				} else {
					var responsebody = JSON.parse(body);
					resolve(responsebody['data']);
				}
			});
		});
	}

	async get(label) {
		const myAuthToken = 'Bearer ' + await this.generateAuthToken(this.CMOptions.apikey);
		var certificateId = await this.getCertificateId(label, myAuthToken);
		var identity = await this.getCertificate(certificateId, myAuthToken);
		logger.debug("identity   =>   " + JSON.stringify(identity));
		return identity;
	}

	async put(name, identity) {
		const myAuthToken = 'Bearer ' + await this.generateAuthToken(this.CMOptions.apikey);
		const instanceid = this.CMOptions.instance_id;
		const url = certificateManagerConfig.url + "/" + encodeURIComponent(instanceid) + "/certificates/import";
		const authorization = myAuthToken;
		const contenttype = certificateManagerConfig.contenttype;
		const header = {
			"content-type": contenttype,
			"Authorization": authorization,
			"instance_id": instanceid
		};
		const body = {
			"name": name,
			data: identity,
		};

		return new Promise((resolve, reject) => {
			request.post({
				"headers": header,
				"url": url,
				"body": JSON.stringify(body)
			}, (error, response, body) => {
				if (error) {
					return reject(error);
				}
				else {
					return resolve(true);
				}

			});
		});
	}

	async generateAuthToken(apikey) {
		return new Promise((resolve, reject) => {
			const m = new itm({ "iamApikey": apikey });
			let token = m.getToken();
			return resolve(token);
		});
	}
}
module.exports.CertificatemanagerWallet = CertificatemanagerWallet;



