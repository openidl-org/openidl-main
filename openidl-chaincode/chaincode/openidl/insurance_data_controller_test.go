package main

import (
	"encoding/json"
	"fmt"
	"reflect"
	"testing"

	"github.com/golang/protobuf/proto"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/msp"
	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
)

//Test for SaveInsuranceHash
//This function tests whether it returns error for empty BatchId.
//This function tests whether it returns 200 for Success.
//This function tests whether it stores hash.
func Test_SaveInsuranceHash_Should_Save_Insurance_Data_Hash(t *testing.T) {
	fmt.Println("Test_SaveInsuranceHash_Should_Save_Insurance_Data_Hash")
	scc := new(SmartContract)
	stub := NewCouchDBMockStub("OpenIDLMockStub", scc)
	sid := &msp.SerializedIdentity{Mspid: "aaismsp", IdBytes: idbytes}
	b, err := proto.Marshal(sid)
	if err != nil {
		t.FailNow()
	}

	stub.Creator = b
	//test for SaveInsuranceHash
	//Step-1: For ERROR- Check whether it returns error for empty ID
	res_err_saveHash := checkInvoke_forError(t, stub, "SaveInsuranceDataHash", []byte(SAVE_INSURANCE_HASH_EMPTY_ID_JSON))
	var err_message_for_saveHash = res_err_saveHash.Message
	if res_err_saveHash.Status != shim.OK {
		assert.Equal(t, "BatchId should not be Empty", err_message_for_saveHash, "Test_SaveInsuranceHash: For Empty Id")
	} else {
		t.FailNow()
	}
	//Step-2: For SUCCESS- Check whether it returns 200
	res_saveHash := checkInvoke(t, stub, "SaveInsuranceDataHash", []byte(SAVE_INSURANCE_HASH_VALID_JSON))
	fmt.Println("result: ", res_saveHash)
	if res_saveHash.Status != shim.OK {
		logger.Error("SaveInsuranceHash failed with message res.Message: ", string(res_saveHash.Message))
		fmt.Println("SaveInsuranceHash failed with message res.Message: ", string(res_saveHash.Message))
		t.FailNow()
	}
	var saveHash_returnCode = int(res_saveHash.Status)
	fmt.Println("result: ", saveHash_returnCode)
	assert.Equal(t, 200, saveHash_returnCode, "Test_SaveInsuranceHash: Function's success, status code 200.")

	//Step-3: For SUCCESS- Check whether input object matches output object
	res_getHashById := checkInvoke(t, stub, "GetHashById", []byte(SAVE_INSURANCE_HASH_VALID_JSON))
	var input_saveHash InsuranceDataHash
	json.Unmarshal([]byte(SAVE_INSURANCE_HASH_VALID_JSON), &input_saveHash)
	var output_saveHash InsuranceDataHash
	err_saveHash := json.Unmarshal(res_getHashById.Payload, &output_saveHash)
	if err_saveHash != nil {
		logger.Error("Test_SaveInsuranceHash: Error during json.Unmarshal for GetReportById: ", err_saveHash)
		t.FailNow()
	}
	assert.True(t, reflect.DeepEqual(input_saveHash, output_saveHash))

}

//Test for SaveInsuranceData
//This function tests whether it returns error for empty BatchId.
//This function tests whether it returns 200 for Success.
//This function tests whether it stores insurance data.
//TODO setup transient map in CC properly
// func Test_SaveInsuranceData_Should_Save_Insurance_Data(t *testing.T) {
// 	fmt.Println("Test_SaveInsuranceData_Should_Save_Insurance_Data")
// 	scc := new(SmartContract)
// 	stub := NewCouchDBMockStub("OpenIDLMockStub", scc)

