package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
)

//Test for ResetWorldState
func Test_ResetWorldState(t *testing.T) {

	// setup Multi-channel Test Envrionment
	setupMultiChannelTest()

	// Create 1 DataCall on default channel
	callCreateDatacall(t, defaultStub, CREATE_DATA_CALL_FOR_UPDATE_JSON)

	// Create 1 Datacall log element on default channel
	checkInvoke(t, defaultStub, "LogDataCallTransaction", []byte(CREATE_DATACALL_LOG_ENTRY))

	// Create 1 Report on default channel
	checkInvoke(t, defaultStub, "CreateReport", []byte(CREATE_REPORT_VALID_JSON))

	// create 1 consent record on multi carrier channel
	checkInvoke(t, mutlicarrierStub, "CreateConsent", []byte(CONSENT_TEST_DATA_CARRIER1))

	// create 1 like record on multi carrier channel
	checkInvoke(t, mutlicarrierStub, "ToggleLike", []byte(LIKE_JSON_MULTI_CARRIER))

	// Total 3 records created on default channel
	res_getDataCallHistory := checkInvoke(t, defaultStub, "GetDataCallTransactionHistory", []byte(CREATE_DATACALL_LOG_ENTRY))
	var DataCallHistory []DataCallLog
	json.Unmarshal(res_getDataCallHistory.Payload, &DataCallHistory)
	totalDataCallLogs := len(DataCallHistory)

	// Get total datacall logs created as a result of functions
	TOTAL_TEST_RECORDS_CREATED_ON_DEFAULT_CHANNEL := 2
	TOTAL_TEST_RECORS_CREATED_ON_MULTI_CARRIER_CHANNEL := 2
	totalRecordsDeleted := totalDataCallLogs + TOTAL_TEST_RECORDS_CREATED_ON_DEFAULT_CHANNEL

	res_resetDefaultLedger := checkInvokeForResetLedger(t, defaultStub, "ResetWorldState")
	if res_resetDefaultLedger.Status != shim.OK {
		logger.Error("ResetWorldState failed with message res.Message: ", string(res_resetDefaultLedger.Message))
		fmt.Println("CreateRResetWorldStateeport failed with message res.Message: ", string(res_resetDefaultLedger.Message))
		t.FailNow()
	}

	res_resetMultiCarrierLedger := checkInvokeForResetLedger(t, mutlicarrierStub, "ResetWorldState")
	if res_resetMultiCarrierLedger.Status != shim.OK {
		logger.Error("ResetWorldState failed with message res.Message: ", string(res_resetMultiCarrierLedger.Message))
		fmt.Println("CreateRResetWorldStateeport failed with message res.Message: ", string(res_resetMultiCarrierLedger.Message))
		t.FailNow()
	}

	//Step-1: For ERROR- check whether returns 200 for success
	var returnCodeDefault = int(res_resetDefaultLedger.Status)
	assert.Equal(t, 200, returnCodeDefault, "Test_ResetWorldState: Function's success, status code 200.")

	//Step-1: For ERROR- check whether returns 200 for success
	var returnCodeMC = int(res_resetMultiCarrierLedger.Status)
	assert.Equal(t, 200, returnCodeMC, "Test_ResetWorldState: Function's success, status code 200.")

	//Step-2: For SUCCESS- Total number records created on each channel and total number of records deleted on each channel

	assert.EqualValues(t, strconv.Itoa(totalRecordsDeleted), string(res_resetDefaultLedger.Payload), "Test_ResetWorldState: function's success")
	assert.EqualValues(t, strconv.Itoa(TOTAL_TEST_RECORS_CREATED_ON_MULTI_CARRIER_CHANNEL), string(res_resetMultiCarrierLedger.Payload), "Test_ResetWorldState: function's success")

}
