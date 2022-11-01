package main

import (
	"strings"
	"time"
)

type timestamp struct {
	time.Time
}

func (sd *timestamp) UnmarshalJSON(input []byte) error {
	strInput := string(input)
	strInput = strings.Trim(strInput, `"`)
	//newTime, err := time.Parse("2006/01/02 15:04:05", strInput)
	newTime, err := time.Parse(time.RFC3339, strInput)
	if err != nil {
		return err
	}

	sd.Time = newTime
	return nil
}

//type timestamp time.Time

// Prefixes
const (
	EXTRACTION_PATTERN_PREFIX                          = "Extraction_Pattern_"
	AUDIT_INSURANCE_TRANSACTIONAL_RECORD_PREFIX        = "transactional-data-ingested-"
	AUDIT_INSURANCE_TRANSACTIONAL_RECORD_PURGED_PREFIX = "transactional-data-purged-"
	INSURANCE_TRANSACTIONAL_RECORD_PREFIX              = "transactional-data-"
	INSURANCE_HASH_PREFIX                              = "hash-evidence-"
	DATA_CALL_PREFIX                                   = "DataCall_Key_"
	DATA_CALLCOUNT_PREFIX                              = "DataCallCount_Key_"
	CARRIER_PREFIX                                     = "Carrier_Key_"
	CONSENT_PREFIX                                     = "Consent_Key_"
	CONSENT_DOCUMENT_TYPE                              = "Consent_Document_"
	REPORT_PREFIX                                      = "Report_Key_"
	DOCUMENT_TYPE                                      = "DataCall_Document"
	DOCUMENTCOUNT_TYPE                                 = "DataCall_DocumentCount"
	REPORT_DOCUMENT_TYPE                               = "Report_Document_"
	LATEST_VERSION                                     = "latest"
	STATUS_DRAFT                                       = "DRAFT"
	STATUS_ISSUED                                      = "ISSUED"
	STATUS_MATURED                                     = "MATURED"
	STATUS_ABANDONED                                   = "ABANDONED"
	STATUS_CANCELLED                                   = "CANCELLED"
	STATUS_CANDIDATE                                   = "CANDIDATE"
	STATUS_ACCEPTED                                    = "ACCEPTED"
	STATUS_PUBLISHED                                   = "PUBLISHED"
	STATUS_WITHHELD                                    = "WITHHELD"
	LIKE_PREFIX                                        = "Like_Key_"
	LIKE_DOCUMENT_TYPE                                 = "Like_Document_"
	PAGINATION_DEFAULT_START_INDEX                     = 0
	DATACALL_LOG_PREFIX                                = "DataCallLog_Key_"
	DATACALL_LOG_DOCUMENT                              = "DataCallLog_Document_"
	ATTRIBUTE_NAME                                     = "orgType"
	CARRIER_ORGANISATION_TYPE                          = "carrier"
	ADVISORY_ORGANISATION_TYPE                         = "advisory"
)

// Channels
const (
	DEFAULT_CHANNEL        = "defaultchannel"
	DEFAULT_CHAINCODE_NAME = "openidl-cc-default"
	// DEFAULT_CHAINCODE_NAME = "openidl-chaincode/defaultchannel"
	LOGGING_LEVEL = "LOGGING_LEVEL"
)

//channel and chaincode map for cross-channel query
var ccName = map[string]string{
	"aais-faircover": "openidl-cc-aais-faircover",
	"aais-carrier1":  "openidl-cc-aais-carrier1",
}

// Event Names
const (
	TOGGLE_LIKE_EVENT                        = "ToggleLikeEvent"
	CREATE_CONSENT_EVENT                     = "ConsentedEvent"
	SET_EXTRACTION_PATTERN_EVENT             = "ExtractionPatternSpecified"
	INSURANCE_RECORD_AND_AUDIT_CREATED_EVENT = "TransactionalDataAvailable"
)

type DataCallList struct {
	DataCalls        []DataCallExtended `json:"dataCallsList"`
	TotalNoOfRecords int                `json:"totalNoOfRecords"`
}

//struct to store audit record
type InsuranceRecordAudit struct {
	DataCallId      string `json:"dataCallId"`
	DataCallVersion string `json:"dataCallVersion"`
	CarrierId       string `json:"carrierId"`
}

