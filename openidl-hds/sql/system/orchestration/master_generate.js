const auto = require('./generate_auto_schema')
const homeOwners = require('./generate_ho_schema')



function main(buildObjects) {
	for (object of buildObjects) {
		console.table(object);
		auto(object);
        homeOwners(object)
	}
}

buildObject = [
	{ Name: 'Shepard Mutual', ID: '9999' },
	{ Name: 'Lab Insurance Group', ID: '9998' },
  { Name: 'York Farmers INC', ID: '9997' },
  { Name: 'Idaho Group', ID: '9996' },
  { Name: 'Carolina Insurance Group', ID: '9995' },
  { Name: 'Burke Farmers', ID: '9990'},
  { Name: 'Company X', ID: '1234'}
];



main(buildObject);