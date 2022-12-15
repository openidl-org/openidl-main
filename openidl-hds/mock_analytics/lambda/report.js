var wkhtmltopdf = require('wkhtmltopdf');
console.log('report')
data = require("./pattern.json")
console.log(data)

html = `
<h1>Auto Coverage Report</h1>
<table>
    <tr>
        <th>Coverage</th>
        <th>Earned Premium</th>
        <th>Car Years</th>
        <th>Incurred Loss</th>
        <th>Incurred Count</th>
    </tr>
    <tr>
        <td>${data[0].reporting_name}</td>
        <td>${data[0].earned_premium}</td>
        <td>${data[0].car_years}</td>
        <td>${data[0].incurred_loss}</td>
        <td>${data[0].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[1].reporting_name}</td>
        <td>${data[1].earned_premium}</td>
        <td>${data[1].car_years}</td>
        <td>${data[1].incurred_loss}</td>
        <td>${data[1].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[2].reporting_name}</td>
        <td>${data[2].earned_premium}</td>
        <td>${data[2].car_years}</td>
        <td>${data[2].incurred_loss}</td>
        <td>${data[2].incurred_count}</td>
    </tr>

    <tr>
        <td>${data[3].reporting_name}</td>
        <td>${data[3].earned_premium}</td>
        <td>${data[3].car_years}</td>
        <td>${data[3].incurred_loss}</td>
        <td>${data[3].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[4].reporting_name}</td>
        <td>${data[4].earned_premium}</td>
        <td>${data[4].car_years}</td>
        <td>${data[4].incurred_loss}</td>
        <td>${data[4].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[5].reporting_name}</td>
        <td>${data[5].earned_premium}</td>
        <td>${data[5].car_years}</td>
        <td>${data[5].incurred_loss}</td>
        <td>${data[5].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[5].reporting_name}</td>
        <td>${data[5].earned_premium}</td>
        <td>${data[5].car_years}</td>
        <td>${data[5].incurred_loss}</td>
        <td>${data[5].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[6].reporting_name}</td>
        <td>${data[6].earned_premium}</td>
        <td>${data[6].car_years}</td>
        <td>${data[6].incurred_loss}</td>
        <td>${data[6].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[7].reporting_name}</td>
        <td>${data[7].earned_premium}</td>
        <td>${data[7].car_years}</td>
        <td>${data[7].incurred_loss}</td>
        <td>${data[7].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[8].reporting_name}</td>
        <td>${data[8].earned_premium}</td>
        <td>${data[8].car_years}</td>
        <td>${data[8].incurred_loss}</td>
        <td>${data[8].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[9].reporting_name}</td>
        <td>${data[9].earned_premium}</td>
        <td>${data[9].car_years}</td>
        <td>${data[9].incurred_loss}</td>
        <td>${data[9].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[10].reporting_name}</td>
        <td>${data[10].earned_premium}</td>
        <td>${data[10].car_years}</td>
        <td>${data[10].incurred_loss}</td>
        <td>${data[10].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[11].reporting_name}</td>
        <td>${data[11].earned_premium}</td>
        <td>${data[11].car_years}</td>
        <td>${data[11].incurred_loss}</td>
        <td>${data[11].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[12].reporting_name}</td>
        <td>${data[12].earned_premium}</td>
        <td>${data[12].car_years}</td>
        <td>${data[12].incurred_loss}</td>
        <td>${data[12].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[13].reporting_name}</td>
        <td>${data[13].earned_premium}</td>
        <td>${data[13].car_years}</td>
        <td>${data[13].incurred_loss}</td>
        <td>${data[13].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[14].reporting_name}</td>
        <td>${data[14].earned_premium}</td>
        <td>${data[14].car_years}</td>
        <td>${data[14].incurred_loss}</td>
        <td>${data[14].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[15].reporting_name}</td>
        <td>${data[15].earned_premium}</td>
        <td>${data[15].car_years}</td>
        <td>${data[15].incurred_loss}</td>
        <td>${data[15].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[16].reporting_name}</td>
        <td>${data[16].earned_premium}</td>
        <td>${data[16].car_years}</td>
        <td>${data[16].incurred_loss}</td>
        <td>${data[16].incurred_count}</td>
    </tr>
    <tr>
        <td>${data[1].reporting_name}</td>
        <td>${data[1].earned_premium}</td>
        <td>${data[1].car_years}</td>
        <td>${data[1].incurred_loss}</td>
        <td>${data[1].incurred_count}</td>
    </tr>
</table>
`



wkhtmltopdf(html, {
    output: "./openidl-auto-coverage-report.pdf",
    "viewport-size": "1280x1024",
    "page-width": "400",
    "page-height": "600"
});