//todo--add validation logic to match ext_pattern for value field  ValueValue---Records
//struct to strore Insurance Data value
type InsuranceData struct {
	PageNumber      int           `json:"pageNumber"`
	CarrierId       string        `json:"carrierId"`
	DataCallId      string        `json:"dataCallId"`
	DataCallVersion string        `json:"dataCallVersion"`
	Records         []interface{} `json:"records"`
	CreatedTs       timestamp     `json:"createdTs"`
} //map[string]interface{}

// struct to store Insurance data hash
type InsuranceDataHash struct {
	BatchId   string    `json:"batchId"`
	CarrierId string    `json:"carrierId"`
	ChunkId   string    `json:"chunkId"`
	Hash      string    `json:"hash"`
	CreatedTs timestamp `json:"createdTs"`
}

type InsuranceDataResponse struct {
	Records     []InsuranceData `jaon:"records"`
	NoOfRecords int             `json:"noOfRecords"`
}

type GetInsuranceData struct {
	ChannelName     string `json:"channelName"`
	DataCallId      string `json:"dataCallId"`
	DataCallVersion string `json:"dataCallVersion"`
	CarrierId       string `json:"carrierId"`
	StartIndex      int    `json:"startIndex"`
	PageSize        int    `json:"pageSize"`
	PageNumber      int    `json:"pageNumber"`
}

// struct to return as payload, when InsuranceRecord and Audit has been created
type InsuranceRecordEventPayload struct {
	ChannelName     string `json:"channelName"`
	DataCallId      string `json:"dataCallId"`
	DataCallVersion string `json:"dataCallVersion"`
	CarrierId       string `json:"carrierId"`
	PageNumber      int    `json:"pageNumber"`
}

//struct to return as ExtractionPattern event payload
type ExtractionPatternPayload struct {
	DataCallId          string `json:"dataCallId"`
	DataCallVsersion    string `json:"dataCallVersion"`
	ExtractionPatternID string `json:"extractionPatternID"`
	//ExtractionPattern ExtractionPattern `json:"extractionPattern"`
	ExtPatternTs timestamp `json:"extPatternTs"`
}

type ExtractionPatternIsSetPayload struct {
	IsSet             bool              `json:"isSet"`
	ExtractionPattern ExtractionPattern `json:"extractionPattern"`
}

type CouchDBView struct {
	Definition string `json:"definition"`
	Group      bool   `json:"group"`
}

type View struct {
	Map    string `json:"map"`
	Reduce string `json:"reduce"`
}

//struct to record ExtractionPattern
type ExtractionPattern struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CouchDBView `json:"couchDBView"`
}
type ExtPattern struct {
	ExtractionPatternID   string `json:"extractionPatternID"`
	ExtractionPatternName string `json:"extractionPatternName"`
	Description           string `json:"description"`
	//ViewDefinition        View      `json:"viewDefinition"`
	ViewDefinition struct {
		Map    string `json:"map"`
		Reduce string `json:"reduce"`
	} `json:"viewDefinition"`
	PremiumFromDate  string    `json:"premiumFromdate"`
	LossFromDate     string    `json:"lossFromdate"`
	Jurisdiction     string    `json:"jurisdication"`
	Insurance        string    `json:"insurance"`
	DbType           string    `json:"dbType"`
	Version          string    `json:"version"`
	IsActive         bool      `json:"isActive"`
	EffectiveStartTs timestamp `json:"effectiveStartTs,omitempty"`
	EffectiveEndTs   timestamp `json:"effectiveEndTs,omitempty"`
	UpdatedTs        timestamp `json:"updatedTs,omitempty"`
	UpdatedBy        string    `json:"updatedBy"`
}

/*type ExtractionPattern struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Documents   struct {
		Agreement []string `json:"agreement"`
		Claim     []string `json:"claim"`
	} `json:"documents"`
}*/

// An extened version of dataCall which contains count of likes and consents as no need to
// store count of likes and consents with actual data call model
type DataCallExtended struct {
	DataCall     DataCall `json:"dataCalls"`
	Reports      []Report `json:"reportsList"`
	NoOfConsents int      `json:"NoOfConsents"`
	NoOfLikes    int      `json:"NoOfLikes"`
}