// 	idbytes := []byte("-----BEGIN CERTIFICATE-----\nMIIC9jCCApygAwIBAgIUOMN75DWaUlcAK7Lgp0gzqdMSqNQwCgYIKoZIzj0EAwIw\naDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQK\nEwtIeXBlcmxlZGdlcjEPMA0GA1UECxMGRmFicmljMRkwFwYDVQQDExBmYWJyaWMt\nY2Etc2VydmVyMB4XDTIxMTIyOTE5NDgwMFoXDTIyMTIyOTE5NTUwMFowejELMAkG\nA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQKEwtIeXBl\ncmxlZGdlcjEPMA0GA1UECxMGY2xpZW50MSswKQYDVQQDEyJvcGVuaWRsLWFhaXMt\nZGF0YS1jYWxsLWFwcC1pYnAtMi4wMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE\nra9DYcUE/j8GsdWozTY7Bveby+LbNgOqdWU/K5PIoFOP5xm1Ff17qT3pO4JpfYIZ\n8P595eUqI/BV5lIkFYO/yaOCARAwggEMMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMB\nAf8EAjAAMB0GA1UdDgQWBBRrxFVi6Q9j9EjNJCIKOY3fc9hQlzAfBgNVHSMEGDAW\ngBSJLDP44IEZx2UMsiVw7Xd8cHcpTjAfBgNVHREEGDAWghRhZG5hbi1UaGlua1Bh\nZC1UNDgwczCBigYIKgMEBQYHCAEEfnsiYXR0cnMiOnsiaGYuQWZmaWxpYXRpb24i\nOiIiLCJoZi5FbnJvbGxtZW50SUQiOiJvcGVuaWRsLWFhaXMtZGF0YS1jYWxsLWFw\ncC1pYnAtMi4wIiwiaGYuVHlwZSI6ImNsaWVudCIsIm9yZ1R5cGUiOiJhZHZpc29y\neSJ9fTAKBggqhkjOPQQDAgNIADBFAiEA5tCWIZ3glRCWNISUXkai9IloA8d8NwMF\nrpGoD6vlA5ACIDgllQ65mUStPFDKFlJn/9M3d/L1h+6jDolUcTLQ2cPG\n-----END CERTIFICATE-----\n")
// 	sid := &msp.SerializedIdentity{Mspid: "aaismsp", IdBytes: idbytes}
// 	b, err := proto.Marshal(sid)
// 	if err != nil {
// 		t.FailNow()
// 	}

// 	stub.Creator = b
// 	//test for SaveInsuranceData
// 	//Step-1: For ERROR- Check whether it returns error for empty ID
// 	res_err_saveData := checkInvoke_forError(t, stub, "SaveInsuranceData", []byte(SAVE_INSURANCE_DATA_EMPTY_CARRIER_ID_JSON))
// 	var err_message_for_saveData = res_err_saveData.Message
// 	if res_err_saveData.Status != shim.OK {
// 		assert.Equal(t, "CarrierId should not be Empty", err_message_for_saveData, "Test_SaveInsuranceData: For Empty Id")
// 	} else {
// 		t.FailNow()
// 	}

// 	//Step-2: For SUCCESS- Check whether it returns 200
// 	// res_saveData := checkInvoke(t, stub, "SaveInsuranceData", []byte(SAVE_INSURANCE_DATA_VALID_JSON))
// 	// if res_saveData.Status != shim.OK {
// 	// 	logger.Error("SaveInsuranceData failed with message res.Message: ", string(res_saveData.Message))
// 	// 	fmt.Println("SaveInsuranceData failed with message res.Message: ", string(res_saveData.Message))
// 	// 	t.FailNow()
// 	// }
// 	// var saveData_returnCode = int(res_saveData.Status)
// 	// assert.Equal(t, 200, saveData_returnCode, "Test_SaveInsuranceData: Function's success, status code 200.")

// 	//Step-3: For SUCCESS- Check whether input object matches output object
// 	// res_getHashById := checkInvoke(t, stub, "SaveInsuranceData", []byte(SAVE_INSURANCE_HASH_VALID_JSON))
// 	// var input_saveInsuranceData InsuranceData
// 	// json.Unmarshal([]byte(SAVE_INSURANCE_DATA_VALID_JSON), &input_saveInsuranceData)
// 	// pageNumberAsString := strconv.Itoa(input_saveInsuranceData.PageNumber)
// 	// var output_saveInsuranceData InsuranceData
// 	// namespace := INSURANCE_TRANSACTIONAL_RECORD_PREFIX
// 	// key, _ := stub.CreateCompositeKey(namespace, []string{input_saveInsuranceData.DataCallId, input_saveInsuranceData.DataCallVersion, input_saveInsuranceData.CarrierId, pageNumberAsString})
// 	// res_insuranceData, err := stub.GetPrivateData(PRIVATE_DATA_COLLECTION_PDC, key)
// 	// if err != nil {
// 	// 	logger.Error("Test_SaveInsuranceData: Failed to get Insurance Data for key", key)
// 	// 	t.FailNow()
// 	// }
// 	// err_saveInsuranceData := json.Unmarshal(res_insuranceData, &output_saveInsuranceData)
// 	// if err_saveInsuranceData != nil {
// 	// 	logger.Error("Test_SaveInsuranceData: Error during json.Unmarshal : ", err_saveInsuranceData)
// 	// 	t.FailNow()
// 	// }
// 	// assert.True(t, reflect.DeepEqual(input_saveInsuranceData, output_saveInsuranceData))
// }
