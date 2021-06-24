package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
	logger "github.com/sirupsen/logrus"
)

/**
* function-name :CreateConsent (invoke)
* @params{json}:
{
	"dataCallID":"Mandatory",
	"dataCallVersion":"Mandatory",
	"carrierID":"Mandatory",*
	"createdTs":"Mandatory",
	"createdBy":"Mandatory"
}
 @Success: nil
 @Failure:{"message":"", "errorCode":"sys_err or bus_error"}
 * @Description : CreateConsent function contains business logic to insert consent calls
**/
func (this *openIDLCC) CreateConsent(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("CreateConsent: enter")
	defer logger.Debug("CreateConsent: exit")

	//Check if array length is greater than 0
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}
	consent := Consent{}
	err := json.Unmarshal([]byte(args), &consent)
	if err != nil {
		return shim.Error("CreateConsent: Error Unmarshalling Controller Call JSON: " + err.Error())
	}

	// TODO: Investigate why it is returning nill despite the fact data call exists in other channel
	// Check if the data call corresponding to this like exists on Global channel

	var dataCall GetDataCall
	dataCall.ID = consent.DatacallID
	dataCall.Version = consent.DataCallVersion
	dataCallAsBytes, _ := json.Marshal(dataCall)
	getDataCallReqJson := string(dataCallAsBytes)
	logger.Debug("CreateConsent: getDataCallReqJson > ", getDataCallReqJson)
	var GetDataCallByIdAndVersionFunc = "GetDataCallByIdAndVersion"
	getDataCallRequest := ToChaincodeArgs(GetDataCallByIdAndVersionFunc, getDataCallReqJson)
	logger.Debug("CreateConsent: getDataCallRequest", getDataCallRequest)
	getDataCallResponse := stub.InvokeChaincode(DEFAULT_CHAINCODE_NAME, getDataCallRequest, DEFAULT_CHANNEL)
	logger.Debug("CreateConsent: getDataCallResponse > ", getDataCallResponse)
	logger.Debug("CreateConsent: getDataCallResponse.Status ", getDataCallResponse.Status)
	logger.Debug("CreateConsent: getDataCallResponse.Payload", string(getDataCallResponse.Payload))
	if getDataCallResponse.Status != 200 {
		logger.Error("CreateConsent: Invalid Data Call ID and Version Specified: ", err)
		return shim.Error(errors.New("CreateConsent: Invalid Data Call ID and Version Specified").Error())
	}

	logger.Debug("Recieved Data Call >> " + string(getDataCallResponse.Payload))
	if len(getDataCallResponse.Payload) <= 0 {
		logger.Error("CreateConsent: No Matching datacallId and datacallVersion specified in Consent message")
		return shim.Error(errors.New("CreateConsent: No Matching datacallId and datacallVersion specified in Consent message").Error())

	}

	pks := []string{CONSENT_PREFIX, consent.DatacallID, consent.DataCallVersion, consent.CarrierID}
	consentKey, _ := stub.CreateCompositeKey(CONSENT_DOCUMENT_TYPE, pks) //CONSENT_PREFIX + consent.DatacallID

	// Checking the ledger to confirm that the controller key doesn't exist
	logger.Debug("CreateConsent: Get Consent from World State")
	previousConsentData, _ := stub.GetState(consentKey)
	logger.Debug("CreateConsent: PreviousConsentAsBytes > ", previousConsentData)

	if previousConsentData != nil {
		logger.Warning("CreateConsent: Consent Already Exist for data call Id: ", consent.DatacallID)
		return shim.Success(nil)
	} else {
		logger.Debug("CreateConsent: Create consent entry")
		consentInBytes, _ := json.Marshal(consent)

		// === Save Controller to state ===
		err = stub.PutState(consentKey, consentInBytes)
		if err != nil {
			return shim.Error("CreateConsent: Error committing data for key: " + consentKey)
		}

		logger.Debug("CreateConsent: Consent Committed to World State, Raising a CreateConsentEvent")

		// Create chaincode event
		_ = stub.SetEvent(CREATE_CONSENT_EVENT, consentInBytes)

	}

	return shim.Success(nil)
}