// Carrier object
type Carrier struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// DataCall object
type DataCall struct {
	ID                     string    `json:"id"`
	Version                string    `json:"version"`
	Name                   string    `json:"name"`
	IntentToPublish        bool      `json:"intentToPublish"`
	IsLocked               bool      `json:"isLocked"`
	IsLatest               bool      `json:"isLatest"`
	IsShowParticipants     bool      `json:"isShowParticipants"`
	Description            string    `json:"description"`
	Purpose                string    `json:"purpose"`
	LineOfBusiness         string    `json:"lineOfBusiness"`
	TransactionMonth       string    `json:"transactionMonth"`
	Deadline               timestamp `json:"deadline,omitempty"`
	PremiumFromDate        timestamp `json:"premiumFromDate,omitempty"`
	PremiumToDate          timestamp `json:"premiumToDate,omitempty"`
	LossFromDate           timestamp `json:"lossFromDate,omitempty"`
	LossToDate             timestamp `json:"lossToDate,omitempty"`
	Jurisdiction           string    `json:"jurisdiction"`
	ProposedDeliveryDate   timestamp `json:"proposedDeliveryDate,omitempty"`
	UpdatedBy              string    `json:"updatedBy"`
	UpdatedTs              timestamp `json:"updatedTs,omitempty"`
	DetailedCriteria       string    `json:"detailedCriteria"`
	EligibilityRequirement string    `json:"eligibilityRequirement"`
	Status                 string    `json:"status"`
	Type                   string    `json:"type"`
	Comments               string    `json:"comments"`
	ForumURL               string    `json:"forumURL"`
	LikeCount              int       `json:"likeCount"`
	ConsentCount           int       `json:"consentCount"`
	ExtractionPatternName  string    `json:"extractionPatternName"`
	ExtractionPatternID    string    `json:"extractionPatternID"`
	ExtractionPatternTs    timestamp `json:"extractionPatternTs"`
}

// DataCallCount object
type DataCallCount struct {
	ID        string `json:"id"`
	Version   string `json:"version"`
	ISSUED    int    `json:"issued"`
	DRAFT     int    `json:"draft"`
	CANCELLED int    `json:"cancelled"`
}

// SearchCriteria Struct for ListDataCallsByCriteria
type SearchCriteria struct {
	StartIndex int    `json:"startIndex"`
	PageSize   int    `json:"pageSize"`
	Version    string `json:"version"`
	Status     string `json:"status"`
	SearchKey  string `json:"searchKey"`
}

// DeadlineWindow Struct for ListMatureDataCall
type DeadlineWindow struct {
	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime"`
}

// SearchCriteria Struct for GetDataCallVersionsById
type GetDataCallVersions struct {
	ID         string `json:"id"`
	StartIndex int    `json:"startIndex"`
	PageSize   int    `json:"pageSize"`
	Status     string `json:"status"`
}

// SearchCriteria Struct for GetDataCallByIdAndVersion
type GetDataCall struct {
	ID      string `json:"id"`
	Version string `json:"version"`
}

// SearchCriteria Struct for GetDataCallByIdAndVersion
type GetDataCallCount struct {
	ID      string `json:"id"`
	Version string `json:"version"`
}

type ToggleDataCallCount struct {
	OriginalStatus string `json:"originalStatus"`
	NewStatus      string `json:"newStatus"`
}

//Struct for GetReportById
type GetReportById struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
	Hash            string `json:"hash"`
}

//Struct for GetHighestOrderReportByDataCall
type GetHighestOrderReport struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVesrion string `json:"dataCallVersion"`
}

// struct to get extraction pattern by id
type GetExtractionPatternById struct {
	ExtractionPatternID string `json:"extractionPatternID"`
	DbType              string `json:"dbType"`
}
type GetDataCallAndExtractionPattern struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
	DbType          string `json:"dbType"`
}
type DataCallAndExtractionPatternResponse struct {
	Jurisdiction      string     `json:"jurisdiction"`
	IsSet             bool       `json:"isSet"`
	ExtractionPattern ExtPattern `json:"extractionPattern"`
}
type ExtractionPatternId struct {
	Id []string `json:"id"`
}

type Like struct {
	DatacallID       string    `json:"datacallID"`
	DataCallVersion  string    `json:"dataCallVersion"`
	OrganizationType string    `json:"organizationType"`
	OrganizationID   string    `json:"organizationID"`
	UpdatedTs        timestamp `json:"updatedTs"`
	UpdatedBy        string    `json:"updatedBy"`
	Liked            bool      `json:"liked"`
}

