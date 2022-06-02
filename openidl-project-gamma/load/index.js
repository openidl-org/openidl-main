const config = {};


const fs = require('fs');
const { MongoErrorLabel } = require('mongodb');
const mongoose = require('mongoose');

mongoose.pluralize(null);

//is loss record schema the same as premium
const LOSS_RECORDS = {
        lineOfInsurance: String,
        accountingDate: String,
        companyCode: String,
        stateCode: String,
        territory: String,
        optionalZipCodeIndicator: String,
        transactionCode: String,
        premiumAmount: Number,
        lossAmount: Number,
        program: String,
        coverage: String,
        subline: String,
        operatorsAge: String,
        sexAndMaritalStatus: String,
        vehicleUse: String,
        vehiclePerformance: String,
        privatePassengerDriversTrainingGoodStudent: String,
        privatePassengerPenaltyPoints: String,
        liabilityLimitsAmount: String,
        deductibleAmount: String,
        vehicleClass: String,
        bodyStyle: String,
        bodySize: String,
        modelYear: String,
        uninsuredUnderinsuredMotorist: String,
        exposure: String,
        claimCount: String,
        monthsCovered: String,
        causeOfLoss: String,
        terrorismIndicator: String,
        singleMultiCar: String,
        accidentDate: String,
        packageCode: String,
        poolAffiliation: String,
        policyIdentification: String,
        occurrenceIdentification: String,
        claimIdentifier: String,
        ncProgramEnhancementIndicator: String,
        zipCode: String,
        zipCodeSuffix: String,
        umUimStackingIndicator: String,
        symbolCode: String,
        passiveRestraintDiscountCode: String,
        antiLockBrakesDiscountCode: String,
        antiTheftDeviceDiscountCode: String,
        defensiveDriverDiscountCode: String,
        pipLimitsDeductibleCode: String,
        newJerseyPIPLimitsDeductibleCode: String,
        newJerseyDeductible: String,
        rateClassCode: String,
        penaltyPointsPercentOfSurcharge: String,
        classificationCodesAssignedRisks: String,
        experienceRatingModificationFactor: String,
        limitedCodingLossTransaction: String,
        stateExceptionA: String,
        tortLimitation: String,
        intrastateInterstateCode: String,
        thresholdTortLimitation: String,
        accidentPreventionCredit: String,
        scReinsuranceFacility: String,
        stateExceptionB: String,
        multiCarRisks: String,
        primaryNoFaultHealthPlan: String,
        '55AndOverDiscount': String,
        stateExceptionC: String,
        engineSize: String,
        combinedFirstPartyBenefitsIndivisiblePremiumPolicies: String,
        newYorkTaxicabsUPublicLivery: String,
        companyUse: String,
        vehicleIdentificationVIN: String
}

let openIDLSchema = {};
let openModel = {};

function readFileRecords(){
    const records = JSON.parse(fs.readFileSync("../data/processed/idmJsonLossRecords.json").toString());
    const records2 = JSON.parse(fs.readFileSync("../data/processed/idmJsonPremiumRecords.json").toString());
    return [].concat(records).concat(records2);
    //return records;
}

async function insertRecord(recordObject){
    return await openModel.create(recordObject)
}

async function main() {
	await mongoose.connect('mongodb://localhost:27017/openIDL');

	openIDLSchema = new mongoose.Schema(LOSS_RECORDS);  //should we update this to record schema
    openModel = mongoose.model('insurance', openIDLSchema);
   
    //add here.
    const records = readFileRecords();
    const recordsLength = records.length;
    for(let i=0; i < recordsLength; i++){
        await insertRecord(records[i]);
    }
    console.log("Records inserted: "+recordsLength);
    //const recordStored = await insertRecord(records[0]);
    //console.log({recordStored});
    //openIDL
}

main()
	.then(function () {
		console.log('Worked!!');

        mongoose.connection.close()
	})
	.catch(function (e) {
		console.log('Error:');
		console.log({ e });

        mongoose.connection.close()
	});
