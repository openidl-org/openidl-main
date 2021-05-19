// SPDX-License-Identifier: Apache-2.0
package main

import (
	"errors"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/lib/cid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
)

//returns true(if orgType has access for that function)
func checkAccessForOrg(stub shim.ChaincodeStubInterface, function string) (bool, error) {

	//getting the certificate attribute
	organisationType, ok, err := cid.GetAttributeValue(stub, ATTRIBUTE_NAME)
	logger.Info(fmt.Sprintf("checkAccessForOrg: Checking access for %v organisation for %v function", organisationType, function))
	if err != nil {
		errStr := fmt.Sprintf("checkAccessForOrg: There was an error trying to retrieve the attribute %v", ATTRIBUTE_NAME)
		logger.Error("checkAccessForOrg: There was an error trying to retrieve the attribute ", err)
		return false, errors.New(errStr)
	}

	if !ok {
		errStr := fmt.Sprintf("checkAccessForOrg: The client identity does not possess the attribute for %v", ATTRIBUTE_NAME)
		logger.Error(errStr)
		return false, errors.New(errStr)
	}
	accessControlMap :=
		map[string][]string{
			"CreateExtractionPattern": {ADVISORY_ORGANISATION_TYPE},
			"UpdateExtractionPattern": {ADVISORY_ORGANISATION_TYPE},
			"CreateDataCall":          {ADVISORY_ORGANISATION_TYPE},
			"SaveNewDraft":            {ADVISORY_ORGANISATION_TYPE},
			"UpdateDataCall":          {ADVISORY_ORGANISATION_TYPE},
			"IssueDataCall":           {ADVISORY_ORGANISATION_TYPE},
			"ToggleLike":              {ADVISORY_ORGANISATION_TYPE, CARRIER_ORGANISATION_TYPE},
			"CreateConsent":           {ADVISORY_ORGANISATION_TYPE, CARRIER_ORGANISATION_TYPE},
			"CreateReport":            {ADVISORY_ORGANISATION_TYPE},
			"UpdateReport":            {ADVISORY_ORGANISATION_TYPE},
		}

	value, ok := accessControlMap[function]
	if ok {
		return contains(value, organisationType), nil

	} else {
		//doent have the function(menas that function doenst require access control check)
		//errStr := fmt.Sprintf("checkAccessForOrg: The organisation %v doesn't have access for function %v", organisationType, function)
		return true, nil
	}

}

// Contains tells whether an array arr contains a value searchElement.
func contains(arr []string, searchElement string) bool {
	for _, val := range arr {
		if searchElement == val {
			return true
		}
	}
	return false
}
