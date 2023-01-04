var wkhtmltopdf = require('wkhtmltopdf');
const combineData = require('./combine')
const getLayout = require('./au_coverage.js')
console.log('report')
const fs = require('fs');


function getFileNames(path){
    filePaths = []
    fs.readdirSync(path).forEach(file => {
        filePath = `./${path}/${file}`
        //console.log(filePath);
        filePaths.push(filePath)
      });
      return filePaths
}

names = getFileNames('1a-au')
console.table(names)
data = combineData(names)
console.log(data)
html = getLayout(data)
console.log(html)

//note I needed to brew install + npm install wkhtmltopdf
wkhtmltopdf(html, {
    output: "./openidl-auto-coverage-report.pdf",
    "viewport-size": "1280x1024",
    "page-width": "400",
    "page-height": "600"
});
