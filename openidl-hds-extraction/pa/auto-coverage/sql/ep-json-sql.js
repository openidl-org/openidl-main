ep = require('./pa_coverage_report_org.json');

map = ep['map'].replaceAll('@org','1234')
reduce = ep['reduce'].replaceAll('@org','1234')

console.log(map)

console.log(reduce)

