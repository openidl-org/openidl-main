// SPDX-License-Identifier: Apache-2.0
package main

import (
	"encoding/json"
	"reflect"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/stretchr/testify/assert"

	"fmt"
	"testing"
)

func Test_LogDataCallTransaction_Should_Create_New_A_DatacallLog_Entry_In_Ledger(t *testing.T) {
	fmt.Println("Test_LogDataCallTransaction_Should_Create_New_A_DatacallLog_Entry_In_Ledger")
	openIdlCC := new(openIDLTestCC)

	// Create A DataCall on default channel
	defaultStub := NewCouchDBMockStub("DefaultChannelStub", openIdlCC)

	var input DataCallLog
	json.Unmarshal([]byte(CREATE_DATACALL_LOG_ENTRY), &input)
	createDataCallLogResponse := checkInvoke(t, defaultStub, "LogDataCallTransaction", []byte(CREATE_DATACALL_LOG_ENTRY))

	if createDataCallLogResponse.Status != shim.OK {
		fmt.Println("LogDataCallTransaction failed with message res.Message: ", string(createDataCallLogResponse.Message))
		t.FailNow()
	}

	// fetch datacall log from ledger GetDataCallTransactionHistory
	listDataCallLogResponse := checkInvoke(t, defaultStub, "GetDataCallTransactionHistory", []byte(CREATE_DATACALL_LOG_ENTRY))
	if listDataCallLogResponse.Status != shim.OK {
		fmt.Println("LogDataCallTransaction failed with message res.Message: ", string(createDataCallLogResponse.Message))
		t.FailNow()
	}
	var output []DataCallLog
	json.Unmarshal(listDataCallLogResponse.Payload, &output)
	var returnCode = int(listDataCallLogResponse.Status)
	//check whether on Success it returns code 200
	assert.Equal(t, shim.OK, returnCode, "Test_LogDataCallTransaction: Function's success, status code 200.")
	assert.True(t, reflect.DeepEqual(output[0], input))
}

func Test_GetDataCallTransactionHistory_Should_Return_DatacallLog_Present_In_The_Ledger(t *testing.T) {
	fmt.Println("Test_GetDataCallTransactionHistory_Should_Return_DatacallLog_Present_In_The_Ledger")
	openIdlCC := new(openIDLTestCC)

	// Create A DataCall on default channel
	defaultStub := NewCouchDBMockStub("DefaultChannelStub", openIdlCC)

	var input DataCallLog
	json.Unmarshal([]byte(CREATE_DATACALL_LOG_ENTRY), &input)
	createDataCallLogResponse := checkInvoke(t, defaultStub, "LogDataCallTransaction", []byte(CREATE_DATACALL_LOG_ENTRY))

	if createDataCallLogResponse.Status != shim.OK {
		fmt.Println("GetDataCallTransactionHistory failed with message res.Message: ", string(createDataCallLogResponse.Message))
		t.FailNow()
	}

	// fetch datacall log from ledger GetDataCallTransactionHistory
	listDataCallLogResponse := checkInvoke(t, defaultStub, "GetDataCallTransactionHistory", []byte(CREATE_DATACALL_LOG_ENTRY))
	if listDataCallLogResponse.Status != shim.OK {
		fmt.Println("LogDataCallTransaction failed with message res.Message: ", string(createDataCallLogResponse.Message))
		t.FailNow()
	}
	var output []DataCallLog
	json.Unmarshal(listDataCallLogResponse.Payload, &output)
	var returnCode = int(listDataCallLogResponse.Status)
	//check whether on Success it returns code 200
	assert.Equal(t, shim.OK, returnCode, "Test_LogDataCallTransaction: Function's success, status code 200.")
	assert.True(t, reflect.DeepEqual(output[0], input))
}
