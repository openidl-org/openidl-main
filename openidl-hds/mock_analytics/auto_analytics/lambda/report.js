const HTML5ToPDF = require("html5-to-pdf")
const path = require("path")
const combineData = require('./combine')
const getLayout = require('./au_coverage.js')
console.log('report')






// data = combineData('1a-au')
data = combineData(`../response/auto`)

console.log(data)
html = getLayout(data)
 
const run = async () => {
  const html5ToPDF = new HTML5ToPDF({
    //inputPath: path.join(__dirname, "assets", "au_coverage.html"),
    inputBody: html,
    outputPath: path.join(__dirname, ".", "assets", "output.pdf"),
    //templatePath: path.join(__dirname, "templates", "basic"),
    include: [
      path.join(__dirname, "assets", "basic.css"),
      //path.join(__dirname, "assets", "custom-margin.css"),
    ],
  })
 
  await html5ToPDF.start()
  await html5ToPDF.build()
  await html5ToPDF.close()
}
 
(async () => {
  try {
    await run()
    console.log("DONE")
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  } finally {
    process.exit();
  }
})()
 
 