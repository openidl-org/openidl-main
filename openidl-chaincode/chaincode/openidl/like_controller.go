package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	pb "github.com/hyperledger/fabric-protos-go/peer"
	logger "github.com/sirupsen/logrus"
)

// ToggleLike Creates and then toggles likes as a boolean value
// for a datacall
func (this *SmartContract) ToggleLike(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("ToggleLike: enter")
	defer logger.Debug("ToggleLike: exit")
	logger.Debug("ToggleLike > stub.GetChannelID > ", stub.GetChannelID())
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments!")
	}
	logger.Debug("ToggleLike: Input Like Json > " + args)
	var like Like
	err := json.Unmarshal([]byte(args), &like)

	// TODO: Investigate why it is returning nill despite the fact data call exists in other channel
	// Check if the data call corresponding to this like exists on Global channel

	var getDataCall GetDataCall
	getDataCall.ID = like.DatacallID
	getDataCall.Version = like.DataCallVersion
	getDataCallAsBytes, _ := json.Marshal(getDataCall)
	getDataCallReqJson := string(getDataCallAsBytes)
	logger.Debug("ToggleLike: getDataCallReqJson > ", getDataCallReqJson)
	var GetDataCallByIdAndVersionFunc = "GetDataCallByIdAndVersion"
	getDataCallRequest := ToChaincodeArgs(GetDataCallByIdAndVersionFunc, getDataCallReqJson)
	logger.Debug("ToggleLike: getDataCallRequest", getDataCallRequest)
	getDataCallResponse := stub.InvokeChaincode(DEFAULT_CHAINCODE_NAME, getDataCallRequest, DEFAULT_CHANNEL)
	logger.Debug("ToggleLike: getDataCallResponse > ", getDataCallResponse)
	logger.Debug("ToggleLike: getDataCallResponse.Status ", getDataCallResponse.Status)
	logger.Debug("ToggleLike: getDataCallResponse.Payload", string(getDataCallResponse.Payload))
	if getDataCallResponse.Status != 200 {
		logger.Error("ToggleLike: Unable to Fetch DataCallId and Version due to Error: ", err)
		return shim.Error(errors.New("ToggleLike: Unable to Fetch DataCallId and Version due to Error").Error())
	}

	if len(getDataCallResponse.Payload) <= 0 {
		logger.Error("ToggleLike: No Matching datacallId and datacallVersion specified in Like message")
		return shim.Error(errors.New("No Matching datacallId and datacallVersion specified in Like message").Error())

	}

	if err != nil {
		logger.Error("ToggleLike: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("ToggleLike: Error during json.Unmarshal").Error())
	}

	var pks []string = []string{LIKE_PREFIX, like.DatacallID, like.DataCallVersion, like.OrganizationID}
	likeKey, _ := stub.CreateCompositeKey(LIKE_DOCUMENT_TYPE, pks)

	logger.Info("ToggleLike: Get Like from World State")
	logger.Info("ToggleLike: likeKey > ", likeKey)
	prevLikeAsBytes, _ := stub.GetState(likeKey)
	var likeAsBytes []byte

	logger.Debug("ToggleLike: PreviousLikeAsBytes > ", prevLikeAsBytes)

	if prevLikeAsBytes == nil {

		if like.Liked == false {
			return shim.Error("Can't Unlike DataCall, as it is not Liked")
		}

		// like doesn't exist creating new like
		logger.Info("ToggleLike: No Previous Like Found, Create new like entry")
		likeAsBytes, _ = json.Marshal(like)
		err = stub.PutState(likeKey, likeAsBytes)
		if err != nil {
			return shim.Error("ToggleLike: Error committing data for key: " + likeKey)
		}
		logger.Debug("ToggleLike: Like Committed to World State, Raising a ToggleLikeEvent")
		_ = stub.SetEvent(TOGGLE_LIKE_EVENT, likeAsBytes)

	} else {
		// compare if like has already been performed for a given organization id
		var prevLike Like
		err := json.Unmarshal(prevLikeAsBytes, &prevLike)
		if err != nil {
			return shim.Error("Unable to umarshall previous like for key : " + likeKey)
		}
		logger.Info("ToggleLike: Comparing Previous and new like status, Previous Like and new Likes as follows ", prevLike.Liked, like.Liked)
		if prevLike.Liked != like.Liked {
			//compare if there is a change in state of like, update like for change in state
			logger.Debug("Toggle like status")
			likeAsBytes, _ := json.Marshal(like)
			err = stub.PutState(likeKey, likeAsBytes)
			if err != nil {
				return shim.Error("ToggleLike: Error committing data for key: " + likeKey)
			}
			logger.Debug("ToggleLike: Like Committed to World State, Raising a ToggleLikeEvent")
			_ = stub.SetEvent(TOGGLE_LIKE_EVENT, likeAsBytes)
		}
	}

	return shim.Success(nil)
}

