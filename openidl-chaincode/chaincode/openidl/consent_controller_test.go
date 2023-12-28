package main

import (
	"encoding/json"
	"fmt"
	"reflect"
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	pb "github.com/hyperledger/fabric-protos-go/peer"
	"github.com/stretchr/testify/assert"
)

// callCreateConsent Common test function to create Consent on channel and to be used for all test cases
func callCreateConsent(t *testing.T, channelStub *CouchDBMockStub, consentJson string) pb.Response {
	// Create Like on Carrier channel
	fmt.Println("inside callCreateConsent")
	createConsentResponse := checkInvoke(t, channelStub, "CreateConsent", []byte(consentJson))
	if createConsentResponse.Status != shim.OK {
		t.FailNow()
	}

	fmt.Println("inside callCreateConsent, before return")
	return createConsentResponse
}

// callListConsentsByDataCall Common test function to list Consents based on input criteria from specified channel
func callListConsentsByDataCall(t *testing.T, channelStub *CouchDBMockStub, requestJson string) []ListConsentResponse {
	// Create Like on channel
	fmt.Println("inside callListConsentsByDataCall")
	fmt.Println("requestJSon: ", requestJson)
	var input ListConsentRequest
	json.Unmarshal([]byte(requestJson), &input)
	listConsentsResponse := checkInvoke(t, channelStub, "ListConsentsByDataCall", []byte(requestJson))
	if listConsentsResponse.Status != shim.OK {
		t.FailNow()
	}

	var output []ListConsentResponse
	json.Unmarshal([]byte(listConsentsResponse.Payload), &output)
	return output
}

func Test_CreateConsent_Should_Create_A_Consent_When_Consent_Does_Not_Exist(t *testing.T) {
	fmt.Println("Test_CreateConsent_Should_Create_A_Consent_When_Consent_Does_Not_Exist")
	// Setup Multi Channel Test Environment
	setupMultiChannelTest()
	// Create A DataCall on default channel
	callCreateDatacall(t, defaultStub, CREATE_DATA_CALL_FOR_UPDATE_JSON)

	// Create Consent
	callCreateConsent(t, mutlicarrierStub, CONSENT_TEST_DATA_WITHOUT_DELTA)

	var input Consent
	json.Unmarshal([]byte(CONSENT_TEST_DATA_WITHOUT_DELTA), &input)

	// Get Consents from World State
	output := callListConsentsByDataCall(t, mutlicarrierStub, LIST_CONSENT_CRITERIA_NEW_JSON)

	// Validate Input and Output Consents are same
	assert.True(t, reflect.DeepEqual(output[0].Consent, input))
}
func Test_CountConsents_Should_Return_Number_Of_Consents_Same_As_Set_By_Creating_ConsentCountEntry(t *testing.T) {
	fmt.Println("Test_CountConsents_Should_Return_Number_Of_Consents_Same_As_Set_By_Creating_ConsentCountEntry")
	// Setup Multi Channel Test Environment
	setupMultiChannelTest()

	// Create Two Consent Entries with delta 1 as defined in mock json
	firstConsentEntryResponse := checkInvoke(t, defaultStub, "CreateConsentCountEntry", []byte(CONSENT_TEST_DATA_WITH_DELTA))
	if firstConsentEntryResponse.Status != shim.OK {
		fmt.Println("Test_CountConsents: CountConsents failed with message res.Message: ", string(firstConsentEntryResponse.Message))
		t.FailNow()
	}

	secondConsentEntryResponse := checkInvoke(t, defaultStub, "CreateConsentCountEntry", []byte(CONSENT_TEST_DATA_WITH_DELTA))
	if secondConsentEntryResponse.Status != shim.OK {
		fmt.Println("Test_CountConsents: CountConsents failed with message res.Message: ", string(secondConsentEntryResponse.Message))
		t.FailNow()
	}

	countConsentResponse := checkInvoke(t, defaultStub, "CountConsents", []byte(CONSENT_TEST_DATA_WITH_DELTA))

	if countConsentResponse.Status != shim.OK {
		fmt.Println("CreateConsent failed with message res.Message: ", string(countConsentResponse.Message))
		t.FailNow()
	}

	var output ConsentCountEntry
	err := json.Unmarshal([]byte(countConsentResponse.Payload), &output)
	_ = err

	//check whether on Success it returns code 200
	assert.Equal(t, 2, output.Delta, "Test_CreateConsent: Function's success, status code 200.")
}
func Test_ListConsentsByDataCall_Should_Return_List_Of_Consents_Based_On_Input_Criteria(t *testing.T) {
	// Setup Multi Channel Test Environment
	setupMultiChannelTest()

	// Create A DataCall on default channel
	callCreateDatacall(t, defaultStub, CREATE_DATA_CALL_FOR_UPDATE_JSON)

	var carrierConsentInput Consent
	json.Unmarshal([]byte(CONSENT_TEST_DATA_CARRIER1), &carrierConsentInput)

	var multiCarrierConsentInput Consent
	json.Unmarshal([]byte(CONSENT_TEST_DATA_MULTICARRIERs), &multiCarrierConsentInput)

	// Create Like on aais-carrie1 channel
	callCreateConsent(t, carrierStub, CONSENT_TEST_DATA_CARRIER1)

	// Create Like on aais-carries channel
	callCreateConsent(t, mutlicarrierStub, CONSENT_TEST_DATA_MULTICARRIERs)

	output := callListConsentsByDataCall(t, mutlicarrierStub, LIST_CONSENT_CRITERIA_NEW_JSON)

	//check whether on Success it returns code 200
	assert.Equal(t, 3, len(output), "Test_ListConsentsByDataCall: Function's success, status code 200.")
	assert.True(t, reflect.DeepEqual(output[0].Consent, carrierConsentInput))
	assert.True(t, reflect.DeepEqual(output[1].Consent, multiCarrierConsentInput))
}
func Test_GetConsentByDataCallAndOrganization_Should_Return_Consent_Based_On_Input_Carrier(t *testing.T) {
	fmt.Println("Test_ListConsentsByDataCall_Should_Return_List_Of_Consents_Based_On_Input_Criteria")
	// Setup Multi Channel Test Environment
	setupMultiChannelTest()

	// Create A DataCall on default channel
	callCreateDatacall(t, defaultStub, CREATE_DATA_CALL_FOR_UPDATE_JSON)

	var carrierConsentInput Consent
	json.Unmarshal([]byte(CONSENT_TEST_DATA_CARRIER1), &carrierConsentInput)

	// Create Like on aais-carrie1 channel
	callCreateConsent(t, carrierStub, CONSENT_TEST_DATA_CARRIER1)

	listConsentsResponse := checkInvoke(t, carrierStub, "GetConsentByDataCallAndOrganization", []byte(LIST_CONSENT_CRITERIA_JSON))
	if listConsentsResponse.Status != shim.OK {
		t.FailNow()
	}

	var output []ListConsentResponse
	json.Unmarshal([]byte(listConsentsResponse.Payload), &output)

	//check whether on Success it returns code 200
	assert.Equal(t, 1, len(output), "Test_ListConsentsByDataCall: Function's success, status code 200.")
	assert.True(t, reflect.DeepEqual(output[0].Consent, carrierConsentInput))
}