const fs = require("fs");


function getLayout(data){

    state = {name: "Alabama", code: '01'}
    // t()
    layout = `
    <head>
    <meta charset="UTF-8">
    <title>Homeowners DOI Report</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" media="screen" href="basic.css">
</head>

<body>
    <header id="header">
        <div class="container">
            <h1>AMERICAN ASSOCIATION OF INSURANCE SERVICES</h1>
            <h2>HOMEOWNERS - REPORT FOR PERIOD OF - Q1 </h2>
            <h1>CALENDAR ACCIDENT YEAR 2010 NAIC COVERAGE REPORT</h1>
            <h2>Voluntary Market</h2>
            <h2>STATE: ${state.code} ${state.name}</h2>
        </div>
    </header>


    <section id="table-a">
        <div class="container">
        <table>
                <tr>
                    <th>Category</th>
                    <th>Policy Form</th>
                    <th>Written Premium</th>
                    <th>Paid Loss</th>
                    <th>Loss Ratio</th>
                    <th>Earned Premium</th>
                    <th>Incurred Loss</th>
                    <th>EP Loss Ratio</th>
                </tr>
                   <tr><td>${data[0].Category}</td>
                    <td>${data[0].PolicyForm}</td>
                    <td>$${data[0].WrittenPremium}</td>
                    <td>${data[0].PaidLoss}</td>
                    <td>${data[0].LossRatio}</td>
                    <td>$${data[0].EarnedPremium}</td>
                    <td>${data[0].IncurredLoss}</td>
                    <td>${data[0].EPLossRatio}</td>
                </tr>
                </table>
                </br>
                <table>

                <tr>
                    <th>Category</th>
                    <th>Policy Form</th>
                    <th>Written Premium</th>
                    <th>Paid Loss</th>
                    <th>Loss Ratio</th>
                    <th>Earned Premium</th>
                    <th>Incurred Loss</th>
                    <th>EP Loss Ratio</th>
                </tr>

                <tr>
                    <td>${data[1].Category}</td>
                    <td>${data[1].PolicyForm}</td>
                    <td>$${data[1].WrittenPremium}</td>
                    <td>${data[1].PaidLoss}</td>
                    <td>${data[1].LossRatio}</td>
                    <td>$${data[1].EarnedPremium}</td>
                    <td>${data[1].IncurredLoss}</td>
                    <td>${data[1].EPLossRatio}</td>
                </tr>
                <tr>
                <td>${data[2].Category}</td>
                    <td>${data[2].PolicyForm}</td>
                    <td>$${data[2].WrittenPremium}</td>
                    <td>${data[2].PaidLoss}</td>
                    <td>${data[2].LossRatio}</td>
                    <td>$${data[2].EarnedPremium}</td>
                    <td>${data[2].IncurredLoss}</td>
                    <td>${data[2].EPLossRatio}</td>
                </tr>
                </table>
                </br>
                <table>
                <tr>
                    <th>Category</th>
                    <th>Policy Form</th>
                    <th>Written Premium</th>
                    <th>Paid Loss</th>
                    <th>Loss Ratio</th>
                    <th>Earned Premium</th>
                    <th>Incurred Loss</th>
                    <th>EP Loss Ratio</th>
                </tr>
                <tr>
                <td>${data[3].Category}</td>
                    <td>${data[3].PolicyForm}</td>
                    <td>$${data[3].WrittenPremium}</td>
                    <td>${data[3].PaidLoss}</td>
                    <td>${data[3].LossRatio}</td>
                    <td>$${data[3].EarnedPremium}</td>
                    <td>${data[3].IncurredLoss}</td>
                    <td>${data[3].EPLossRatio}</td>
                </tr>
                <tr>
                <td>${data[4].Category}</td>
                    <td>${data[4].PolicyForm}</td>
                    <td>$${data[4].WrittenPremium}</td>
                    <td>${data[4].PaidLoss}</td>
                    <td>${data[4].LossRatio}</td>
                    <td>$${data[4].EarnedPremium}</td>
                    <td>${data[4].IncurredLoss}</td>
                    <td>${data[4].EPLossRatio}</td>
                </tr>
                
                <tr>
                    <td>${data[5].Category}</td>
                    <td>${data[5].PolicyForm}</td>
                    <td>$${data[5].WrittenPremium}</td>
                    <td>${data[5].PaidLoss}</td>
                    <td>${data[5].LossRatio}</td>
                    <td>$${data[5].EarnedPremium}</td>
                    <td>${data[5].IncurredLoss}</td>
                    <td>${data[5].EPLossRatio}</td>
                </tr>

                <tr>
                <td>${data[6].Category}</td>
                    <td>${data[6].PolicyForm}</td>
                    <td>$${data[6].WrittenPremium}</td>
                    <td>${data[6].PaidLoss}</td>
                    <td>${data[6].LossRatio}</td>
                    <td>$${data[6].EarnedPremium}</td>
                    <td>${data[6].IncurredLoss}</td>
                    <td>${data[6].EPLossRatio}</td>
                </tr>
                <tr>
                <td>${data[7].Category}</td>
                    <td>${data[7].PolicyForm}</td>
                    <td>$${data[7].WrittenPremium}</td>
                    <td>${data[7].PaidLoss}</td>
                    <td>${data[7].LossRatio}</td>
                    <td>$${data[7].EarnedPremium}</td>
                    <td>${data[7].IncurredLoss}</td>
                    <td>${data[7].EPLossRatio}</td>
                </tr>
                <tr>
                    <td>${data[8].Category}</td>
                    <td>${data[8].PolicyForm}</td>
                    <td>$${data[8].WrittenPremium}</td>
                    <td>${data[8].PaidLoss}</td>
                    <td>${data[8].LossRatio}</td>
                    <td>$${data[8].EarnedPremium}</td>
                    <td>${data[8].IncurredLoss}</td>
                    <td>${data[8].EPLossRatio}</td>
                </tr>
                <tr>
                <td>${data[9].Category}</td>
                    <td>${data[9].PolicyForm}</td>
                    <td>$${data[9].WrittenPremium}</td>
                    <td>${data[9].PaidLoss}</td>
                    <td>${data[9].LossRatio}</td>
                    <td>$${data[9].EarnedPremium}</td>
                    <td>${data[9].IncurredLoss}</td>
                    <td>${data[9].EPLossRatio}</td>
                </tr>
                <td>${data[10].Category}</td>
                <td>${data[10].PolicyForm}</td>
                <td>$${data[10].WrittenPremium}</td>
                <td>${data[10].PaidLoss}</td>
                <td>${data[10].LossRatio}</td>
                <td>$${data[10].EarnedPremium}</td>
                <td>${data[10].IncurredLoss}</td>
                <td>${data[10].EPLossRatio}</td>
            </tr>
                <tr>

                    <td>${data[11].Category}</td>
                    <td>${data[11].PolicyForm}</td>
                    <td>$${data[11].WrittenPremium}</td>
                    <td>${data[11].PaidLoss}</td>
                    <td>${data[11].LossRatio}</td>
                    <td>$${data[11].EarnedPremium}</td>
                    <td>${data[11].IncurredLoss}</td>
                    <td>${data[11].EPLossRatio}</td>
                </tr>

    </table> </br> <table>

                <tr>
                    <th>Category</th>
                    <th>Policy Form</th>
                    <th>Written Premium</th>
                    <th>Paid Loss</th>
                    <th>Loss Ratio</th>
                    <th>Earned Premium</th>
                    <th>Incurred Loss</th>
                    <th>EP Loss Ratio</th>
                </tr>
                

                <tr>
                    <td>${data[12].Category}</td>
                    <td>${data[12].Category}</td>
                    <td>$${data[12].WrittenPremium}</td>
                    <td>${data[12].PaidLoss}</td>
                    <td>${data[12].LossRatio}</td>
                    <td>$${data[12].EarnedPremium}</td>
                    <td>${data[12].IncurredLoss}</td>
                    <td>${data[12].EPLossRatio}</td>
                </tr>

</table></br><table>

              
            
<tr>
<th>Category</th>
<th>Policy Form</th>
<th>Written Premium</th>
<th>Paid Loss</th>
<th>Loss Ratio</th>
<th>Earned Premium</th>
<th>Incurred Loss</th>
<th>EP Loss Ratio</th>
</tr>
               <tr>
               <td>${data[13].Category}</td>
                    <td>${data[13].PolicyForm}</td>
                    <td>$${data[13].WrittenPremium}</td>
                    <td>${data[13].PaidLoss}</td>
                    <td>${data[13].LossRatio}</td>
                    <td>$${data[13].EarnedPremium}</td>
                    <td>${data[13].IncurredLoss}</td>
                    <td>${data[13].EPLossRatio}</td>
                </tr>
                <tr>
                <td>${data[14].Category} 14</td>
                    <td>${data[14].PolicyForm}</td>
                    <td>$${data[14].WrittenPremium}</td>
                    <td>${data[14].PaidLoss}</td>
                    <td>${data[14].LossRatio}</td>
                    <td>$${data[14].EarnedPremium}</td>
                    <td>${data[14].IncurredLoss}</td>
                    <td>${data[14].EPLossRatio}</td>
                </tr>
                <tr>
                <td>${data[15].Category}</td>
                    <td>${data[15].PolicyForm}</td>
                    <td>$${data[15].WrittenPremium}</td>
                    <td>${data[15].PaidLoss}</td>
                    <td>${data[15].LossRatio}</td>
                    <td>$${data[15].EarnedPremium}</td>
                    <td>${data[15].IncurredLoss}</td>
                    <td>${data[15].EPLossRatio}</td>
                </tr>
                <tr>
                <td>${data[16].Category}</td>
                    <td>${data[16].PolicyForm}</td>
                    <td>$${data[16].WrittenPremium}</td>
                    <td>${data[16].PaidLoss}</td>
                    <td>${data[16].LossRatio}</td>
                    <td>$${data[16].EarnedPremium}</td>
                    <td>${data[16].IncurredLoss}</td>
                    <td>${data[16].EPLossRatio}</td>
                </tr>
                <tr><td>${data[17].Category}</td>
                    <td>${data[17].PolicyForm}</td>
                    <td>$${data[17].WrittenPremium}</td>
                    <td>${data[17].PaidLoss}</td>
                    <td>${data[17].LossRatio}</td>
                    <td>$${data[17].EarnedPremium}</td>
                    <td>${data[17].IncurredLoss}</td>
                    <td>${data[17].EPLossRatio}</td>
                </tr>
                <tr><td>${data[18].Category}</td>
                    <td>${data[18].PolicyForm}</td>
                    <td>$${data[18].WrittenPremium}</td>
                    <td>${data[18].PaidLoss}</td>
                    <td>${data[18].LossRatio}</td>
                    <td>$${data[18].EarnedPremium}</td>
                    <td>${data[18].IncurredLoss}</td>
                    <td>${data[18].EPLossRatio}</td>
                </tr>
                <tr><td>${data[19].Category}</td>
                <td>${data[19].PolicyForm}</td>
                <td>$${data[19].WrittenPremium}</td>
                <td>${data[19].PaidLoss}</td>
                <td>${data[19].LossRatio}</td>
                <td>$${data[19].EarnedPremium}</td>
                <td>${data[19].IncurredLoss}</td>
                <td>${data[19].EPLossRatio}</td>
            </tr>
            <tr>
            <td>${data[20].Category}</td>
            <td>${data[20].PolicyForm}</td>
            <td>$${data[20].WrittenPremium}</td>
            <td>${data[20].PaidLoss}</td>
            <td>${data[20].LossRatio}</td>
            <td>$${data[20].EarnedPremium}</td>
            <td>${data[20].IncurredLoss}</td>
            <td>${data[20].EPLossRatio}</td>
        </tr>
        <tr>
        <td>${data[21].Category}</td>
        <td>${data[21].PolicyForm}</td>
        <td>$${data[21].WrittenPremium}</td>
        <td>${data[21].PaidLoss}</td>
        <td>${data[21].LossRatio}</td>
        <td>$${data[21].EarnedPremium}</td>
        <td>${data[21].IncurredLoss}</td>
        <td>${data[21].EPLossRatio}</td>
    </tr>

    <tr>
    <td>${data[22].Category}</td>
    <td>${data[22].PolicyForm}</td>
    <td>$${data[22].WrittenPremium}</td>
    <td>${data[22].PaidLoss}</td>
    <td>${data[22].LossRatio}</td>
    <td>$${data[22].EarnedPremium}</td>
    <td>${data[22].IncurredLoss}</td>
    <td>${data[22].EPLossRatio}</td>
</tr>
<tr>
<td>${data[23].Category}</td>
    <td>${data[23].PolicyForm}</td>
    <td>$${data[23].WrittenPremium}</td>
    <td>${data[23].PaidLoss}</td>
    <td>${data[23].LossRatio}</td>
    <td>$${data[23].EarnedPremium}</td>
    <td>${data[23].IncurredLoss}</td>
    <td>${data[23].EPLossRatio}</td>
</tr>
<tr>
<td>${data[24].Category}</td>
    <td>${data[24].PolicyForm}</td>
    <td>$${data[24].WrittenPremium}</td>
    <td>${data[24].PaidLoss}</td>
    <td>${data[24].LossRatio}</td>
    <td>$${data[24].EarnedPremium}</td>
    <td>${data[24].IncurredLoss}</td>
    <td>${data[24].EPLossRatio}</td>
</tr>

<tr>
<td>${data[25].Category}</td>
    <td>${data[25].PolicyForm}</td>
    <td>$${data[25].WrittenPremium}</td>
    <td>${data[25].PaidLoss}</td>
    <td>${data[25].LossRatio}</td>
    <td>$${data[25].EarnedPremium}</td>
    <td>${data[25].IncurredLoss}</td>
    <td>${data[25].EPLossRatio}</td>
</tr>

<tr>
<td>${data[26].Category}</td>
    <td>${data[26].PolicyForm}</td>
    <td>$${data[26].WrittenPremium}</td>
    <td>${data[26].PaidLoss}</td>
    <td>${data[26].LossRatio}</td>
    <td>$${data[26].EarnedPremium}</td>
    <td>${data[26].IncurredLoss}</td>
    <td>${data[26].EPLossRatio}</td>
</tr>

        </div>
    </section>
</body>
    `
    // console.log(layout)
    fs.writeFileSync('./assets/ho-doi.html',layout)
    return layout
    }
    
    module.exports = getLayout