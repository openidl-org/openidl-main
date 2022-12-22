function getLayout(data){
console.log('layout')
console.log(data[0])
state = {name: "Virginia", code: 45}
// t()
layout = `
<head>
    <meta charset="UTF-8">
    <title>Auto Coverage Report</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" media="screen" href="style.css">
</head>

<body>
    <header id="header">
        <div class="container">
            <h1>AMERICAN ASSOCIATION OF INSURANCE SERVICES</h1>
            <h2>PRIVATE PASSENGER AUTOMOBILE</h2>
            <h1>CALENDAR ACCIDENT YEAR 2010 NAIC COVERAGE REPORT</h1>
            <h2>Voluntary Market</h2>
            <h2>STATE: ${state.code} ${state.name}</h2>
        </div>
    </header>

    <header id="header-inner">
        <div class="float-1">
            <h2>STATE: ${state.code} ${state.name}</h2>
        </div>

    </header>

    <section id="table-a">
        <div class="container">
            <table>
                <tr>
                    <th>Liability</th>
                    <th>Earned Premium</th>
                    <th>Car Years</th>
                    <th>Incurred Loss</th>
                    <th>Incurred Count</th>
                </tr>
                <tr>
                    <td>${data[0].ReportingName}</td>
                    <td>$${data[0].EarnedPremium}</td>
                    <td>${data[0].CarYears}</td>
                    <td>$${data[0].IncurredLoss}</td>
                    <td>${data[0].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[1].ReportingName}</td>
                    <td>$${data[1].EarnedPremium}</td>
                    <td>${data[1].CarYears}</td>
                    <td>$${data[1].IncurredLoss}</td>
                    <td>${data[1].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[2].ReportingName}</td>
                    <td>$${data[2].EarnedPremium}</td>
                    <td>${data[2].CarYears}</td>
                    <td>$${data[2].IncurredLoss}</td>
                    <td>${data[2].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[3].ReportingName}</td>
                    <td>$${data[3].EarnedPremium}</td>
                    <td>${data[3].CarYears}</td>
                    <td>$${data[3].IncurredLoss}</td>
                    <td>${data[3].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[4].ReportingName}</td>
                    <td>$${data[4].EarnedPremium}</td>
                    <td>${data[4].CarYears}</td>
                    <td>$${data[4].IncurredLoss}</td>
                    <td>${data[4].IncurredCount}</td>
                </tr>
                <tr>
                    <td>Liability Total</td>
                    <td>$${data[16].EarnedPremium}</td>
                    <td>${data[16].CarYears}</td>
                    <td>$${data[16].IncurredLoss}</td>
                    <td>${data[16].IncurredCount}</td>
                </tr>
            </table>
        </div>
    </section>

    <br><br>
   
    <section id="table-b">
        <div class="container">
            <table>
                <tr>
                    <th>Comprehensive</th>
                    <th>Earned Premium</th>
                    <th>Car Years</th>
                    <th>Incurred Loss</th>
                    <th>Incurred Count</th>
                </tr>
                <tr>
                    <td>${data[5].ReportingName}</td>
                    <td>${data[5].EarnedPremium}</td>
                    <td>${data[5].CarYears}</td>
                    <td>${data[5].IncurredLoss}</td>
                    <td>${data[5].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[6].ReportingName}</td>
                    <td>${data[6].EarnedPremium}</td>
                    <td>${data[6].CarYears}</td>
                    <td>${data[6].IncurredLoss}</td>
                    <td>${data[6].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[7].ReportingName}</td>
                    <td>${data[7].EarnedPremium}</td>
                    <td>${data[7].CarYears}</td>
                    <td>${data[7].IncurredLoss}</td>
                    <td>${data[7].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[8].ReportingName}</td>
                    <td>${data[8].EarnedPremium}</td>
                    <td>${data[8].CarYears}</td>
                    <td>${data[8].IncurredLoss}</td>
                    <td>${data[8].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[9].ReportingName}</td>
                    <td>${data[9].EarnedPremium}</td>
                    <td>${data[9].CarYears}</td>
                    <td>${data[9].IncurredLoss}</td>
                    <td>${data[9].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[10].ReportingName}</td>
                    <td>${data[10].EarnedPremium}</td>
                    <td>${data[10].CarYears}</td>
                    <td>${data[10].IncurredLoss}</td>
                    <td>${data[10].IncurredCount}</td>
                </tr>
                <tr>
                    <td>Comprehensive Total</td>
                    <td>${data[16].EarnedPremium}</td>
                    <td>${data[16].CarYears}</td>
                    <td>${data[16].IncurredLoss}</td>
                    <td>${data[16].IncurredCount}</td>
                </tr>
            </table>
        </div>
    </section>

    <br>

    <section id="table-c">
        <div class="container">
            <table>
                <tr>
                    <th>Collision</th>
                    <th>Earned Premium</th>
                    <th>Car Years</th>
                    <th>Incurred Loss</th>
                    <th>Incurred Count</th>
                </tr>
                <tr>
                    <td>${data[11].ReportingName}</td>
                    <td>${data[11].EarnedPremium}</td>
                    <td>${data[11].CarYears}</td>
                    <td>${data[11].IncurredLoss}</td>
                    <td>${data[11].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[12].ReportingName}</td>
                    <td>${data[12].EarnedPremium}</td>
                    <td>${data[12].CarYears}</td>
                    <td>${data[12].IncurredLoss}</td>
                    <td>${data[12].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[13].ReportingName}</td>
                    <td>${data[13].EarnedPremium}</td>
                    <td>${data[13].CarYears}</td>
                    <td>${data[13].IncurredLoss}</td>
                    <td>${data[13].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[14].ReportingName}</td>
                    <td>${data[14].EarnedPremium}</td>
                    <td>${data[14].CarYears}</td>
                    <td>${data[14].IncurredLoss}</td>
                    <td>${data[14].IncurredCount}</td>
                </tr>
                <tr>
                    <td>${data[15].ReportingName}</td>
                    <td>${data[15].EarnedPremium}</td>
                    <td>${data[15].CarYears}</td>
                    <td>${data[15].IncurredLoss}</td>
                    <td>${data[15].IncurredCount}</td>
                </tr>
                <tr>
                    <td>Collision Total</td>
                    <td>${data[16].EarnedPremium}</td>
                    <td>${data[16].CarYears}</td>
                    <td>${data[16].IncurredLoss}</td>
                    <td>${data[16].IncurredCount}</td>
                </tr>
            </table>
        </div>
    </section>
</body>
`
console.log(layout)
return layout
}

module.exports = getLayout