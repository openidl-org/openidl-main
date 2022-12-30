const fs = require('fs');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getFileNames(path){
	filePaths = []
	fs.readdirSync(path).forEach(file => {
		filePath = `./${path}/${file}`
		//console.log(filePath);
		filePaths.push(filePath)
	  });
	  return filePaths
  }


function combineData(folder) {
	console.log(`folder: ${folder}`)
	names = getFileNames(folder)
	console.log('files: '+names)
	data = {};
	for (index in names) {
		//console.log(index)
		data[index] = require(names[index]);
	}
	keys = Object.keys(data);
	console.log(data)
	//console.log(data['1'])
	combinedData = [];
	for (index in data[keys[0]]) {
		//console.log(index)
		let name = data[keys[0]][index].reporting_name;
        // console.log(data[keys[0]][0])
        // t()
		code = data[keys[0]][index].reporting_code;
		ep = 0;
		il = 0;
		ic = 0;
		cy = 0;

		for (key of keys) {
			//console.log('   '+key)
			dict = data[key][index];
			ep += parseFloat(dict.earned_premium);
			il += parseFloat(dict.incurred_loss);
			ic += parseFloat(dict.incurred_count);
			cy += parseFloat(dict.car_years);
		}
		
		frame = {
			ReportingCode: code,
			ReportingName: name,
			EarnedPremium: numberWithCommas(ep),
			CarYears: numberWithCommas(cy),
			IncurredLoss: numberWithCommas(il),
			IncurredCount: numberWithCommas(ic)
		};
		combinedData.push(frame);
	}
	return combinedData;
}

module.exports = combineData;
