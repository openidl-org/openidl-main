


function makeVehicle(idmRecord){
	let target = {}
	target['ZipCode'] = idmRecord.Policy.ZipCode
	target['ZipCodeSuffix'] = idmRecord.Policy.ZipCodeSuffix
	target["VehicleUse"] = idmRecord.Policy.VehicleUse
	return target
}


function makeCoverageIDM(idmRecord) {
	let coverageCode = idmRecord.Coverage.CoverageCode;
	//console.log('coverage code: '+coverageCode) // 1
	let coverageCategory = idmRecord.Coverage.CoverageCategory;
	let coverage = idmRecord.Coverage.Coverage;
	let record = makeCoverageRecord(idmRecord);

	let coverages = {
		[coverageCode]: {
			CoverageCategory: coverageCategory,
			Coverage: coverage,
			CoverageRecords: [record]
		}
	};
	// console.table(idmRecord['Coverage'])
	// console.table(coverages);
	return coverages;
}


function makeCoverageRecord(idmRecord) {
	let target = {};
	target['AccountingDate'] = idmRecord.Policy.AccountingDate;
	target['PremiumAmount'] = idmRecord.Policy.PremiumAmount;
	target['LiabilityLimitsName'] = idmRecord.Coverage.LiabilityLimitsName;
	target['LiabilityLimitsAmount'] = idmRecord.Coverage.LiabilityLimitsAmount;
	target['Exposure'] = idmRecord.Coverage.Exposure;
	target['MonthsCovered'] = idmRecord.Coverage.MonthsCovered;
	target['SingleMultiCarRating'] = idmRecord.Coverage.SingleMultiCarRating;
	target['Terrorism'] = idmRecord.Coverage.Terrorism;
	target['Packaging'] = idmRecord.Coverage.Packaging;
	target['PoolAffiliation'] = idmRecord.Coverage.PoolAffiliation;
	target['UMUIMStacking'] = idmRecord.Coverage.UMUIMStacking;
	target['PassiveRestraintDiscount'] =
		idmRecord.Coverage.PassiveRestraintDiscount;
	target['AntiLockBrakesDiscount'] =
		idmRecord.Coverage.AntiLockBrakesDiscount;
	target['DefensiveDriverDiscount'] =
		idmRecord.Coverage.DefensiveDriverDiscount;

	//console.table(target)
	return target;
}

function makeAutoPolicy(idmPolicy) {
	let target = {};
	target['PolicyIdentifier'] = idmPolicy.Policy.PolicyIdentifier;
	target['State'] = idmPolicy.Policy.State;
	target['LineOfBusiness'] = idmPolicy.Policy.LineOfBusiness;
	target['Subline'] = idmPolicy.Policy.Subline;
    target['Error'] = idmPolicy.Policy.Error
	(target['SublineCategory'] = idmPolicy.Policy.SublineCategory),
		(target['Vehicle'] = makeVehicle(idmPolicy));
	target['Coverages'] = makeCoverageIDM(idmPolicy);

	return target;
}

module.exports = {makeAutoPolicy,makeVehicle, makeCoverageIDM, makeCoverageRecord}