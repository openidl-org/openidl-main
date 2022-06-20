


function makeVehicle(idmPolicy){
	let target = {}
	target['ZipCode'] = idmPolicy.Policy.ZipCode
	target['ZipCodeSuffix'] = idmPolicy.Policy.ZipCodeSuffix
	target["VehicleUse"] = idmPolicy.Policy.VehicleUse
	return target
}


function makeCoverageIDM(idmPolicy) {
	let coverageCode = idmPolicy.Coverage.CoverageCode;
	console.log('coverage code: '+coverageCode) // 1
	let coverageCategory = idmPolicy.Coverage.CoverageCategory;
	let coverage = idmPolicy.Coverage.Coverage;
	let record = makeCoverageRecord(idmPolicy);

	let coverages = {
		[coverageCode]: {
			CoverageCategory: coverageCategory,
			Coverage: coverage,
			CoverageRecords: [record]
		}
	};
	console.table(idmPolicy['Coverage'])
	console.table(coverages);
	return coverages;
}


function makeCoverageRecord(idmPolicy) {
	let target = {};
	target['AccountingDate'] = idmPolicy.Policy.AccountingDate;
	target['PremiumAmount'] = idmPolicy.Policy.PremiumAmount;
	target['LiabilityLimitsName'] = idmPolicy.Coverage.LiabilityLimitsName;
	target['LiabilityLimitsAmount'] = idmPolicy.Coverage.LiabilityLimitsAmount;
	target['Exposure'] = idmPolicy.Coverage.Exposure;
	target['MonthsCovered'] = idmPolicy.Coverage.MonthsCovered;
	target['SingleMultiCarRating'] = idmPolicy.Coverage.SingleMultiCarRating;
	target['Terrorism'] = idmPolicy.Coverage.Terrorism;
	target['Packaging'] = idmPolicy.Coverage.Packaging;
	target['PoolAffiliation'] = idmPolicy.Coverage.PoolAffiliation;
	target['UMUIMStacking'] = idmPolicy.Coverage.UMUIMStacking;
	target['PassiveRestraintDiscount'] =
		idmPolicy.Coverage.PassiveRestraintDiscount;
	target['AntiLockBrakesDiscount'] =
		idmPolicy.Coverage.AntiLockBrakesDiscount;
	target['DefensiveDriverDiscount'] =
		idmPolicy.Coverage.DefensiveDriverDiscount;

	//console.table(target)
	return target;
}

module.exports = {makeVehicle, makeCoverageIDM, makeCoverageRecord}