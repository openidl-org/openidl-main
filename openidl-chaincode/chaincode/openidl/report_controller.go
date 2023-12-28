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

// CreateReport creates a new report for a particular DataCall Id and version.
// Success: byte[]
// Error: {"message":"....","errorCode":"Sys_Err/Bus_Err"}
func (this *SmartContract) CreateReport(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("CreateReport: enter")
	defer logger.Debug("CreateReport: exit")
	var report Report
	var reportExist bool
	var isLocked bool
	var totalReports []Report
	var noOfReports int
	err := json.Unmarshal([]byte(args), &report)
	if err != nil {
		logger.Error("CreateReport: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("CreateReport: Error during json.Unmarshal").Error())
	}
	logger.Debug("Unmarshalled object for CreateReport", report)
	if report.DataCallID == "" {
		logger.Error("DataCallID is empty!!")
		return shim.Error("DataCallID is empty!!")
	}
	if report.DataCallVersion == "" {
		logger.Error("DataCallVersion is empty!!")
		return shim.Error("DataCallVersion is empty!!")
	}
	if report.Hash == "" {
		logger.Error("Hash is empty!!")
		return shim.Error("Hash is empty!!")
	}
	report.Status = STATUS_CANDIDATE

	// check whether report exist for the particular DataCallId AND Version
	//getting all the reports for the particular DataCallId and Version
	var pks []string = []string{REPORT_PREFIX, report.DataCallID, report.DataCallVersion}

	//Step-1: getting the previous data for the data call
	resultsIterator, errmsg := stub.GetStateByPartialCompositeKey(REPORT_DOCUMENT_TYPE, pks)
	if errmsg != nil {
		logger.Error("CreateReport: Failed to get state for previous reports")
		return shim.Error("CreateReport: Failed to get state for previous reports")
	}
	defer resultsIterator.Close()
	logger.Debug("CreateReport: ", resultsIterator)

	if !resultsIterator.HasNext() {

	} else {

		//set reportExist to true as report already exists
		reportExist = true
		for resultsIterator.HasNext() {
			prevReportAsBytes, err := resultsIterator.Next()
			if err != nil {
				logger.Error("Failed to iterate reports")
				return shim.Error("Failed to iterate reports")
			}
			var prevReport Report
			err = json.Unmarshal([]byte(prevReportAsBytes.GetValue()), &prevReport)
			if err != nil {
				logger.Error("Failed to unmarshal previous Report")
				return shim.Error("Failed to unmarshal previous Report: " + err.Error())
			}
			isLocked = prevReport.IsLocked
			totalReports = append(totalReports, prevReport)

		}

		//get the noOfReports that will be equal to no of Report version already exists
		noOfReports = len(totalReports)
	}

	if isLocked {
		return shim.Success([]byte("Report can not be created as the report is locked."))
	}

	//check if Report exist then update the ReportVersion by lenngth of reports, else set to 1
	if reportExist {
		report.ReportVersion = generateVersion(noOfReports)
	} else {
		report.ReportVersion = generateVersion(0)
	}

	//create composite key to store Report
	var pk []string = []string{REPORT_PREFIX, report.DataCallID, report.DataCallVersion, report.Hash}
	reportKey, _ := stub.CreateCompositeKey(REPORT_DOCUMENT_TYPE, pk)
	logger.Debug("Composite Key for CreateReport", reportKey)

	//Check leadger if report already exists for this key
	prevReport, _ := stub.GetState(reportKey)
	if prevReport != nil {
		logger.Error("Report already exist for : ", reportKey)
		return shim.Error("Report already exist for : " + reportKey)
	}
	//saving the Report
	reportAsBytes, _ := json.Marshal(report)
	err = stub.PutState(reportKey, reportAsBytes)
	if err != nil {
		logger.Error("Error committing data for key: " + reportKey)
		return shim.Error("Error committing data for key: " + reportKey)
	}

	//Creating DataCallLog when the Report is created for IssuedDataCall
	// dataCallCreateReportLog := DataCallLog{report.DataCallID, report.DataCallVersion, ActionReportCandidate.ActionID, ActionReportCandidate.ActionDesc, report.UpdatedTs, report.CreatedBy}
	// dataCallCreateReportLogAsBytes, _ := json.Marshal(dataCallCreateReportLog)
	// this.LogDataCallTransaction(stub, string(dataCallCreateReportLogAsBytes))

	return shim.Success(nil)
}

// UpdateReport updates the existing report for a particular DataCall Id and version.
// Success: byte[]
// Error: {"message":"....","errorCode":"Sys_Err/Bus_Err"}
func (this *SmartContract) UpdateReport(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("UpdateReport: enter")
	defer logger.Debug("UpdateReport: exit")
	var report Report
	err := json.Unmarshal([]byte(args), &report)
	if err != nil {
		logger.Error("UpdateReport: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("UpdateReport: Error during json.Unmarshal").Error())
	}
	logger.Debug("Unmarshalled object for UpdateReport", report)
	if report.DataCallID == "" {
		logger.Error("DataCallID is empty!!")
		return shim.Error("DataCallID is empty!!")
	}
	if report.DataCallVersion == "" {
		logger.Error("DataCallVersion is empty!!")
		return shim.Error("DataCallVersion is empty!!")
	}
	if report.Hash == "" {
		logger.Error("Hash is empty!!")
		return shim.Error("Hash is empty!!")
	}
	if report.ReportVersion == "" {
		logger.Error("ReportVersion is empty!!")
		return shim.Error("ReportVersion is empty!!")
	}

	//create composite key to store Report
	var pk []string = []string{REPORT_PREFIX, report.DataCallID, report.DataCallVersion, report.Hash}
	reportKey, _ := stub.CreateCompositeKey(REPORT_DOCUMENT_TYPE, pk)
	logger.Debug("Composite Key for CreateReport", reportKey)

	//Check leadger if report already exists for this key
	var prevReport Report
	prevReportAsBytes, _ := stub.GetState(reportKey)
	if prevReportAsBytes == nil {
		logger.Error("Report doesn't exist for : ", reportKey)
		return shim.Error("Report doesn't exist for : " + reportKey)
	}

	err = json.Unmarshal(prevReportAsBytes, &prevReport)
	if err != nil {
		return shim.Error("Failed to unmarshal prev report: " + err.Error())
	}
	// incoming report is candidate while current report is locked no update
	// in coming report is candidate while pre report is not locked update
	// incoming report is accepted or published or withheld and previous is locked or unlocked doesn't matter
	if report.Status == STATUS_CANDIDATE && prevReport.IsLocked == true {
		return shim.Success([]byte("This report can not be updated as the report is locked for updated."))
	}
	report.IsLocked = true

	//fetching all the records for particular Id and Version
	var pks []string = []string{REPORT_PREFIX, report.DataCallID, report.DataCallVersion}

	//Step-1: getting the reports to set isLocked to true
	validateReportIterator, _ := stub.GetStateByPartialCompositeKey(REPORT_DOCUMENT_TYPE, pks)

	defer validateReportIterator.Close()

	if report.Status != STATUS_CANDIDATE {
		for validateReportIterator.HasNext() {
			prevReportAsBytes, err := validateReportIterator.Next()
			if err != nil {
				logger.Error("Failed to iterate reports")
				return shim.Error("Failed to iterate reports")
			}
			var prevReport Report
			err = json.Unmarshal([]byte(prevReportAsBytes.GetValue()), &prevReport)
			if err != nil {
				logger.Error("Failed to unmarshal report ")
				return shim.Error("Failed to unmarshal report: " + err.Error())
			}
			if report.Status == prevReport.Status {
				return shim.Success([]byte("This report can not be updated as the report is locked for updated."))
			}
		}
	}

	resultsIterator, errmsg := stub.GetStateByPartialCompositeKey(REPORT_DOCUMENT_TYPE, pks)
	if errmsg != nil {
		logger.Error("UpdateReport: Failed to get state for previous reports")
		return shim.Error("UpdateReport: Failed to get state for reports")
	}
	defer resultsIterator.Close()
	logger.Debug("UpdateReport: ", resultsIterator)
	for resultsIterator.HasNext() {
		prevReportAsBytes, err := resultsIterator.Next()
		if err != nil {
			logger.Error("Failed to iterate reports")
			return shim.Error("Failed to iterate reports")
		}

		var prevReport Report
		err = json.Unmarshal([]byte(prevReportAsBytes.GetValue()), &prevReport)
		if err != nil {
			logger.Error("Failed to unmarshal report ")
			return shim.Error("Failed to unmarshal report: " + err.Error())
		}

		//if prevReport hash matches current hash then save the current report
		if prevReport.Hash == report.Hash {
			saveReportAsBytes, _ := json.Marshal(report)
			fmt.Println("this is input report ", report)
			err = stub.PutState(reportKey, saveReportAsBytes)
			if err != nil {
				logger.Error("Error committing data for key: " + reportKey)
				return shim.Error("Error committing data for key: " + reportKey)
			}
		} else {
			//else save the prevReport, updating isLocked to true
			prevReport.IsLocked = true
			//save the prevReport with isLocked to true
			var pkForPrevReport []string = []string{REPORT_PREFIX, prevReport.DataCallID, prevReport.DataCallVersion, prevReport.Hash}
			prevReportKey, _ := stub.CreateCompositeKey(REPORT_DOCUMENT_TYPE, pkForPrevReport)
			savePrevReportAsBytes, _ := json.Marshal(prevReport)
			err = stub.PutState(prevReportKey, savePrevReportAsBytes)
			if err != nil {
				logger.Error("Error committing data for key: " + prevReportKey)
				return shim.Error("Error committing data for key: " + prevReportKey)
			}
		}
	}

	//Creating DataCallLog when the Report is Updated
	var dataCallUpdateReportLog DataCallLog
	if report.Status == STATUS_ACCEPTED {
		dataCallUpdateReportLog = DataCallLog{report.DataCallID, report.DataCallVersion, ActionReportAccepted.ActionID, ActionReportAccepted.ActionDesc, report.UpdatedTs, report.CreatedBy}
	} else if report.Status == STATUS_PUBLISHED {
		dataCallUpdateReportLog = DataCallLog{report.DataCallID, report.DataCallVersion, ActionReportPublished.ActionID, ActionReportPublished.ActionDesc, report.UpdatedTs, report.CreatedBy}
	} else if report.Status == STATUS_WITHHELD {
		dataCallUpdateReportLog = DataCallLog{report.DataCallID, report.DataCallVersion, ActionReportWithheld.ActionID, ActionReportWithheld.ActionDesc, report.UpdatedTs, report.CreatedBy}
	}

	dataCallUpdateReportLogAsBytes, _ := json.Marshal(dataCallUpdateReportLog)
	this.LogDataCallTransaction(stub, string(dataCallUpdateReportLogAsBytes))

	return shim.Success(nil)
}

// ListReportsByCriteria retrives all reports that match given criteria.
// params {json}: {
//  "dataCallId": "mandatory",
//  "dataCallVersion": "mandatory"
//  "startIndex":"optional",
//  "pageSize":"optional",
//  "status" :""}
// Success {byte[]}: byte[]
// Error   {json}:{"message":"....","errorCode":"Sys_Err/Bus_Err"}

func (this *SmartContract) ListReportsByCriteria(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("ListReportsByCriteria: enter")
	defer logger.Debug("ListReportsByCriteria: exit")
	var listReportsCriteria ListReportsCriteria
	err := json.Unmarshal([]byte(args), &listReportsCriteria)
	if err != nil {
		logger.Error("ListReportsByCriteria: Error during json.Unmarshal", err)
		return shim.Error(errors.New("ListReportsByCriteria: Error during json.Unmarshal").Error())
	}
	logger.Debug("Unmarshalled object ", listReportsCriteria)

	if listReportsCriteria.DataCallID == "" {
		logger.Error("DataCallID is empty!!")
		return shim.Error("DataCallID is empty!!")
	}
	if listReportsCriteria.DataCallVersion == "" {
		logger.Error("DataCallVersion is empty!!")
		return shim.Error("DataCallVersion is empty!!")
	}
	//fetching all the different hash for a particular ID and Version
	var reports []Report
	var queryStr string
	queryStr = fmt.Sprintf("{\"selector\":{\"dataCallID\":\"%s\",\"dataCallVersion\":\"%s\"},\"use_index\": [\"_design/updatedTs\"],\"sort\":[{\"updatedTs\":\"desc\"}]}", listReportsCriteria.DataCallID, listReportsCriteria.DataCallVersion)

	resultsIterator, err := stub.GetQueryResult(queryStr)
	if err != nil {
		return shim.Error("ListReportsByCriteria: failed to get list of Reports: " + err.Error())
	}

	defer resultsIterator.Close()
	if !resultsIterator.HasNext() {
		reportAsByte, _ := json.Marshal(reports)
		logger.Debug("ListReportsByCriteria: reportAsByte", reportAsByte)
		return shim.Success(reportAsByte)
	}
	for resultsIterator.HasNext() {
		reportAsBytes, err := resultsIterator.Next()
		if err != nil {
			return shim.Error("ListReportsByCriteria: Failed to iterate for Reports ")
		}

		var report Report
		err = json.Unmarshal([]byte(reportAsBytes.GetValue()), &report)
		if err != nil {
			return shim.Error("ListReportsByCriteria: Failed to unmarshal Report: " + err.Error())
		}

		reports = append(reports, report)
	}

	//paginate the reports
	var paginatedReports []Report
	paginatedReports = paginateReport(reports, listReportsCriteria.StartIndex, listReportsCriteria.PageSize)
	reportsAsByte, _ := json.Marshal(paginatedReports)
	return shim.Success(reportsAsByte)
}

//helper function for pagination
func paginateReport(report []Report, startIndex int, pageSize int) []Report {
	if startIndex == 0 {
		startIndex = PAGINATION_DEFAULT_START_INDEX
	}
	// no pageSize specified then return all results
	if pageSize == 0 {
		pageSize = len(report)
		return report
	}
	limit := func() int {
		if startIndex+pageSize > len(report) {
			return len(report)
		} else {
			return startIndex + pageSize
		}
	}

	start := func() int {
		if startIndex > len(report) {
			return len(report) - 1
		} else {
			return startIndex - 1
		}
	}
	return report[start():limit()]
}

//returns the last updated report
func (this *SmartContract) GetHighestOrderReportByDataCall(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("ListReportsByCriteria: enter")
	defer logger.Debug("ListReportsByCriteria: exit")
	var getHighestOrderReport GetHighestOrderReport
	//var reports []Report
	err := json.Unmarshal([]byte(args), &getHighestOrderReport)
	if err != nil {
		logger.Error("GetHighestOrderReportByDataCall: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("GetHighestOrderReportByDataCall: Error during json.Unmarshal").Error())
	}
	logger.Debug("Unmarshalled object ", getHighestOrderReport)
	if getHighestOrderReport.DataCallID == "" {
		return shim.Error("GetHighestOrderReportByDataCall: ID is Empty")
	}

	//fetch all the repports based on Id and Version sorted by updatedTs
	var queryStr string
	queryStr = fmt.Sprintf("{\"selector\":{\"dataCallID\":\"%s\",\"dataCallVersion\":\"%s\"},\"use_index\": [\"_design/updatedTs\"],\"sort\":[{\"updatedTs\":\"desc\"}]}", getHighestOrderReport.DataCallID, getHighestOrderReport.DataCallVesrion)
	resultsIterator, err := stub.GetQueryResult(queryStr)

	if err != nil {
		logger.Error("GetDataCallVersionsById: Failed to get Data Calls")
		return shim.Error(errors.New("GetDataCallVersionsById: Failed to get Data Calls").Error())

	}
	defer resultsIterator.Close()
	logger.Debug("GetHighestOrderReportByDataCall: Iterating over Reports versions")

	if !resultsIterator.HasNext() {
		fmt.Println("This is hasNext()", resultsIterator.HasNext())
		logger.Debug("GetHighestOrderReportByDataCall: No Reports found for data call returning empty array")
		//reportAsByte, _ := json.Marshal(reports)
		return shim.Error(errors.New("No Reports Found").Error())
	}
	//for resultsIterator.HasNext() {
	dataCallAsBytes, err := resultsIterator.Next()
	fmt.Println("Next inside n error", dataCallAsBytes, err)
	if err != nil {
		logger.Error("Failed to iterate data call")
		return shim.Error("Failed to iterate data call")
	}
	var tempReport Report

	//tempReport has report sorted based on updatedTs
	err = json.Unmarshal([]byte(dataCallAsBytes.GetValue()), &tempReport)

	logger.Debug("GetHighestOrderReportByDataCall: DataCall > ", getHighestOrderReport.DataCallID)
	if err != nil {
		return shim.Error("GetHighestOrderReportByDataCall: Failed to unmarshal Reports: " + err.Error())
	}
	//reports = append(reports, tempReport)

	//}
	//return only one record(latest, as it is sorted already based on updatedTs)
	reportAsByte, _ := json.Marshal(tempReport)
	return shim.Success(reportAsByte)

}

// function-name: GetReportById (invoke)
// params {json}: {
// "id":"mandatory",
// "version": "mandatory"}
// Success {byte[]}: byte[]  - Report
// Error   {json}:{"message":"....","errorCode":"Sys_Err/Bus_Err"}
// Description : returns a report of specifc version,id and hash.

func (this *SmartContract) GetReportById(stub shim.ChaincodeStubInterface, args string) pb.Response {
	logger.Debug("GetReportById: enter")
	defer logger.Debug("GetReportById: exit")

	var getReport GetReportById
	err := json.Unmarshal([]byte(args), &getReport)
	if err != nil {
		logger.Error("GetReportById: Error during json.Unmarshal: ", err)
		return shim.Error(errors.New("GetReportById: Error during json.Unmarshal").Error())
	}
	logger.Debug("Unmarshalled object ", getReport)

	if getReport.DataCallID == "" || getReport.DataCallVersion == "" || getReport.Hash == "" {
		return shim.Error("DataCall ID, DataCall Version and hash can not be Empty")
	}

	var pks []string = []string{REPORT_PREFIX, getReport.DataCallID, getReport.DataCallVersion, getReport.Hash}
	reportKey, _ := stub.CreateCompositeKey(REPORT_DOCUMENT_TYPE, pks)
	reportAsBytes, err := stub.GetState(reportKey)
	if err != nil {
		logger.Error("Error retreiving data for key ", reportKey)
		return shim.Error("Error retreiving data for key" + reportKey)
	}
	return shim.Success(reportAsBytes)

}

func GetLatestaReport(stub shim.ChaincodeStubInterface, IDs []string, versions []string) map[string]Report {
	logger.Info("Inside GetLatestaReport and args are ", IDs, versions)
	var latestReport map[string]Report
	latestReport = make(map[string]Report)

	//fetch all the repports based on Id and Version sorted by updatedTs
	var queryStr string

	queryStr = fmt.Sprintf("{\"selector\":{\"_id\":{\"$regex\":\"%s\"},\"dataCallID\":{\"$in\":[%s]},\"dataCallVersion\":{\"$in\":[%s]}},\"use_index\":[\"_design/updatedTs\"],\"sort\":[{\"updatedTs\":\"desc\"}]}", REPORT_PREFIX, strings.Trim(fmt.Sprint(IDs), "[]"), strings.Trim(fmt.Sprint(versions), "[]"))

	deltaResultsIterator, _ := stub.GetQueryResult(queryStr)
	defer deltaResultsIterator.Close()

	if !deltaResultsIterator.HasNext() {
		logger.Info("GetLatestReport: No report found for criteria, returning 0 delta")
		return latestReport
	}
	var prevDataCallId string
	for deltaResultsIterator.HasNext() {
		latestReportAsBytes, _ := deltaResultsIterator.Next()

		var tempReport Report
		_ = json.Unmarshal([]byte(latestReportAsBytes.GetValue()), &tempReport)

		if prevDataCallId != tempReport.DataCallID {
			latestReport[tempReport.DataCallID] = tempReport
			prevDataCallId = tempReport.DataCallID
		}

	}

	return latestReport
}
