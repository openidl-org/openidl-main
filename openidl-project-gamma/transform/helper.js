


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
			CoverageCode: coverageCode,
			CoverageCategory: coverageCategory,
			Coverage: coverage,
			CoverageRecords: [record]
			
		}
	};
	// console.table(idmRecord['Coverage'])
	// console.table(coverages);
	return coverages;
}

// function addMonths(date, months) {
//     var d = date.getDate();
//     date.setMonth(date.getMonth() + +months);
//     if (date.getDate() != d) {
//       date.setDate(0);
//     }
//     return date;
// }

function addMonths(date, months) {
    //var d = date.getDate();
    date.setMonth(date.getMonth() +months);
	date.setDate(date.getDay() -2 )
    return date;
}

function makeDate(datestr){
	let date_array = datestr.split("-")
	let year = parseInt(date_array[0])
	let month = parseInt(date_array[1])-1 //make date is zero indexed
	let day = parseInt(date_array[2])
	let date = new Date (year, month, day)
	return date
}

function add_term(datestr, term){
	let date = makeDate(datestr)
	let rv_date = addMonths(date, term)
	let rv_year = rv_date.getFullYear()
	let rv_month = rv_date.getMonth() +2
	let rv_day = rv_date.getDay()
	if (rv_month < 10){
		rv_month= '0'+rv_month.toString()
	}
	if (rv_day < 10){
		rv_day= '0'+rv_day.toString()
	}

	if (rv_month =='00'){
		rv_month = '01'
	}

	if (rv_day =='00'){
		rv_day = '01'
	}

	let rv_string = rv_year+'-'+rv_month+'-'+rv_day
	console.log(datestr+' term: '+term+' new date:'+rv_string)
	return rv_string
	
}




function makeCoverageRecord(idmRecord) {
	let target = {};
	target['AccountingDate'] = idmRecord.Policy.AccountingDate;
	target['AccountingTermExpiration'] = add_term(idmRecord.Policy.AccountingDate, idmRecord.Coverage.MonthsCovered ) 
	target['PremiumAmount'] = idmRecord.Policy.PremiumAmount;
	target['MonthlyPremiumAmount'] =  parseFloat((idmRecord.Policy.PremiumAmount/idmRecord.Coverage.MonthsCovered).toFixed(3));
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
    if (idmPolicy.Policy.Error){
		target['Error'] = idmPolicy.Policy.Error
	}
	
	(target['SublineCategory'] = idmPolicy.Policy.SublineCategory),
		(target['Vehicle'] = makeVehicle(idmPolicy));
	target['Coverages'] = makeCoverageIDM(idmPolicy);

	return target;
}

module.exports = {makeAutoPolicy,makeVehicle, makeCoverageIDM, makeCoverageRecord, makeDate}