package main

import (
	"encoding/json"
	//"fmt"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	pb "github.com/hyperledger/fabric-protos-go/peer"
	logger "github.com/sirupsen/logrus"

	//"github.com/stretchr/testify/assert"
	"os"
	//"testing"
)

// openIDLCC is a chaincode component that supports the mainFunction operations for the openIDL network
type openIDLTestCC struct {
	carriers map[string]Carrier
	SmartContract
}

func (this *openIDLTestCC) Init(stub shim.ChaincodeStubInterface) pb.Response {
	logger.Debug("Init: enter")
	defer logger.Debug("Init: exit")

	init_args := stub.GetStringArgs()
	logger.Debug("Init args > ", init_args)
	if len(init_args) == 2 {
		initChannelsJson := init_args[1]
		logger.Debug("Channels Argument > ", initChannelsJson)
		json.Unmarshal([]byte(initChannelsJson), &crossInvocationChannels)
		logger.Debug("Channels List Marshalled Successfully > ", crossInvocationChannels)
	}

	// this.carriers = GetCarriersMap()

	return shim.Success(nil)
}

func (this *openIDLTestCC) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	logger.Debug("Invoke: enter")
	defer logger.Debug("Invoke: exit")
	os.Setenv(LOGGING_LEVEL, "DEBUG")
	//function and parameters
	function, args := stub.GetFunctionAndParameters()

	logger.Debug("Invoke: function: ", function)

	if function == "CreateDataCall" {
		return this.CreateDataCall(stub, args[0])
	} else if function == "ListDataCallsByCriteria" {
		return this.ListDataCallsByCriteria(stub, args[0])
	} else if function == "SaveNewDraft" {
		return this.SaveNewDraft(stub, args[0])
	} else if function == "GetDataCallVersionsById" {
		return this.GetDataCallVersionsById(stub, args[0])
	} else if function == "GetDataCallByIdAndVersion" {
		return this.GetDataCallByIdAndVersion(stub, args[0])
	} else if function == "UpdateDataCall" {
		return this.UpdateDataCall(stub, args[0])
	} else if function == "IssueDataCall" {
		return this.IssueDataCall(stub, args[0])
	} else if function == "ToggleLike" {
		return this.ToggleLike(stub, args[0])
	} else if function == "CreateLikeCountEntry" {
		return this.CreateLikeCountEntry(stub, args[0])
	} else if function == "CountLikes" {
		return this.CountLikes(stub, args[0])
	} else if function == "CreateConsent" {
		return this.CreateConsent(stub, args[0])
	} else if function == "CreateConsentCountEntry" {
		return this.CreateConsentCountEntry(stub, args[0])
	} else if function == "CountConsents" {
		return this.CountConsents(stub, args[0])
	} else if function == "ListConsentsByDataCall" {
		return this.ListConsentsByDataCall(stub, args[0])
	} else if function == "GetConsentByDataCallAndOrganization" {
		return this.GetConsentByDataCallAndOrganization(stub, args)
	} else if function == "ListLikesByDataCall" {
		return this.ListLikesByDataCall(stub, args[0])
	} else if function == "GetLikesByDataCall" {
		return this.GetLikesByDataCall(stub, args[0])
	} else if function == "GetConsentsByDataCall" {
		return this.GetConsentsByDataCall(stub, args[0])
	} else if function == "GetLikeByDataCallAndOrganization" {
		return this.GetLikeByDataCallAndOrganization(stub, args)
	} else if function == "SaveAndIssueDataCall" {
		return this.SaveAndIssueDataCall(stub, args[0])
	} else if function == "CreateReport" {
		return this.CreateReport(stub, args[0])
	} else if function == "UpdateReport" {
		return this.UpdateReport(stub, args[0])
	} else if function == "ListReportsByCriteria" {
		return this.ListReportsByCriteria(stub, args[0])
	} else if function == "ResetWorldState" {
		return this.ResetWorldState(stub)
	} else if function == "LogDataCallTransaction" {
		return this.LogDataCallTransaction(stub, args[0])
	} else if function == "GetDataCallTransactionHistory" {
		return this.GetDataCallTransactionHistory(stub, args[0])
	} else if function == "GetReportById" {
		return this.GetReportById(stub, args[0])
	} else if function == "ListDataCallTransactionHistory" {
		return this.ListDataCallTransactionHistory(stub, args[0])
	} else if function == "SaveInsuranceDataHash" {
		return this.SaveInsuranceDataHash(stub, args[0])
	} else if function == "GetHashById" {
		return this.GetHashById(stub, args[0])
	} else if function == "SaveInsuranceData" {
		return this.SaveInsuranceData(stub, args)
	}

	return shim.Error("Invalid Function: " + function)
}

/*func Test_Ping(t *testing.T) {
	fmt.Println("Test_Ping")

	scc := new(openIDLTestCC)
	stub := NewCouchDBMockStub("Test_Ping", scc)
	res_ping := checkInvoke(t, stub, "Ping", []byte{})

	fmt.Println(res_ping.Message)
	var returnCode = int(res_ping.Status)
	assert.Equal(t, 200, returnCode, "Test_Ping function's success")

}
*/
