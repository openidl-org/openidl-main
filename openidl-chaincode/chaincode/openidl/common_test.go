// SPDX-License-Identifier: Apache-2.0
package main

import (
	"fmt"
	"os"
	"testing"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

var defaultStub *CouchDBMockStub
var carrierStub *CouchDBMockStub
var mutlicarrierStub *CouchDBMockStub

// setupMultiChannelTest Setup multi-channel Test Envrionment
func setupMultiChannelTest() {
	os.Setenv(LOGGING_LEVEL, "DEBUG")
	openIDLTestCCC := new(openIDLTestCC)
	// Create A DataCall on default channel
	defaultStub = NewCouchDBMockStub("DefaultChannelStub", openIDLTestCCC)
	defaultStub.MockStub.ChannelID = "defaultchannel"

	// create sutb and channel for aais-carrier1 channel
	carrierStub = NewCouchDBMockStub("CarrierStub", openIDLTestCCC)
	carrierStub.MockStub.ChannelID = "aais-carrier1"

	// create sutb and channel for aais-carriers channel
	mutlicarrierStub = NewCouchDBMockStub("MultiCarrierStub", openIDLTestCCC)
	mutlicarrierStub.MockStub.ChannelID = "aais-carriers"
	MockInit(mutlicarrierStub, "init", []byte("{\"channelIDs\":[\"aais-carrier1\"]}"))
	registerCrossChanelChaincode()

	initializeCrossChannelInvoke(defaultStub, "GetDataCallByIdAndVersion", GET_DATA_CALL_BY_ID_AND_VERSION_VALID_JSON)
	initializeCrossChannelInvoke(carrierStub, "ListLikesByDataCall", LIST_LIKE_CRITERIA_JSON)
	initializeCrossChannelInvoke(carrierStub, "ListConsentsByDataCall", LIST_CONSENT_CRITERIA_JSON)

}

//  registerCrossChanelChaincode Register a chaincode on channel that should be called from another channel
func registerCrossChanelChaincode() {
	carrierStub.MockStub.MockPeerChaincode("openidl-chaincode/defaultchannel", defaultStub.MockStub)
	mutlicarrierStub.MockStub.MockPeerChaincode("openidl-chaincode/defaultchannel", defaultStub.MockStub)
	mutlicarrierStub.MockStub.MockPeerChaincode("openidl-chaincode/aais-carrier1", carrierStub.MockStub)
}

// Intiailze the Invoke Function with argutems for cross-channel Invoke
func initializeCrossChannelInvoke(channelStub *CouchDBMockStub, ccfunction string, requestJson string) {
	requestArgs := ToChaincodeArgs(ccfunction, requestJson)
	channelStub.MockStub.MockInit(generateTransactionId(), requestArgs)
}

// callCreateDatacall Common function to createDatacall on a channel used by various other test functions
func callCreateDatacall(t *testing.T, channelStub *CouchDBMockStub, datacallJson string) {
	datacallResponse := checkInvoke(t, defaultStub, "CreateDataCall", []byte(CREATE_DATA_CALL_FOR_UPDATE_JSON))
	if datacallResponse.Status != shim.OK {
		fmt.Println("createDatacall: Datacall Creation Failed: ", string(datacallResponse.Message))
		t.FailNow()
	}
}
