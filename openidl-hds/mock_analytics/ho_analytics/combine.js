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
		
		//openIDL
		//data[index] = require(names[index]);
		
		//api
		data[index] = require(names[index])['result'][0]['result']['result']['rows'];
	}
	keys = Object.keys(data);
	console.log(data)
	console.log(data['0'])
	combinedData = [];
	for (index in data[keys[0]]) {
		//console.log(index)
		let name = data[keys[0]][index].reporting_form;
		let category = data[keys[0]][index].reporting_category
        // console.log(data[keys[0]][0])
        
		code = data[keys[0]][index].policy_form;
		ep = 0;
		wp = 0;
		pl = 0;
		il = 0;
		lr = 0;
		elr = 0

		
		

		for (key of keys) {
			//console.log('   '+key)
			dict = data[key][index];
			ep += parseFloat(dict.ep);
			wp += parseFloat(dict.written_premium)
			pl += parseFloat(dict.paid_loss)
			il += parseFloat(dict.incurred_loss);
			
		}
		
		frame = {
			ReportingCode: code,
			PolicyForm: name,
			Category: category,
			EarnedPremium: numberWithCommas(ep),
			WrittenPremium: numberWithCommas(wp),
			PaidLoss: numberWithCommas(pl),
			IncurredLoss: numberWithCommas(il),
			LossRatio: ((pl/wp)*100).toFixed(2).toString()+'%',
			EPLossRatio: ((il/ep)*100).toFixed(2).toString()+'%',
			

			//loss ratio = paidloss/written premium
		//ep loss ratio incurredloss/earned premium
		};
		combinedData.push(frame);
	}
	return combinedData;
}

module.exports = combineData;
