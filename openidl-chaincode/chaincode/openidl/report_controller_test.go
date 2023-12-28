package main

import (
	"encoding/json"
	"fmt"
	"reflect"

	"github.com/golang/protobuf/proto"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/msp"
	"github.com/stretchr/testify/assert"

	//"strconv"
	"testing"

	logger "github.com/sirupsen/logrus"
)

// here we are implementing basic testing for the function ListReportsByCriteria
// as this function is using GetQueryResult method which is
// Not implemented since the mock engine does not have a query engine.

//Test for CreateReport
//This function tests whether it returns error for empty Id.
//This function tests whether it returns 200 for Success.
//This function tests whether it creates Report.
func Test_CreateReport_Should_Create_New_Report(t *testing.T) {
	fmt.Println("Test_CreateReport_Should_Create_New_Report")
	scc := new(SmartContract)
	stub := NewCouchDBMockStub("OpenIDLMockStub", scc)
	sid := &msp.SerializedIdentity{Mspid: "aaismsp", IdBytes: idbytes}
	b, err := proto.Marshal(sid)
	if err != nil {
		t.FailNow()
	}
	stub.Creator = b

	//test for CreateReport
	//Step-1: For ERROR- Check whether it returns error for empty ID
	res_err_createReport := checkInvoke_forError(t, stub, "CreateReport", []byte(CREATE_REPORT_EMPTY_ID_JSON))
	var err_message_for_create = res_err_createReport.Message
	if res_err_createReport.Status != shim.OK {
		assert.Equal(t, "DataCallID is empty!!", err_message_for_create, "Test_CreateReport: For Empty Id")
	} else {
		t.FailNow()
	}

	//Step-2: For SUCCESS- Check whether it returns 200
	res_createReport := checkInvoke(t, stub, "CreateReport", []byte(CREATE_REPORT_VALID_JSON))
	if res_createReport.Status != shim.OK {
		logger.Error("CreateReport failed with message res.Message: ", string(res_createReport.Message))
		fmt.Println("CreateReport failed with message res.Message: ", string(res_createReport.Message))
		t.FailNow()
	}
	var create_returnCode = int(res_createReport.Status)
	assert.Equal(t, 200, create_returnCode, "Test_CreateReport: Function's success, status code 200.")

	//Step-3: For SUCCESS- Check whether input ID matches output ID
	res_getReportById := checkInvoke(t, stub, "GetReportById", []byte(GET_REPORT_BY_ID_FOR_CREATE_JSON))
	var input_create Report
	json.Unmarshal([]byte(CREATE_REPORT_VALID_JSON), &input_create)
	var output_create Report
	err_create := json.Unmarshal(res_getReportById.Payload, &output_create)
	if err_create != nil {
		logger.Error("Test_CreateReport: Error during json.Unmarshal for GetReportById: ", err_create)
		t.FailNow()
	}
	assert.True(t, reflect.DeepEqual(input_create, output_create))

}

//Test for UpdateReport
//This function tests whether it returns error for empty Id.
//This function tests whether it returns 200 for Success.
//This function tests whether it  updates status.
func Test_UpdateReport_Should_Update_Report(t *testing.T) {
	fmt.Println("Test_UpdateReport_Should_Update_Report")
	scc := new(SmartContract)
	stub := NewCouchDBMockStub("OpenIDLMockStub", scc)
	sid := &msp.SerializedIdentity{Mspid: "aaismsp", IdBytes: idbytes}
	b, err := proto.Marshal(sid)
	if err != nil {
		t.FailNow()
	}
	stub.Creator = b

	//Step-1: For ERROR- Check whether it returns error for empty ID
	res_err_updateReport := checkInvoke_forError(t, stub, "UpdateReport", []byte(UPDATE_REPORT_EMPTY_ID_JSON))
	var err_message = res_err_updateReport.Message
	if res_err_updateReport.Status != shim.OK {
		assert.Equal(t, "DataCallID is empty!!", err_message, "Test_UpdateReport: For Empty Id")
	} else {
		t.FailNow()
	}

	//Step-2: For SUCCESS- Check whether it returns 200
	//firstly create the Report for Update, else it will give error while fething the record to update
	checkInvoke(t, stub, "CreateReport", []byte(CREATE_REPORT_VALID_JSON))
	res_updateReport := checkInvoke(t, stub, "UpdateReport", []byte(UPDATE_REPORT_VALID_JSON))
	if res_updateReport.Status != shim.OK {
		logger.Error("UpdateReport failed with message res.Message: ", string(res_updateReport.Message))
		fmt.Println("UpdateReport failed with message res.Message: ", string(res_updateReport.Message))
		t.FailNow()
	}

	var update_returnCode = int(res_updateReport.Status)
	assert.Equal(t, 200, update_returnCode, "Test_UpdateReport: Function's success, status code 200.")

	//Step-3: For SUCCESS- Check whether Status is set
	res_getReportById := checkInvoke(t, stub, "GetReportById", []byte(GET_REPORT_BY_ID_FOR_CREATE_JSON))
	var input_update Report
	json.Unmarshal([]byte(UPDATE_REPORT_VALID_JSON), &input_update)

	var output_update Report
	err_update := json.Unmarshal(res_getReportById.Payload, &output_update)
	if err_update != nil {
		logger.Error("Test_UpdateReport: Error during json.Unmarshal for GetReportById: ", err_update)
		t.FailNow()
	}

	assert.True(t, reflect.DeepEqual(input_update, output_update))

}

//Test for ListReportsByCriteria
//This function tests whether it returns error for empty DataCallID.
func Test_ListReportsByCriteria_Should_Return_List_Of_Reports(t *testing.T) {
	fmt.Println("Test_ListReportsByCriteria_Should_Return_List_Of_Reports")
	scc := new(SmartContract)
	stub := NewCouchDBMockStub("OpenIDLMockStub", scc)
	sid := &msp.SerializedIdentity{Mspid: "aaismsp", IdBytes: idbytes}
	b, err := proto.Marshal(sid)
	if err != nil {
		t.FailNow()
	}
	stub.Creator = b

	//Step-1: For ERROR- Check whether it returns error for empty ID
	res_err_listByCriteria := checkInvoke_forError(t, stub, "ListReportsByCriteria", []byte(CREATE_REPORT_EMPTY_ID_JSON))
	var err_message_listByCriteria = res_err_listByCriteria.Message
	if res_err_listByCriteria.Status != shim.OK {
		assert.Equal(t, "DataCallID is empty!!", err_message_listByCriteria, "Test_ListReportsByCriteria: For Empty Id")
	} else {
		t.FailNow()
	}

	//Step-2: For ERROR- Check whether it returns error as GetQueryResult is not implemented
	//checkInvoke(t, stub, "CreateReport", []byte(CREATE_REPORT_VALID_JSON))
	res_err_getDataCallVersions := checkInvoke_forError(t, stub, "ListReportsByCriteria", []byte(GET_REPORT_BY_CRITERIA_JSON))
	var err_message_getDataCallVersions = res_err_getDataCallVersions.Message
	if res_err_getDataCallVersions.Status != shim.OK {
		fmt.Print("err_message_getDataCallVersions > ", err_message_getDataCallVersions)
		assert.Equal(t, "ListReportsByCriteria: failed to get list of Reports: not implemented", err_message_getDataCallVersions, "Test_GetDataCallVersionsById: For Method not implemented")
	} else {
		t.FailNow()
	}

}