type LikeCountEntry struct {
	DatacallID      string    `json:"datacallID"`
	DataCallVersion string    `json:"dataCallVersion"`
	UpdatedTs       timestamp `json:"updatedTs"`
	Liked           bool      `json:"liked"`
	Delta           int       `json:"delta"`
}

type UpdateLikeAndConsentCountReq struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
}

// Node fabric-network module not allowing a separate argument in chaincodeInvoice, moving as part of Request of Like and Consent
/*type ListLikeRequest struct {
	Like       Like     `json:"like"`
	ChannelIDs []string `json:"channelIDs"`
}*/

type ListLikeRequest struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
	ChannelList     []struct {
		ChannelName   string `json:"channelName"`
		ChaincodeName string `json:"chaincodeName"`
	} `json:"channelList"`
}
type ListLikeResponse struct {
	Like             Like   `json:"like"`
	OrganizationName string `json:"organizationName"`
}

type Consent struct {
	DatacallID      string `json:"datacallID"`
	DataCallVersion string `json:"dataCallVersion"`
	CarrierID       string `json:"carrierID"`
	//CarrierName     string `json:"carrierName"`
	CreatedTs timestamp `json:"createdTs"`
	CreatedBy string    `json:"createdBy"`
	Status    string    `json:"status"`
}

type UpdateConsentStatus struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
	CarrierID       string `json:"carrierID"`
	Status          string `json:"status"`
}

type ConsentCountEntry struct {
	DatacallID      string    `json:"datacallID"`
	DataCallVersion string    `json:"dataCallVersion"`
	UpdatedTs       timestamp `json:"updatedTs"`
	Delta           int       `json:"delta"`
}

type GetConsentsByDataCallRequest struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
}
type GetLikesByDataCallRequest struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
}
type ListConsentRequest struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
	ChannelList     []struct {
		ChannelName   string `json:"channelName"`
		ChaincodeName string `json:"chaincodeName"`
	} `json:"channelList"`
}

type GetConsentByDataCallAndOrganizationRequest struct {
	Consent    Consent  `json:"consent"`
	ChannelIDs []string `json:"channelIDs"`
}

type GetLikeByDataCallAndOrganizationRequest struct {
	Like       Like     `json:"like"`
	ChannelIDs []string `json:"channelIDs"`
}

type ListConsentResponse struct {
	Consent     Consent `json:"consent"`
	CarrierName string  `json:"carrierName"`
}

type Report struct {
	DataCallID      string    `json:"dataCallID"`
	DataCallVersion string    `json:"dataCallVersion"`
	ReportVersion   string    `json:"reportVersion"`
	Hash            string    `json:"hash"`
	Status          string    `json:"status"`
	IsLocked        bool      `json:"isLocked"`
	Url             string    `json:"url"`
	CreatedBy       string    `json:"createdBy"`
	CreatedTs       timestamp `json:"createdTs,omitempty"`
	UpdatedTs       timestamp `json:"updatedTs,omitempty"`
}

type ListReportsCriteria struct {
	DataCallID      string `json:"dataCallID"`
	DataCallVersion string `json:"dataCallVersion"`
	Status          string `json:"status"`
	StartIndex      int    `json:"startIndex"`
	PageSize        int    `json:"pageSize"`
}

// Node fabric-network module not allowing a separate argument in chaincodeInvoice, moving as part of Request of Like and Consent
// TODO: Comeback to it.
type Channels struct {
	ChannelIDs []string `json:"channelIDs"`
}

type DataCallAction struct {
	ActionID   string
	ActionDesc string
}

var (
	ActionIssued             = DataCallAction{"DATA_CALL_ISSUED", "Data Call Issued."}
	ActionDeliveryDateUpdate = DataCallAction{"DATA_CALL_DELIVERY_DATE_UPDATED", "Report Delivery Date Updated."}
	ActionReportCandidate    = DataCallAction{"DATA_CALL_CANDIDATE_REPORT_DELIVERED", "Candidate Report Delivered."}
	ActionReportAccepted     = DataCallAction{"DATA_CALL_ACCEPTED", "Report Accepted."}
	ActionReportPublished    = DataCallAction{"DATA_CALL_PUBLISHED", "Report Published."}
	ActionReportWithheld     = DataCallAction{"DATA_CALL_WITHHELD", "Report Withheld."}
)