// Returns List of carriers Liked for a specific data call, based on dataCallID and dataCallVersion
// Request param- {"dataCallID":" ", "dataCallVersion":" "}
func (this *SmartContract) GetLikesByDataCall(stub shim.ChaincodeStubInterface, args string) pb.Response {

	logger.Debug("GetLikesByDataCall: enter")
	defer logger.Debug("GetLikesByDataCall: exit")
	if len(args) < 1 {
		return shim.Error("GetLikesByDataCall: Incorrect number of arguments!")
	}
	var likeList []ListLikeResponse
	var getLikesByDataCallRequest GetLikesByDataCallRequest
	err := json.Unmarshal([]byte(args), &getLikesByDataCallRequest)

	if err != nil {
		logger.Error("GetLikesByDataCall: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("GetLikesByDataCall: Error during json.Unmarshal").Error())
	}

	if getLikesByDataCallRequest.DataCallID == "" || getLikesByDataCallRequest.DataCallVersion == "" {
		return shim.Error("DataCallID or DataCallVersion can't be empty")
	}

	// Get current channel
	logger.Info("GetLikesByDataCall: currentChannelID > ", stub.GetChannelID())

	var pks []string
	pks = []string{LIKE_PREFIX, getLikesByDataCallRequest.DataCallID, getLikesByDataCallRequest.DataCallVersion}

	logger.Info("GetLikesByDataCall: Key ", pks)
	resultsIterator, err := stub.GetStateByPartialCompositeKey(LIKE_DOCUMENT_TYPE, pks)
	defer resultsIterator.Close()

	if err != nil {
		// proceed without any further action to check consents on other channels
		logger.Error("GetLikesByDataCall: Error fetching like on this channel: ", stub.GetChannelID()+"error ", err)
	}
	// Check the variable existed
	if !resultsIterator.HasNext() {
		// proceed without any further action to check consents on other channels
		logger.Info("GetLikesByDataCall: No like found on current channel, proceed to next channel ")

	} else {
		var i int
		logger.Debug("GetLikesByDataCall: Iterating over list of like")
		for i = 0; resultsIterator.HasNext(); i++ {
			currentLikeAsBytes, nextErr := resultsIterator.Next()
			if nextErr != nil {
				return shim.Error("GetLikesByDataCall: Failed to iterate over like")
			}
			var currentLike Like
			err = json.Unmarshal([]byte(currentLikeAsBytes.GetValue()), &currentLike)
			if err != nil {
				return shim.Error("GetLikesByDataCall: Failed to unmarshal like: " + err.Error())
			}
			var listLikeResponse ListLikeResponse
			listLikeResponse.Like = currentLike
			//listConsentResponse.CarrierName = ""
			likeList = append(likeList, listLikeResponse)

		}
		logger.Info("GetLikesByDataCall: Likes fetched for current channel")
	}
	likeListAsByte, _ := json.Marshal(likeList)
	logger.Debug("GetLikesByDataCall: LikeListAsByte", likeListAsByte)
	return shim.Success(likeListAsByte)
}

// Returns List of carriers Consented for a specific data call, based on dataCallID and dataCallVersion on requested channels
// Request param- {"dataCallID":" ", "dataCallVersion":" ", "channelList":[{"channelName": "channel1","chaincodeName": "openidl-cc-channel1"}]}
func (this *SmartContract) ListLikesByDataCall(stub shim.ChaincodeStubInterface, args string) pb.Response {

	logger.Debug("ListLikesByDataCall: enter")
	defer logger.Debug("ListLikesByDataCall: exit")
	if len(args) < 1 {
		return shim.Error("ListLikesByDataCall: Incorrect number of arguments!")
	}

	//listDataCallRequestJson := args[0]
	//logger.Info("ListLikesByDataCall: Request > " + listDataCallRequestJson)
	var likeList []ListLikeResponse
	var listLikeRequest ListLikeRequest
	err := json.Unmarshal([]byte(args), &listLikeRequest)

	if err != nil {
		logger.Error("ListLikesByDataCall: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("ListLikesByDataCall: Error during json.Unmarshal").Error())
	}
	logger.Debug("ListLikesByDataCall: Unmarshalled object ", listLikeRequest)

	if listLikeRequest.DataCallID == "" || listLikeRequest.DataCallVersion == "" {
		return shim.Error("DataCallID or DataCallVersion can't be empty")
	}

	var pks []string
	pks = []string{LIKE_PREFIX, listLikeRequest.DataCallID, listLikeRequest.DataCallVersion}

	logger.Info("ListLikesByDataCall: Key ", pks)
	resultsIterator, err := stub.GetStateByPartialCompositeKey(LIKE_DOCUMENT_TYPE, pks)
	defer resultsIterator.Close()

	if err != nil {
		// proceed without any further action to check consents on other channels
		logger.Error("ListLikesByDataCall: Error fetching likes on this channel: ", stub.GetChannelID()+"error ", err)
	}
	// Check the variable existed
	if !resultsIterator.HasNext() {
		// proceed without any further action to check consents on other channels
		logger.Info("ListLikesByDataCall: No like found on current channel, proceed to next channel ")
	} else {
		var i int
		logger.Debug("ListLikesByDataCall: Iterating over list of likes")
		for i = 0; resultsIterator.HasNext(); i++ {
			currentLikeAsBytes, nextErr := resultsIterator.Next()
			if nextErr != nil {
				return shim.Error("ListLikesByDataCall: Failed to iterate over Consent")
			}
			var currentLike Like
			err = json.Unmarshal([]byte(currentLikeAsBytes.GetValue()), &currentLike)
			if err != nil {
				return shim.Error("Failed to unmarshal data call: " + err.Error())
			}
			var listLikeResponse ListLikeResponse
			listLikeResponse.Like = currentLike
			//listConsentResponse.CarrierName = ""
			likeList = append(likeList, listLikeResponse)

		}
		logger.Info("ListLikesByDataCall: likes fetched for current channel, moving on to other channels")
	}

	// Get data from other channels mentioned in the client request and recieved any other channels mentioned in the client request
	//var channels Channels
	//channels.ChannelIDs = make([]string, len(crossInvocationChannels.ChannelIDs))
	//copy(channels.ChannelIDs[:], crossInvocationChannels.ChannelIDs)
	//logger.Debug("ListLikesByDataCall: Requested additional channels data from client >> ", channels.ChannelIDs)
	totalChannels := len(listLikeRequest.ChannelList)
	logger.Debug("ListLikesByDataCall: Requested additional channels data from client >> ", listLikeRequest.ChannelList)
	logger.Debug("ListLikesByDataCall: Total Number of channels > ", totalChannels)

	// Get current channel
	//currentChannelID := stub.GetChannelID()
	//logger.Info("InvokeChaincodeOnChannel: currentChannelID > ", currentChannelID)

	var channenlIndex int
	for channenlIndex = 0; channenlIndex < totalChannels; channenlIndex++ {
		var getLikesReq GetLikesByDataCallRequest
		getLikesReq.DataCallID = listLikeRequest.DataCallID
		getLikesReq.DataCallVersion = listLikeRequest.DataCallVersion
		getLikesReqAsBytes, _ := json.Marshal(getLikesReq)
		getLikesReqJson := string(getLikesReqAsBytes)
		var GetLikesByDataCallFunc = "GetLikesByDataCall"
		getLikesByDataCallRequest := ToChaincodeArgs(GetLikesByDataCallFunc, getLikesReqJson)
		logger.Debug("ListLikesByDataCall: getLikesByDataCallRequest", getLikesByDataCallRequest)
		logger.Info("ListLikesByDataCall: GetLikesByDataCall request json " + getLikesReqJson)
		//var invokeResponse pb.Response

		// fetch only if the requested channel is different from current channel
		//if channels.ChannelIDs[channenlIndex] != currentChannelID {
		logger.Debug("ListLikesByDataCall: Fetching likes from channel ", listLikeRequest.ChannelList[channenlIndex].ChannelName)

		// Modify channel in the request before sending with current channelID to prevent any loops
		//listLikeRequest.ChannelIDs = make([]string, 1)
		//listLikeRequest.ChannelIDs[0] = currentChannelID
		chaincodeName := listLikeRequest.ChannelList[channenlIndex].ChaincodeName
		channelName := listLikeRequest.ChannelList[channenlIndex].ChannelName
		invokeResponse := stub.InvokeChaincode(chaincodeName, getLikesByDataCallRequest, channelName)
		//invokeResponse := InvokeChaincode(stub, chaincodeName, "GetLikesByDataCall", getLikesReqJson, channelName)
		if invokeResponse.Status != 200 {
			logger.Error("ListLikesByDataCall: Unable to Invoke cross channel query GetLikesByDataCall: ", invokeResponse)
			// Do not block functionality and proceed to return the original channels like list
			//}

		} else if len(invokeResponse.Payload) <= 0 {
			logger.Debug("ListLikesByDataCall: ErrorInvokeResponse from another channel ", string(invokeResponse.Payload))
		} else {
			var invokeListLikeResponse []ListLikeResponse
			logger.Debug("ListLikesByDataCall: InvokeResponse from another channel ", string(invokeResponse.Payload))
			json.Unmarshal(invokeResponse.Payload, &invokeListLikeResponse)
			likeList = append(likeList, invokeListLikeResponse...)

		}
		//}
	}

	likeListAsByte, _ := json.Marshal(likeList)
	logger.Debug("ListLikesByDataCall: likesListAsByte", likeListAsByte)
	return shim.Success(likeListAsByte)

}

// GetLikeByDataCallAndOrganization Returns list of likes based on input criteria
func (this *SmartContract) GetLikeByDataCallAndOrganization(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	logger.Debug("GetLikeByDataCallAndOrganization: enter")
	defer logger.Debug("GetLikeByDataCallAndOrganization: exit")
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments!")
	}
	listDataCallRequestJson := args[0]
	logger.Debug("GetLikeByDataCallAndOrganization: Request > " + listDataCallRequestJson)
	var listLikeRequest GetLikeByDataCallAndOrganizationRequest
	var likesList []ListLikeResponse

	err := json.Unmarshal([]byte(listDataCallRequestJson), &listLikeRequest)
	like := listLikeRequest.Like
	if err != nil {
		logger.Error("GetLikeByDataCallAndOrganization: Error during json.Unmarshal: ", err)
		likesListAsByte, _ := json.Marshal(likesList)
		logger.Debug("GetLikeByDataCallAndOrganization: likesListAsByte", likesListAsByte)
	}

	// Create partial composite key to fetch liks based on DataCall Id and DataCall Version
	var pks []string
	pks = []string{LIKE_PREFIX, like.DatacallID, like.DataCallVersion, like.OrganizationID}
	logger.Debug("GetLikeByDataCallAndOrganization: Key ", pks)
	resultsIterator, err := stub.GetStateByPartialCompositeKey(LIKE_DOCUMENT_TYPE, pks)
	defer resultsIterator.Close()

	if err != nil {
		logger.Error("GetLikeByDataCallAndOrganization: No Likes found on current channel due to error, proceed to next channel ", err)
		// proceed without any further action to check consents on other channels
	}
	// Check the variable existed
	if !resultsIterator.HasNext() {
		logger.Error("GetLikeByDataCallAndOrganization: No Likes found on current channel, proceed to next channel ")
		// proceed without any further action to check consents on other channels
	} else {
		var i int
		logger.Debug("ListLikesByDataCall: Iterating over list of likes")
		for i = 0; resultsIterator.HasNext(); i++ {
			currentLikeAsBytes, nextErr := resultsIterator.Next()
			if nextErr != nil {
				return shim.Error("GetLikeByDataCallAndOrganization: Failed to iterate Like Entry call")
			}
			var currentLike Like
			err = json.Unmarshal([]byte(currentLikeAsBytes.GetValue()), &currentLike)
			if err != nil {
				return shim.Error("GetLikeByDataCallAndOrganization: Failed to unmarshal data call: " + err.Error())
			}
			var listLikeResponse ListLikeResponse
			listLikeResponse.Like = currentLike

			// update organization/Carrier Name in the like's response paylod
			listLikeResponse.OrganizationName = ""

			likesList = append(likesList, listLikeResponse)
		}
		logger.Debug("GetLikeByDataCallAndOrganization: Likes fetched for current channel, moving on to other channels")
	}

	likesListAsByte, _ := json.Marshal(likesList)
	logger.Debug("GetLikeByDataCallAndOrganization: likesListAsByte", string(likesListAsByte))
	return shim.Success(likesListAsByte)
}

// Create a new entry of like count
func (this *SmartContract) CreateLikeCountEntry(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("CreateLikeCountEntry: enter")
	defer logger.Debug("CreateLikeCountEntry: exit")
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments!")
	}
	logger.Debug("CreateLikeCountEntry: Input Like Json > " + args)
	var likeCountEntry LikeCountEntry
	err := json.Unmarshal([]byte(args), &likeCountEntry)

	if err != nil {
		logger.Error("CreateLikeCountEntry: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("CreateLikeCountEntry: Error during json.Unmarshal").Error())
	}
	transactionId := stub.GetTxID()
	var pks []string = []string{LIKE_PREFIX, likeCountEntry.DatacallID, likeCountEntry.DataCallVersion, transactionId}
	likeKey, _ := stub.CreateCompositeKey(LIKE_DOCUMENT_TYPE, pks)

	// like doesn't exist creating new like
	logger.Debug("CreateLikeCountEntry: Create new like entry")
	likeAsBytes, _ := json.Marshal(likeCountEntry)
	err = stub.PutState(likeKey, likeAsBytes)
	if err != nil {
		return shim.Error("CreateLikeCountEntry: Error committing Like for key: " + likeKey)
	}

	return shim.Success(nil)
}

// Perform count of like count entries
func (this *SmartContract) CountLikes(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("CountLikes: enter")
	defer logger.Debug("CountLikes: exit")
	if len(args) < 1 {
		return shim.Error("CountLikes: Incorrect number of arguments!")
	}

	var likeCountEntry LikeCountEntry
	err := json.Unmarshal([]byte(args), &likeCountEntry)

	if err != nil {
		logger.Error("CountLikes: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("CountLikes: Error during json.Unmarshal").Error())
	}

	var pks []string = []string{LIKE_PREFIX, likeCountEntry.DatacallID, likeCountEntry.DataCallVersion}
	logger.Info("CountLikes: Key ", pks)
	deltaResultsIterator, deltaErr := stub.GetStateByPartialCompositeKey(LIKE_DOCUMENT_TYPE, pks)

	if deltaErr != nil {
		return shim.Error(fmt.Sprintf("CountLikes: Could not retrieve value for %s: %s", likeCountEntry.DatacallID, deltaErr.Error()))
	}
	defer deltaResultsIterator.Close()

	// Check the variable existed
	if !deltaResultsIterator.HasNext() {
		logger.Info("CountLikes: No Likes found for criteria, returing 0 delta")
		likeCountEntry.Delta = 0
		likeCountEntryAsBytes, _ := json.Marshal(likeCountEntry)
		return shim.Success(likeCountEntryAsBytes)
	}

	var delta = 0
	var i int
	for i = 0; deltaResultsIterator.HasNext(); i++ {
		currentLikeEntryAsBytes, nextErr := deltaResultsIterator.Next()
		if nextErr != nil {
			return shim.Error("CountLikes: Failed to iterate Like Entry call")
		}
		var currentLikeCountEntry LikeCountEntry
		err = json.Unmarshal([]byte(currentLikeEntryAsBytes.GetValue()), &currentLikeCountEntry)
		logger.Debug("CountLikes: Count Data > ", currentLikeCountEntry.DatacallID, currentLikeCountEntry.DataCallVersion, currentLikeCountEntry.Delta)
		delta = delta + currentLikeCountEntry.Delta
	}

	likeCountEntry.Delta = delta
	logger.Debug(likeCountEntry.Delta)
	newLikeCountEntry, _ := json.Marshal(likeCountEntry)
	return shim.Success(newLikeCountEntry)
}

//updates like count for a data call based on dataCallID and dataCallVersion
func (this *SmartContract) UpdateLikeCountForDataCall(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("UpdateLikeCountForDataCall: enter")
	defer logger.Debug("UpdateLikeCountForDataCall: exit")
	if len(args) < 1 {
		return shim.Error("UpdateLikeCountForDataCall: Incorrect number of arguments!")
	}

	var updateLikeReqest UpdateLikeAndConsentCountReq
	err := json.Unmarshal([]byte(args), &updateLikeReqest)

	if err != nil {
		logger.Error("UpdateLikeCountForDataCall: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("UpdateLikeCountForDataCall: Error during json.Unmarshal").Error())
	}
	if updateLikeReqest.DataCallID == "" {
		return shim.Error("DataCallID should not be Empty")

	} else if updateLikeReqest.DataCallVersion == "" {
		return shim.Error("DataCallVersion should not be Empty")

	}

	var pks []string = []string{DATA_CALL_PREFIX, updateLikeReqest.DataCallID, updateLikeReqest.DataCallVersion}
	dataCallKey, _ := stub.CreateCompositeKey(DOCUMENT_TYPE, pks)
	dataCallAsBytes, err := stub.GetState(dataCallKey)
	if err != nil {
		return shim.Error("UpdateLikeCountForDataCall: Error retreiving data for key" + dataCallKey)
	}

	var prevDataCall DataCall
	err = json.Unmarshal(dataCallAsBytes, &prevDataCall)
	if err != nil {
		return shim.Error("UpdateLikeCountForDataCall: Failed to unmarshal data call: " + err.Error())
	}

	//Invoke CountLikes to get the total likes count for the data call
	var getLikesCount LikeCountEntry
	getLikesCount.DatacallID = updateLikeReqest.DataCallID
	getLikesCount.DataCallVersion = updateLikeReqest.DataCallVersion
	getLikesCountJson, _ := json.Marshal(getLikesCount)
	countLikesResponse := this.CountLikes(stub, string(getLikesCountJson))
	if countLikesResponse.Status != 200 || len(countLikesResponse.Payload) <= 0 {
		logger.Error("UpdateLikeCountForDataCall: Unable to CountLikes: ", countLikesResponse)
		return shim.Error(errors.New("UpdateLikeCountForDataCall: Unable to CountLikes").Error())
	}

	var likeCountEntry LikeCountEntry
	json.Unmarshal(countLikesResponse.Payload, &likeCountEntry)
	logger.Debug("UpdateLikeCountForDataCall: InvokeResponse from CountLikes: delta ", (likeCountEntry.Delta))

	//update the dataCall with delta
	prevDataCall.LikeCount = likeCountEntry.Delta
	prevDataAsBytes, _ := json.Marshal(prevDataCall)
	err = stub.PutState(dataCallKey, prevDataAsBytes)
	if err != nil {
		logger.Error("UpdateLikeCountForDataCall: Error updating DataCall for LikeCount")
		return shim.Error("UpdateLikeCountForDataCall: Error updating DataCall for LikeCount: " + err.Error())
	}

	return shim.Success(nil)

}

func GetLikesCount(stub shim.ChaincodeStubInterface, args []string, idAndVersionMap map[string]string) map[string]int {
	logger.Info("Inside GetLikesCount and args are ", args)
	var likeCounts map[string]int
	likeCounts = make(map[string]int)

	var queryStr string
	queryStr = fmt.Sprintf("{\"selector\":{\"_id\":{\"$regex\":\"%s\"},\"datacallID\":{\"$in\":[%s]}},\"use_index\":[\"_design/dataCallId\"]}", LIKE_PREFIX, strings.Trim(fmt.Sprint(args), "[]"))

	deltaResultsIterator, _ := stub.GetQueryResult(queryStr)

	defer deltaResultsIterator.Close()

	// Check the variable existed
	if !deltaResultsIterator.HasNext() {
		logger.Info("GetLikesCount: No Likes found for criteria, returning 0 delta")
		return likeCounts
	}

	for deltaResultsIterator.HasNext() {
		likeCountsAsBytes, _ := deltaResultsIterator.Next()
		var tempLikeCounts LikeCountEntry
		_ = json.Unmarshal([]byte(likeCountsAsBytes.GetValue()), &tempLikeCounts)

		if idAndVersionMap[tempLikeCounts.DatacallID] == tempLikeCounts.DataCallVersion {
			likeCounts[tempLikeCounts.DatacallID] = likeCounts[tempLikeCounts.DatacallID] + tempLikeCounts.Delta
		}

		//likeCounts[tempLikeCounts.DatacallID] = likeCounts[tempLikeCounts.DatacallID] + tempLikeCounts.Delta

	}

	return likeCounts
}
