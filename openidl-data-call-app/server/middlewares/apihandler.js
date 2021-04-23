// SPDX-License-Identifier: Apache-2.0
"use strict"

var Request = require("request");



var baseURL = "https://dev-aais-openidl-insurance-data-manager.dev-openidl-aais-apps-c-93fbc942734a2ff6b0991658d589b54e-0000.us-south.containers.appdomain.cloud";
var validateJSON;

var APIHandler = {

    /**
     * Passes all the invoke requests to appropriate APIHandler SDK function
     * 
     * @param {JSON} requestParameters The request body
     * @returns {JSON}
     */
    invoke: async function (requestParameters, token, callback) {
        try {
            console.log("GOT INTO API INVOKE()");
            await Request.post(requestPayload('/openidl/api/load-insurance-data', requestParameters, token), (error, response, body) => {
                if (error) callback(responseData(error));
                else {
                    //console.log("RESPONSE FROM API INVOKE() IS ", response);
                    console.log("BODY FROM API INVOKE() IS ", body);
                    try {
                        validateJSON = JSON.parse(body)
                        callback(validateJSON)
                    }
                    catch (ex) {
                        console.log("Body in Catch ")
                        console.log(body)
                        console.log("Exception is ")
                        console.log(ex)
                        callback(responseData(body));
                    }

                }
            });
        }
        catch (ex) {
            callback(responseData(ex));
        }

    },


}

function responseData(errorMessage) {
    return ({
        "Transaction": {
            "Status": "FAILURE",
            "Result": "",
            "Error": errorMessage
        }
    });
}
function requestPayload(restServiceMethod, bodyParameter, token) {
    return (
        {
            "headers": { "content-type": "application/json",
            "authorization": token },
            "url": baseURL + restServiceMethod,
            "body": JSON.stringify(bodyParameter)
        }
    )
}


module.exports.Methods = APIHandler; 