type DataCallLog struct {
	DataCallID      string    `json:"dataCallID"`
	DataCallVersion string    `json:"dataCallVersion"`
	ActionID        string    `json:"actionID"`
	Action          string    `json:"action"`
	ActionTs        timestamp `json:"actionTs,omitempty"`
	UpdatedBy       string    `json:"updatedBy"`
}

/*
const EXT_PATTERN_VIEW_04 string = `{
    "view": {
      "map": "function (doc) {\n   if (doc.records) {\n       var lineofInsurance = ['32']; // HO : 32\n       var annualStatementLineofBusiness = ['040'];\n       var premiumTransactionCode = [\"1\", \"8\"];\n       var lossTransactionCode = [\"2\", \"3\"];\n       var jurisdictions = \"#state#\" ;\n       doc.records.forEach(function (record) {\n           // Apply filters (equivalent to SQL where clause)\n           if (annualStatementLineofBusiness.indexOf(record.annualStatementLineofBusiness) >-1 && lineofInsurance.indexOf(record.lineOfInsurance) >-1  && jurisdictions == record.stateCode) {\n               // Define fields to be included in result (equivalent to SQL select clause)\n               var result = {\n                   \"writtenPremium\": 0,\n                   \"writtenLoss\": 0,\n                   \"claimCount\": 0,\n                   \"exposure\":0\n               }\n               if (premiumTransactionCode.indexOf(record.transactionCode) > -1) {\n                   result.writtenPremium = parseFloat(record.premiumAmount);\n                   result.exposure = parseInt(record.exposure);\n                   result.claimCount = 0;\n               } else if (lossTransactionCode.indexOf(record.transactionCode) > -1) {\n                   result.writtenLoss = parseFloat(record.lossesAmount);\n                   result.claimCount = parseInt(record.claimCount);\n                   result.exposure=0;\n               }\n               //Emit document and keys\n               var carrierId = doc._id.split(\"-\")[0];\n                emit([carrierId, record.causeOfLossDesc, record.liabilityLimitDesc, record.zipCode, record.stateCode, record.transactionCode,record.accidentDate ], result);\n           }\n       });\n   }\n}",
      "reduce": "function (keys, values, rereduce) {\n  // Aggregate function\n  function aggregateFields(values, result) {\n    // Aggregate data for computing exposure and premium values\n    var lossSum = 0;\n    var premiumSum = 0;\n    var claimCount = 0;\n    var exposure = 0;\n    values.forEach(function(element) {\n        lossSum = lossSum + element.writtenLoss;\n        premiumSum = premiumSum + element.writtenPremium;\n        claimCount = claimCount + element.claimCount;\n        \n    });\n   result.writtenLoss = lossSum;\n   result.writtenPremium = premiumSum;\n   result.claimCount = claimCount;\n   \n  }\n  \n  // Reduce logic\n  if (rereduce) {\n    var result = {\n           \"causeOfLossDesc\": values[0].causeOfLossDesc,\n           \"liabilityLimitDesc\": values[0].liabilityLimitDesc,\n           \"zipCode\": values[0].zipCode,\n           \"stateCode\": values[0].stateCode,\n           \"transactionCode\": values[0].transactionCode,\n           \"accidentDate\": values[0].accidentDate\n       };\n    aggregateFields(values, result);\n    return result;\n  } else {\n    // Create result document that contains all expected fields\n   var innerResult = {\n           \"causeOfLossDesc\": keys[0][0][1],\n           \"liabilityLimitDesc\": keys[0][0][2],\n           \"zipCode\": keys[0][0][3],\n           \"stateCode\": keys[0][0][4],\n           \"transactionCode\": keys[0][0][5],\n           \"accidentDate\": keys[0][0][6]\n       };\n    aggregateFields(values, innerResult);\n    return innerResult;\n  }\n}"
    }
}`

/*const EXT_PATTERN_VIEW_04 string = `{
    "view": {
        "map": "function (doc) {\n  if (doc.records) {\n    // Define policy form codes we are interested (part of the filters to be applied)\n        var lineofInsurance = ['32','34'];// HO : 32, MHO : 34\n        var policyFormCodes = ['01','02','03','04','05','06','08','84','86','41', '61'];\n    var annualStatementLineofBusiness = ['040'];\n    var premiumTransactionCode = [\"1\", \"8\"];\n    var lossTransactionCode = [\"2\", \"3\"];\n   var jurisdictions = \"#state#\" ;\n   doc.records.forEach(function(record) {\n      // Apply filters (equivalent to SQL where clause)\n       if (annualStatementLineofBusiness.indexOf(record.annualStatementLineofBusiness) >-1 && lineofInsurance.indexOf(record.lineOfInsurance) >-1 && policyFormCodes.indexOf(record.policyForm) >-1 && jurisdictions == record.stateCode) {\n        // Define fields to be included in result (equivalent to SQL select clause)\n        var result = {\n          \"writtenPremium\": 0,\n          \"writtenLoss\": 0,\n          \"claimCount\": 0\n        }\n      if(premiumTransactionCode.indexOf(record.transactionCode)  >-1  ) {\n          result.writtenPremium = parseFloat(record.premiumAmount);\n          result.claimCount = 0;\n      } else if(lossTransactionCode.indexOf(record.transactionCode)  >-1 ) {\n         result. writtenLoss = parseFloat(record.lossesAmount);\n         result.claimCount = parseInt(record.claimCount);\n      }\n        //Emit document and keys\n        var carrierId = doc._id.split(\"-\")[0];\n        emit([carrierId, record.policyFormDesc, record.companyCode, record.yearofConstruction, record.zipCode, record.stateCode, record.exposure, record.transactionCode, record.monthsCovered], result);\n      }\n    });\n  }\n}\n",
        "reduce": "function (keys, values, rereduce) {\n  // Aggregate function\n  function aggregateFields(values, result) {\n    // Aggregate data for computing exposure and premium values\n    var lossSum = 0;\n    var premiumSum = 0;\n    var claimCount = 0;\n    values.forEach(function(element) {\n        lossSum = lossSum + element.writtenLoss;\n        premiumSum = premiumSum + element.writtenPremium;\n        claimCount = claimCount + element.claimCount;\n    });\n   result.writtenLoss = lossSum;\n   result.writtenPremium = premiumSum;\n   result.claimCount = claimCount;\n  }\n  \n  // Reduce logic\n  if (rereduce) {\n    var result = {\n      \"policyFormDesc\": values[0].policyFormDesc,\n      \"companyCode\": values[0].companyCode,\n      \"yearofConstruction\": values[0].yearofConstruction,\n      \"zipCode\":values[0].zipCode,\n      \"stateCode\": values[0].stateCode,\n      \"exposure\": values[0].exposure,\n      \"transactionCode\": values[0].transactionCode,\n      \"monthsCovered\": values[0].monthsCovered,\n    };\n    aggregateFields(values, result);\n    return result;\n  } else {\n    // Create result document that contains all expected fields\n    var innerResult = {\n       \"policyForm_Desc\": keys[0][0][1],\n      \"companyCode\": keys[0][0][2],\n      \"yearofConstruction\": keys[0][0][3],\n      \"zipCode\": keys[0][0][4],\n      \"stateCode\": keys[0][0][5],\n      \"exposure\": keys[0][0][6],\n      \"transactionCode\": keys[0][0][7],\n      \"monthsCovered\": keys[0][0][8]\n    };\n    aggregateFields(values, innerResult);\n    return innerResult;\n  }\n}"
    }
}`
*/
/*
const EXT_PATTERN_VIEW_03 string = `{
  "view": {
	 "map": "function (doc) {\n if (doc) {\n   // Define policy form codes we are interested (part of the filters to be applied)\n       var lineofInsurance = ['32','34'];// HO : 32, MHO : 34\n       var policyFormCodes = ['01','02','03','04','05','06','08','84','86','41', '61'];\n            var annualStatementLineofBusiness = ['040'];\n            var premiumTransactionCode = [\"1\", \"8\"];\n            var lossTransactionCode = [\"2\", \"3\"];\n     // Apply filters (equivalent to SQL where clause)\n      if (annualStatementLineofBusiness.indexOf(doc.annualStatementLineofBusiness) >-1 && lineofInsurance.indexOf(doc.lineOfInsurance) >-1 && (policyFormCodes.indexOf(doc.policyForm) >-1)) {\n       // Define fields to be included in result (equivalent to SQL select clause)\n       var result = {\n         \"writtenPremium\": 0,\n         \"writtenLoss\": 0,\n         \"claimCount\": 0\n       }\n     if(premiumTransactionCode.indexOf(doc.transactionCode)  >-1  ) {\n         result.writtenPremium = parseFloat(doc.premiumAmount);\n         result.claimCount = 0;\n     } else if(lossTransactionCode.indexOf(doc.transactionCode)  >-1 ) {\n        result. writtenLoss = parseFloat(doc.lossesAmount);\n        result.claimCount = parseInt(doc.claimCount);\n     }\n       //Emit document and keys\n       emit([doc.carrierId, doc.policyFormDesc, doc.companyCode, doc.yearofConstruction, doc.zipCode, doc.stateCode, doc.exposure, doc.transactionCode, doc.monthsCovered], result);\n }\n}\n}",
      "reduce": "function (keys, values, rereduce) {\n // Aggregate function\n function aggregateFields(values, result) {\n   // Aggregate data for computing exposure and premium values\n   var lossSum = 0;\n   var premiumSum = 0;\n   var claimCount = 0;\n   values.forEach(function(element) {\n       lossSum = lossSum + element.writtenLoss;\n       premiumSum = premiumSum + element.writtenPremium;\n       claimCount = claimCount + element.claimCount;\n   });\n  result.writtenLoss = lossSum;\n  result.writtenPremium = premiumSum;\n  result.claimCount = claimCount;\n }\n // Reduce logic\n if (rereduce) {\n   var result = {\n     \"policyFormDesc\": values[0].policyFormDesc,\n     \"companyCode\": values[0].companyCode,\n     \"yearofConstruction\": values[0].yearofConstruction,\n     \"zipCode\":values[0].zipCode,\n     \"stateCode\": values[0].stateCode,\n     \"exposure\": values[0].exposure,\n     \"transactionCode\": values[0].transactionCode,\n     \"monthsCovered\": values[0].monthsCovered,\n   };\n   aggregateFields(values, result);\n   return result;\n } else {\n   // Create result document that contains all expected fields\n   var innerResult = {\n      \"policyForm_Desc\": keys[0][0][1],\n     \"companyCode\": keys[0][0][2],\n     \"yearofConstruction\": keys[0][0][3],\n     \"zipCode\": keys[0][0][4],\n     \"stateCode\": keys[0][0][5],\n     \"exposure\": keys[0][0][6],\n     \"transactionCode\": keys[0][0][7],\n     \"monthsCovered\": keys[0][0][8]\n   };\n   aggregateFields(values, innerResult);\n   return innerResult;\n }\n}"
  }
}`
*/
/*
const EXT_PATTERN_VIEW_02 string = `{
  "view": {
	 "map": "function (doc) {\n  if (doc.records) {\n    // Define policy form codes we are interested (part of the filters to be applied)\n        var lineofInsurance = ['32','34'];// HO : 32, MHO : 34\n        var policyFormCodes = ['01','02','03','04','05','06','08','84','86','41', '61'];\n\t\t    var annualStatementLineofBusiness = ['040'];\n\t\t    var premiumTransactionCode = [\"1\", \"8\"];\n\t\t    var lossTransactionCode = [\"2\", \"3\"];\n     doc.records.forEach(function(record) {\n      // Apply filters (equivalent to SQL where clause)\n       if (annualStatementLineofBusiness.indexOf(record.annualStatementLineofBusiness) >-1 && lineofInsurance.indexOf(record.lineOfInsurance) >-1 && (policyFormCodes.indexOf(record.policyForm) >-1)) {\n        // Define fields to be included in result (equivalent to SQL select clause)\n        var result = {\n          \"writtenPremium\": 0,\n          \"writtenLoss\": 0,\n          \"claimCount\": 0\n        }\n      if(premiumTransactionCode.indexOf(record.transactionCode)  >-1  ) {\n          result.writtenPremium = parseFloat(record.premiumAmount);\n          result.claimCount = 0;\n      } else if(lossTransactionCode.indexOf(record.transactionCode)  >-1 ) {\n         result. writtenLoss = parseFloat(record.lossesAmount);\n         result.claimCount = parseInt(record.claimCount);\n      }\n        //Emit document and keys\n        var carrierId = doc._id.split(\"-\")[0];\n        emit([carrierId, record.policyFormDesc, record.companyCode, record.yearofConstruction, record.zipCode, record.stateCode, record.exposure, record.transactionCode, record.monthsCovered], result);\n      }\n    });\n  }\n}\n",
      "reduce": "function (keys, values, rereduce) {\n  // Aggregate function\n  function aggregateFields(values, result) {\n    // Aggregate data for computing exposure and premium values\n    var lossSum = 0;\n    var premiumSum = 0;\n    var claimCount = 0;\n    values.forEach(function(element) {\n        lossSum = lossSum + element.writtenLoss;\n        premiumSum = premiumSum + element.writtenPremium;\n        claimCount = claimCount + element.claimCount;\n    });\n   result.writtenLoss = lossSum;\n   result.writtenPremium = premiumSum;\n   result.claimCount = claimCount;\n  }\n  \n  // Reduce logic\n  if (rereduce) {\n    var result = {\n      \"policyFormDesc\": values[0].policyFormDesc,\n      \"companyCode\": values[0].companyCode,\n      \"yearofConstruction\": values[0].yearofConstruction,\n      \"zipCode\":values[0].zipCode,\n      \"stateCode\": values[0].stateCode,\n      \"exposure\": values[0].exposure,\n      \"transactionCode\": values[0].transactionCode,\n      \"monthsCovered\": values[0].monthsCovered,\n    };\n    aggregateFields(values, result);\n    return result;\n  } else {\n    // Create result document that contains all expected fields\n    var innerResult = {\n       \"policyForm_Desc\": keys[0][0][1],\n      \"companyCode\": keys[0][0][2],\n      \"yearofConstruction\": keys[0][0][3],\n      \"zipCode\": keys[0][0][4],\n      \"stateCode\": keys[0][0][5],\n      \"exposure\": keys[0][0][6],\n      \"transactionCode\": keys[0][0][7],\n      \"monthsCovered\": keys[0][0][8]\n    };\n    aggregateFields(values, innerResult);\n    return innerResult;\n  }\n}"
  }
}`

/*
const EXT_PATTERN_VIEW_01 string = `{
	"view": {
	  "map": "function (doc) {\n  if (doc.records) {\n    // Define policy form codes we are interested (part of the filters to be applied)\n    var policyFormCodes = ['HO1','HO2','HO3','HO5','HO8'];\n    doc.records.forEach(function(record) {\n      // Apply filters (equivalent to SQL where clause)\n      if (record.type == 'HO' && record.data_year == '2017' && (policyFormCodes.indexOf(record.policy_form) >-1)) {\n        // Define fields to be included in result (equivalent to SQL select clause)\n        var result = {\n          \"exposure\": record.exposure,\n          \"premium\": record.components.premium.written_premium.amount\n        };\n        // Get carrier id from _id\n        var carrierId = doc._id.split(\"-\")[0];\n        // Emit document and keys\n        // carrier_id, state, policy_form, property_aoi\n        emit([carrierId, record.risks.ho.details.state, record.policy_form, record.property_aoi], result);\n      }\n    });\n  }\n}",
	  "reduce": "function (keys, values, rereduce) {\n  \n  // Aggregate function\n  function aggregateFields(values, result) {\n    // Aggregate data for computing exposure and premium values\n    var exposureSum = 0;\n    var premiumSum = 0;\n    values.forEach(function(element) {\n        exposureSum = exposureSum + element.exposure;\n        premiumSum = premiumSum + element.premium;\n    });\n    \n    result.exposure = exposureSum;\n    result.premium = premiumSum;\n  }\n  \n  // Reduce logic\n  if (rereduce) {\n    var result = {\n      \"state\": values[0].state,\n      \"policy_form_code\": values[0].policy_form_code,\n      \"propertyAOI\": values[0].propertyAOI\n    };\n    aggregateFields(values, result);\n    return result;\n  } else {\n    // Create result document that contains all expected fields\n    var innerResult = {\n      \"state\": keys[0][0][1],\n      \"policy_form_code\": keys[0][0][2],\n      \"propertyAOI\": keys[0][0][3]\n    };\n    aggregateFields(values, innerResult);\n    return innerResult;\n  }\n}"
	}
  }`
*/