// Request param- {"dataCallID":"", "dataCallVersion":"", "carrierid":"", "status": }
func (this *openIDLCC) UpdateConsentStatus(stub shim.ChaincodeStubInterface, args string) pb.Response {

	logger.Debug("UpdateConsentStatus: Enter")
	if len(args) < 1 {
		return shim.Error("UpdateConsentStatus: Incorrect number of arguments!")
	}
	var consent UpdateConsentStatus
	err := json.Unmarshal([]byte(args), &consent)

	if err != nil {
		logger.Error("UpdateConsentStatus: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("UpdateConsentStatus: Error during json.Unmarshal").Error())
	}

	if consent.DataCallID == "" || consent.DataCallVersion == "" || consent.CarrierID == "" {
		return shim.Error("DataCallID or DataCallVersion or CarrierID can't be empty")
	}

	pks := []string{CONSENT_PREFIX, consent.DataCallID, consent.DataCallVersion, consent.CarrierID}
	consentKey, _ := stub.CreateCompositeKey(CONSENT_DOCUMENT_TYPE, pks)

	logger.Debug("Get Consent from World State")
	consentData, _ := stub.GetState(consentKey)
	logger.Debug("GetConsent: PreviousConsentAsBytes > ", consentData)

	var cc Consent
	err = json.Unmarshal(consentData, &cc)

	// var prevDataCall DataCall
	// err = json.Unmarshal(dataCallAsBytes, &prevDataCall)

	if consentData == nil {
		logger.Error("Error retreiving data for key ", consentKey)
		return shim.Error("Error retreiving data for key" + consentKey)
	} else {
		logger.Debug("Getcosent details for datacall id ", consent.DataCallID)

		cc.Status = consent.Status

		consentDataAsBytes, _ := json.Marshal(cc)
		err = stub.PutState(consentKey, consentDataAsBytes)
		if err != nil {
			logger.Error("Error commiting the cosent status")
			return shim.Error("Error commiting the consent status")
		}

		return shim.Success(nil)
	}

}

func (this *openIDLCC) CreateConsentCountEntry(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("CreateConsentCountEntry: enter")
	defer logger.Debug("CreateConsentCountEntry: exit")
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments!")
	}
	logger.Debug("Input Consent Json > " + args)
	var consentCountEntry ConsentCountEntry
	err := json.Unmarshal([]byte(args), &consentCountEntry)

	if err != nil {
		logger.Error("CreateConsentCountEntry: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("CreateConsentCountEntry: Error during json.Unmarshal").Error())
	}

	transactionId := stub.GetTxID()
	var pks []string = []string{CONSENT_PREFIX, consentCountEntry.DatacallID, consentCountEntry.DataCallVersion, transactionId}
	consentKey, _ := stub.CreateCompositeKey(CONSENT_DOCUMENT_TYPE, pks)

	// Consent doesn't exist creating new consent
	logger.Debug("CreateConsentCountEntry: Create new consent entry")
	consentAsBytes, _ := json.Marshal(consentCountEntry)
	err = stub.PutState(consentKey, consentAsBytes)
	if err != nil {
		return shim.Error("CreateConsentCountEntry: Error committing Consent for key: " + consentKey)
	}

	return shim.Success(nil)
}

/**
* Function-name : CountConsents (invoke)
* for a datacall
* @params :
{
	"datacallID":"Mandatory",
	"dataCallVersion":"Mandatory",
	"carrierID":""Mandatory,
	"createdTs":"Mandatory",
	"createdBy":"Mandatory"
}
*@property {string} 0 - stringified JSON object.
* * @Success: nil
* @Failure:{"message":"", "errorCode":"sys_err or bus_error"}
* @Description : Counting the number of consents carrier is giving or already given
*/
func (this *openIDLCC) CountConsents(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("CountConsents: enter")
	defer logger.Debug("CountConsents: exit")
	if len(args) < 1 {
		return shim.Error("CountConsents: Incorrect number of arguments!")
	}

	var consentCountEntry ConsentCountEntry
	err := json.Unmarshal([]byte(args), &consentCountEntry)

	if err != nil {
		logger.Error("CreateConsentCountEntry: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("CountConsents: Error during json.Unmarshal").Error())
	}

	var pks []string = []string{CONSENT_PREFIX, consentCountEntry.DatacallID, consentCountEntry.DataCallVersion}
	logger.Info("Key ", pks)
	deltaResultsIterator, deltaErr := stub.GetStateByPartialCompositeKey(CONSENT_DOCUMENT_TYPE, pks)

	if deltaErr != nil {
		return shim.Error(fmt.Sprintf("CountConsents: Could not retrieve value for %s: %s", consentCountEntry.DatacallID, deltaErr.Error()))

	}
	defer deltaResultsIterator.Close()

	// Check the variable existed
	if !deltaResultsIterator.HasNext() {
		logger.Info("CountConsents: No Consents found for criteria, returning 0 delta")
		consentCountEntry.Delta = 0
		consentCountEntryAsBytes, _ := json.Marshal(consentCountEntry)
		return shim.Success(consentCountEntryAsBytes)
	}

	var delta = 0
	var i int
	for i = 0; deltaResultsIterator.HasNext(); i++ {
		currentConsentEntryAsBytes, nextErr := deltaResultsIterator.Next()
		if nextErr != nil {
			return shim.Error("CountConsents: Failed to iterate Consent Entry call")
		}
		var currentConsentCountEntry ConsentCountEntry
		err = json.Unmarshal([]byte(currentConsentEntryAsBytes.GetValue()), &currentConsentCountEntry)
		delta = delta + currentConsentCountEntry.Delta
	}

	consentCountEntry.Delta = delta
	newConsentCountEntry, _ := json.Marshal(consentCountEntry)
	return shim.Success(newConsentCountEntry)
}

//updates consent count for a data call based on dataCallID and dataCallVersion
func (this *openIDLCC) UpdateConsentCountForDataCall(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("UpdateConsentCountForDataCall: enter")
	defer logger.Debug("UpdateConsentCountForDataCall: exit")
	if len(args) < 1 {
		return shim.Error("UpdateConsentCountForDataCall: Incorrect number of arguments!")
	}

	var updateConsentReqest UpdateLikeAndConsentCountReq
	err := json.Unmarshal([]byte(args), &updateConsentReqest)

	if err != nil {
		logger.Error("UpdateConsentCountForDataCall: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("UpdateConsentCountForDataCall: Error during json.Unmarshal").Error())
	}
	if updateConsentReqest.DataCallID == "" {
		return shim.Error("DataCallID should not be Empty")

	} else if updateConsentReqest.DataCallVersion == "" {
		return shim.Error("DataCallVersion should not be Empty")

	}

	var pks []string = []string{DATA_CALL_PREFIX, updateConsentReqest.DataCallID, updateConsentReqest.DataCallVersion}
	dataCallKey, _ := stub.CreateCompositeKey(DOCUMENT_TYPE, pks)
	dataCallAsBytes, err := stub.GetState(dataCallKey)
	if err != nil {
		return shim.Error("UpdateConsentCountForDataCall: Error retreiving data for key" + dataCallKey)
	}

	var prevDataCall DataCall
	err = json.Unmarshal(dataCallAsBytes, &prevDataCall)
	if err != nil {
		return shim.Error("UpdateConsentCountForDataCall: Failed to unmarshal data call: " + err.Error())
	}

	//Invoke CountLikes to get the total likes count for the data call
	var getConsentCount ConsentCountEntry
	getConsentCount.DatacallID = updateConsentReqest.DataCallID
	getConsentCount.DataCallVersion = updateConsentReqest.DataCallVersion
	getConsentCountJson, _ := json.Marshal(getConsentCount)
	countConsentsResponse := this.CountConsents(stub, string(getConsentCountJson))
	if countConsentsResponse.Status != 200 || len(countConsentsResponse.Payload) <= 0 {
		logger.Error("UpdateConsentCountForDataCall: Unable to CountConsents: ", countConsentsResponse)
		return shim.Error(errors.New("UpdateConsentCountForDataCall: Unable to CountConsents").Error())
	}

	var consentCountEntry ConsentCountEntry
	json.Unmarshal(countConsentsResponse.Payload, &consentCountEntry)
	logger.Debug("UpdateConsentCountForDataCall: InvokeResponse from CountConsents: delta ", (consentCountEntry.Delta))

	//update the dataCall with delta
	prevDataCall.ConsentCount = consentCountEntry.Delta
	prevDataAsBytes, _ := json.Marshal(prevDataCall)
	err = stub.PutState(dataCallKey, prevDataAsBytes)
	if err != nil {
		logger.Error("UpdateConsentCountForDataCall: Error updating DataCall for CountConsents")
		return shim.Error("UpdateConsentCountForDataCall: Error updating DataCall for CountConsents: " + err.Error())
	}

	return shim.Success(nil)

}

// Returns List of carriers Consented for a specific data call, based on dataCallID and dataCallVersion
// Request param- {"dataCallID":" ", "dataCallVersion":" "}
func (this *openIDLCC) GetConsentsByDataCall(stub shim.ChaincodeStubInterface, args string) pb.Response {

	logger.Debug("GetConsentsByDataCall: enter")
	defer logger.Debug("GetConsentsByDataCall: exit")
	if len(args) < 1 {
		return shim.Error("GetConsentsByDataCall: Incorrect number of arguments!")
	}
	var consentList []ListConsentResponse
	var getConsentsByDataCallRequest GetConsentsByDataCallRequest
	err := json.Unmarshal([]byte(args), &getConsentsByDataCallRequest)

	if err != nil {
		logger.Error("GetConsentsByDataCall: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("GetConsentsByDataCall: Error during json.Unmarshal").Error())
	}

	if getConsentsByDataCallRequest.DataCallID == "" || getConsentsByDataCallRequest.DataCallVersion == "" {
		return shim.Error("DataCallID or DataCallVersion can't be empty")
	}

	// Get current channel
	logger.Info("GetConsentsByDataCall: currentChannelID > ", stub.GetChannelID())

	var pks []string
	pks = []string{CONSENT_PREFIX, getConsentsByDataCallRequest.DataCallID, getConsentsByDataCallRequest.DataCallVersion}

	logger.Info("GetConsentsByDataCall: Key ", pks)
	resultsIterator, err := stub.GetStateByPartialCompositeKey(CONSENT_DOCUMENT_TYPE, pks)
	defer resultsIterator.Close()

	if err != nil {
		// proceed without any further action to check consents on other channels
		logger.Error("GetConsentsByDataCall: Error fetching consent on this channel: ", stub.GetChannelID()+"error ", err)
	}
	// Check the variable existed
	if !resultsIterator.HasNext() {
		// proceed without any further action to check consents on other channels
		logger.Info("GetConsentsByDataCall: No Consent found on current channel, proceed to next channel ")

	} else {
		var i int
		logger.Debug("GetConsentsByDataCall: Iterating over list of Consents")
		for i = 0; resultsIterator.HasNext(); i++ {
			currentConsentAsBytes, nextErr := resultsIterator.Next()
			if nextErr != nil {
				return shim.Error("GetConsentsByDataCall: Failed to iterate over Consent")
			}
			var currentConsent Consent
			err = json.Unmarshal([]byte(currentConsentAsBytes.GetValue()), &currentConsent)
			if err != nil {
				return shim.Error("GetConsentsByDataCall: Failed to unmarshal consent: " + err.Error())
			}
			var listConsentResponse ListConsentResponse
			listConsentResponse.Consent = currentConsent
			//listConsentResponse.CarrierName = ""
			consentList = append(consentList, listConsentResponse)

		}
		logger.Info("GetConsentsByDataCall: consents fetched for current channel")
	}
	consentListAsByte, _ := json.Marshal(consentList)
	logger.Debug("GetConsentsByDataCall: consentsListAsByte", consentListAsByte)
	return shim.Success(consentListAsByte)
}

// Returns List of carriers Consented for a specific data call, based on dataCallID and dataCallVersion on requested channels
// Request param- {"dataCallID":" ", "dataCallVersion":" ", "channelList":[{"channelName": "channel1","chaincodeName": "openidl-cc-channel1"}]}
func (this *openIDLCC) ListConsentsByDataCall(stub shim.ChaincodeStubInterface, args string) pb.Response {

	logger.Debug("ListConsentsByDataCall: enter")
	defer logger.Debug("ListConsentsByDataCall: exit")
	if len(args) < 1 {
		return shim.Error("ListConsentsByDataCall: Incorrect number of arguments!")
	}

	//listDataCallRequestJson := args[0]
	//logger.Info("ListLikesByDataCall: Request > " + listDataCallRequestJson)
	var consentList []ListConsentResponse
	var listConsentRequest ListConsentRequest
	err := json.Unmarshal([]byte(args), &listConsentRequest)

	if err != nil {
		logger.Error("ListConsentsByDataCall: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("ListConsentsByDataCall: Error during json.Unmarshal").Error())
	}
	logger.Debug("ListConsentsByDataCall: Unmarshalled object ", listConsentRequest)

	if listConsentRequest.DataCallID == "" || listConsentRequest.DataCallVersion == "" {
		return shim.Error("DataCallID or DataCallVersion can't be empty")
	}

	var pks []string
	pks = []string{CONSENT_PREFIX, listConsentRequest.DataCallID, listConsentRequest.DataCallVersion}

	logger.Info("ListConsentsByDataCall: Key ", pks)
	resultsIterator, err := stub.GetStateByPartialCompositeKey(CONSENT_DOCUMENT_TYPE, pks)
	defer resultsIterator.Close()

	if err != nil {
		// proceed without any further action to check consents on other channels
		logger.Error("ListConsentsByDataCall: Error fetching consent on this channel: ", stub.GetChannelID()+"error ", err)
	}
	// Check the variable existed
	if !resultsIterator.HasNext() {
		// proceed without any further action to check consents on other channels
		logger.Info("ListConsentsByDataCall: No Consent found on current channel, proceed to next channel ")
	} else {
		var i int
		logger.Debug("ListConsentsByDataCall: Iterating over list of Consents")
		for i = 0; resultsIterator.HasNext(); i++ {
			currentConsentAsBytes, nextErr := resultsIterator.Next()
			if nextErr != nil {
				return shim.Error("ListConsentsByDataCall: Failed to iterate over Consent")
			}
			var currentConsent Consent
			err = json.Unmarshal([]byte(currentConsentAsBytes.GetValue()), &currentConsent)
			if err != nil {
				return shim.Error("Failed to unmarshal data call: " + err.Error())
			}
			var listConsentResponse ListConsentResponse
			listConsentResponse.Consent = currentConsent
			//listConsentResponse.CarrierName = ""
			consentList = append(consentList, listConsentResponse)

		}
		logger.Info("ListConsentsByDataCall: Consents fetched for current channel, moving on to other channels")
	}

	// Get data from other channels mentioned in the client request and recieved any other channels mentioned in the client request
	//var channels Channels
	//channels.ChannelIDs = make([]string, len(crossInvocationChannels.ChannelIDs))
	//copy(channels.ChannelIDs[:], crossInvocationChannels.ChannelIDs)
	//logger.Debug("ListConsentsByDataCall: Requested additional channels data from client >> ", channels.ChannelIDs)
	totalChannels := len(listConsentRequest.ChannelList)
	logger.Debug("ListConsentsByDataCall: Requested additional channels data from client >> ", listConsentRequest.ChannelList)
	logger.Debug("ListConsentsByDataCall: Total Number of channels > ", totalChannels)

	// Get current channel
	//currentChannelID := stub.GetChannelID()
	//logger.Info("InvokeChaincodeOnChannel: currentChannelID > ", currentChannelID)

	var channenlIndex int
	for channenlIndex = 0; channenlIndex < totalChannels; channenlIndex++ {
		var getConsentsReq GetConsentsByDataCallRequest
		getConsentsReq.DataCallID = listConsentRequest.DataCallID
		getConsentsReq.DataCallVersion = listConsentRequest.DataCallVersion
		getConsentsReqAsBytes, _ := json.Marshal(getConsentsReq)
		getConsentsReqJson := string(getConsentsReqAsBytes)
		var GetConsentsByDataCallFunc = "GetConsentsByDataCall"
		getConsentsByDataCallRequest := ToChaincodeArgs(GetConsentsByDataCallFunc, getConsentsReqJson)
		logger.Debug("ListLikesByDataCall: getConsentsByDataCallRequest", getConsentsByDataCallRequest)
		logger.Info("ListLikesByDataCall: GetConsentsByDataCall request json " + getConsentsReqJson)
		//var invokeResponse pb.Response

		// fetch only if the requested channel is different from current channel
		//if channels.ChannelIDs[channenlIndex] != currentChannelID {
		logger.Debug("ListConsentsByDataCall: Fetching consent from channel ", listConsentRequest.ChannelList[channenlIndex].ChannelName)

		// Modify channel in the request before sending with current channelID to prevent any loops
		//listConsentRequest.ChannelIDs = make([]string, 1)
		//listConsentRequest.ChannelIDs[0] = currentChannelID
		chaincodeName := listConsentRequest.ChannelList[channenlIndex].ChaincodeName
		channelName := listConsentRequest.ChannelList[channenlIndex].ChannelName
		invokeResponse := stub.InvokeChaincode(chaincodeName, getConsentsByDataCallRequest, channelName)
		//invokeResponse := InvokeChaincode(stub, chaincodeName, "GetConsentsByDataCall", getConsentsReqJson, channelName)
		if invokeResponse.Status != 200 {
			logger.Error("ListConsentsByDataCall: Unable to Invoke cross channel query GetConsentsByDataCall: ", (invokeResponse))
			// Do not block functionality and proceed to return the original channels like list
			//}
		} else if len(invokeResponse.Payload) <= 0 {
			logger.Debug("ListConsentsByDataCall: ErrorInvokeResponse from another channel ", string(invokeResponse.Payload))

		} else {
			var invokeListConsentResponse []ListConsentResponse
			logger.Debug("ListConsentsByDataCall: InvokeResponse from another channel ", string(invokeResponse.Payload))
			json.Unmarshal(invokeResponse.Payload, &invokeListConsentResponse)
			consentList = append(consentList, invokeListConsentResponse...)

		}
		//}
	}

	consentListAsByte, _ := json.Marshal(consentList)
	logger.Debug("ListConsentsByDataCall: consentsListAsByte", consentListAsByte)
	return shim.Success(consentListAsByte)

}

func (this *openIDLCC) GetConsentByDataCallAndOrganization(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	logger.Debug("GetConsentByDataCallAndOrganization: enter")
	defer logger.Debug("GetConsentByDataCallAndOrganization: exit")
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments!")
	}
	listConsentRequestJson := args[0]
	logger.Debug("GetConsentByDataCallAndOrganization: Request > " + listConsentRequestJson)
	var listConsentRequest GetConsentByDataCallAndOrganizationRequest
	var consentList []ListConsentResponse

	err := json.Unmarshal([]byte(listConsentRequestJson), &listConsentRequest)
	consent := listConsentRequest.Consent
	if err != nil {
		logger.Error("GetConsentByDataCallAndOrganization: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("GetConsentByDataCallAndOrganization: Error during json.Unmarshal").Error())
	}

	// Create partial composite key to fetch liks based on DataCall Id and DataCall Version
	var pks []string
	pks = []string{CONSENT_PREFIX, consent.DatacallID, consent.DataCallVersion, consent.CarrierID}
	logger.Info("GetConsentByDataCallAndOrganization: Key ", pks)
	resultsIterator, err := stub.GetStateByPartialCompositeKey(CONSENT_DOCUMENT_TYPE, pks)
	defer resultsIterator.Close()

	if err != nil {
		logger.Error("GetConsentByDataCallAndOrganization: No Consent found on current channel due to error, proceed to next channel ", err)
		// proceed without any further action to check consents on other channels
	}
	// Check the variable existed
	if !resultsIterator.HasNext() {
		logger.Info("GetConsentByDataCallAndOrganization: No Consent found on current channel, proceed to next channel ")
		// proceed without any further action to check consents on other channels
	} else {
		var i int
		logger.Debug("GetConsentByDataCallAndOrganization: Iterating over list of Consents")
		for i = 0; resultsIterator.HasNext(); i++ {
			currentConsentAsBytes, nextErr := resultsIterator.Next()
			if nextErr != nil {
				return shim.Error("GetConsentByDataCallAndOrganization: Failed to iterate Consent Entry call")
			}
			var currentConsent Consent
			err = json.Unmarshal([]byte(currentConsentAsBytes.GetValue()), &currentConsent)
			if err != nil {
				return shim.Error("Failed to unmarshal data call: " + err.Error())
			}
			var listConsentResponse ListConsentResponse
			listConsentResponse.Consent = currentConsent
			listConsentResponse.CarrierName = ""
			consentList = append(consentList, listConsentResponse)

		}
		logger.Info("GetConsentByDataCallAndOrganization: Consent Fetched  Returning Response")
	}

	consentListAsByte, _ := json.Marshal(consentList)
	logger.Debug("GetConsentByDataCallAndOrganization: consentsListAsByte", consentListAsByte)
	return shim.Success(consentListAsByte)

}

func GetConsentsCount(stub shim.ChaincodeStubInterface, args []string) map[string]int {
	fmt.Println("Inside GetConsentsCount and args are ", args)
	var consentCounts map[string]int
	consentCounts = make(map[string]int)

	//fetch all the repports based on Id and Version sorted by updatedTs
	var queryStr string
	queryStr = fmt.Sprintf("{\"selector\":{\"_id\":{\"$regex\":\"%s\"},\"datacallID\":{\"$in\":[%s]}},\"use_index\":[\"_design/dataCallId\"]}", CONSENT_PREFIX, strings.Trim(fmt.Sprint(args), "[]"))
	deltaResultsIterator, _ := stub.GetQueryResult(queryStr)

	defer deltaResultsIterator.Close()

	// Check the variable existed
	if !deltaResultsIterator.HasNext() {
		logger.Info("CountConsents: No Consents found for criteria, returning 0 delta")
		return consentCounts
	}

	for deltaResultsIterator.HasNext() {
		consentCountAsBytes, _ := deltaResultsIterator.Next()

		var tempConsentCount ConsentCountEntry
		_ = json.Unmarshal([]byte(consentCountAsBytes.GetValue()), &tempConsentCount)

		consentCounts[tempConsentCount.DatacallID] = consentCounts[tempConsentCount.DatacallID] + tempConsentCount.Delta

	}
	return consentCounts
}
