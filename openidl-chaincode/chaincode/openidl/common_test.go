package main

import (
	"fmt"
	"os"
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/shim"
)

var defaultStub *CouchDBMockStub
var carrierStub *CouchDBMockStub
var mutlicarrierStub *CouchDBMockStub
var idbytes = []byte("-----BEGIN CERTIFICATE-----\nMIIC9jCCApygAwIBAgIUOMN75DWaUlcAK7Lgp0gzqdMSqNQwCgYIKoZIzj0EAwIw\naDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQK\nEwtIeXBlcmxlZGdlcjEPMA0GA1UECxMGRmFicmljMRkwFwYDVQQDExBmYWJyaWMt\nY2Etc2VydmVyMB4XDTIxMTIyOTE5NDgwMFoXDTIyMTIyOTE5NTUwMFowejELMAkG\nA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQKEwtIeXBl\ncmxlZGdlcjEPMA0GA1UECxMGY2xpZW50MSswKQYDVQQDEyJvcGVuaWRsLWFhaXMt\nZGF0YS1jYWxsLWFwcC1pYnAtMi4wMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE\nra9DYcUE/j8GsdWozTY7Bveby+LbNgOqdWU/K5PIoFOP5xm1Ff17qT3pO4JpfYIZ\n8P595eUqI/BV5lIkFYO/yaOCARAwggEMMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMB\nAf8EAjAAMB0GA1UdDgQWBBRrxFVi6Q9j9EjNJCIKOY3fc9hQlzAfBgNVHSMEGDAW\ngBSJLDP44IEZx2UMsiVw7Xd8cHcpTjAfBgNVHREEGDAWghRhZG5hbi1UaGlua1Bh\nZC1UNDgwczCBigYIKgMEBQYHCAEEfnsiYXR0cnMiOnsiaGYuQWZmaWxpYXRpb24i\nOiIiLCJoZi5FbnJvbGxtZW50SUQiOiJvcGVuaWRsLWFhaXMtZGF0YS1jYWxsLWFw\ncC1pYnAtMi4wIiwiaGYuVHlwZSI6ImNsaWVudCIsIm9yZ1R5cGUiOiJhZHZpc29y\neSJ9fTAKBggqhkjOPQQDAgNIADBFAiEA5tCWIZ3glRCWNISUXkai9IloA8d8NwMF\nrpGoD6vlA5ACIDgllQ65mUStPFDKFlJn/9M3d/L1h+6jDolUcTLQ2cPG\n-----END CERTIFICATE-----\n")

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
	// initializeCrossChannelInvoke(carrierStub, "GetConsentsByDataCall", LIST_CONSENT_CRITERIA_NEW_JSON)

}

//  registerCrossChanelChaincode Register a chaincode on channel that should be called from another channel
func registerCrossChanelChaincode() {
	carrierStub.MockStub.MockPeerChaincode("openidl-cc-default", defaultStub.MockStub, "defaultchannel")
	mutlicarrierStub.MockStub.MockPeerChaincode("openidl-cc-default", defaultStub.MockStub, "defaultchannel")
	mutlicarrierStub.MockStub.MockPeerChaincode("openidl-cc-default", carrierStub.MockStub, "aais-carrier1")
}

// Intiailze the Invoke Function with argutems for cross-channel Invoke
func initializeCrossChannelInvoke(channelStub *CouchDBMockStub, ccfunction string, requestJson string) {
	requestArgs := ToChaincodeArgs(ccfunction, requestJson)
	channelStub.MockStub.MockInit(generateTransactionId(), requestArgs)
}

// callCreateDatacall Common function to createDatacall on a channel used by various other test functions
func callCreateDatacall(t *testing.T, channelStub *CouchDBMockStub, datacallJson string) {
	fmt.Println("inside callCreateDatacall")
	datacallResponse := checkInvoke(t, defaultStub, "CreateDataCall", []byte(CREATE_DATA_CALL_FOR_UPDATE_JSON))
	if datacallResponse.Status != shim.OK {
		fmt.Println("createDatacall: Datacall Creation Failed: ", string(datacallResponse.Message))
		t.FailNow()
	}
}
