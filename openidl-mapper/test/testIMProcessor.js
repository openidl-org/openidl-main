const chai = require('chai');
const expect = require('chai').expect;
const premiumRecords = require('./data/testData').sampleIMFlatPremiumRecords
const lossRecords = require('./data/testData').sampleIMFlatLossRecords
const lobProcessor = require('../LOBProcessor')

describe('Testing IM Processor', () => {
    var batchId = '1111'
    var batchHash = '1111'
    it ('should map IM Coverage Premiums correctly', () => {
        var hdsResult = lobProcessor.convertFlatToHDS(premiumRecords[0], batchId, batchHash)
        expect(hdsResult.policy.company.code, 'Premium company code').to.equal('7777')
        expect(hdsResult.policy.lineOfInsurance.legacyCode, 'Premium Line of Insurance code').to.equal('31')
        expect(hdsResult.policy.lineOfInsurance.name, 'Premium LOB Name').to.equal('Inland Marine')
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType, 'Premium Transaction type').to.equal('Premium Statistical Transaction')
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionCode, 'Premium Transaction code').to.equal('1')
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].amount, 'Premium amount').to.equal(5000)
        expect(hdsResult.policy.policyStructure[0].coverages[0].exposureAmount, 'Premium Exposure amount').to.equal(0)
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].periodStartDate, 'Premium Accounting Date').to.equal('2005-01-01')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateLegacyCode, 'Premium State code').to.equal('06')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateName, 'Premium State Name').to.equal('Connecticut')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateAbbreviation, 'Premium State Abbreviation').to.equal('CT')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.legacyCode, 'Premium Policy Form code').to.equal('00')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.description, 'Premium Policy Form description').to.equal('Does not apply')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.versionNumber, 'Premium Policy Form Version Number').to.equal('??')
        expect(hdsResult.policy.policyStructure[0].riskClassification.legacyCode, 'Premium Risk Classification code').to.equal('022')
        expect(hdsResult.policy.policyStructure[0].riskClassification.description, 'Premium Risk Classification description').to.equal(undefined)
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.postalCode, 'Premium Postal code').to.equal('06040')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryLegacyCode, 'Premium Country code').to.equal(undefined)
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryName, 'Premium Country Name').to.equal('TODO: need reference data')
        expect(hdsResult.policy.commercialPolicy.policyNumber, 'Premium Policy Number').to.equal('IM123456789123')
        expect(hdsResult.policy.location[0].address, 'Premium Address').to.equal('896 main street')
        expect(hdsResult.policy.taxID, 'Premium Tax ID').to.equal('123456789')
        expect(hdsResult.policy.businessClassification[0].industryCode, 'Premium SIC code').to.equal('1234')
        expect(hdsResult.policy.businessClassification[0].description, 'Premium SIC description').to.equal(undefined)
        expect(hdsResult.policy.limits[0].type, 'Premium Limit type').to.equal("Business Interruption Limit")
        expect(hdsResult.policy.limits[0].amount, 'Premium Limit amount').to.equal(null)
        expect(hdsResult.policy.numberOfEmployees, 'Premium Number of Employees').to.equal(20)
        expect(hdsResult.policy.policyForm.policyFormEdition, 'Premiium Policy Form Edition').to.equal('PFE123456')
        expect(hdsResult.policy.policyForm.businessInterruptionFlag, 'Premium BI Flag').to.equal(false)
        expect(hdsResult.policy.policyForm.physicalDamageRequirement, 'Premium PD Requirement').to.equal(false)
        expect(hdsResult.policy.policyForm.viralExclusion, 'Premium Viral Exclusion').to.equal(false)
        expect(hdsResult.policy.annualStatementLineOfBusiness.code, "Premium Annual statement line of business code").to.equal('021')
        expect(hdsResult.policy.annualStatementLineOfBusiness.description, 'Premium Annual statement line of business').to.equal('Allied Lines, including Glass')
    });

    // it ('should map IM Policy Premiums correctly', () => {
    //     var hdsResult = lobProcessor.convertFlatToHDS(premiumRecords[1], batchId, batchHash)
    //     expect(hdsResult.policy.currencyPayment[0].accountStatement.periodStartDate, 'Premium Accounting Date').to.equal('2010-07-01')
    //     expect(hdsResult.policy.currencyPayment[0].transactionType, 'Premium Transaction type').to.equal('Premium Statistical Transaction')
    //     expect(hdsResult.policy.currencyPayment[0].transactionCode, 'Premium Transaction code').to.equal('8')
    // });

    // don't have any loss records for IM
    // it ('should map IM Paid Losses correctly', () => {
    //     var hdsResult = lobProcessor.convertFlatToHDS(lossRecords[0], batchId, batchHash)
    //     expect(hdsResult.policy.lineOfInsurance.legacyCode, 'Loss Line of Insurance code').to.equal('31')
    //     expect(hdsResult.policy.lineOfInsurance.name, 'Loss LOB Name').to.equal('Inland Marine')
    //     expect(hdsResult.policy.company.code, 'Loss company code').to.equal('7777')
    //     expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateLegacyCode, 'Loss State code').to.equal('07')
    //     expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateName, 'Loss State Name').to.equal('Delaware')
    //     expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateAbbreviation, 'Loss State Abbreviation').to.equal('DE')
    //     expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryLegacyCode, 'Loss Country code').to.equal(undefined)
    //     expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryName, 'Loss Country Name').to.equal('TODO: need reference data')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].accountStatement.periodStartDate, 'Loss Accounting Date').to.equal('2009-01-01')
    //     expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType, 'Loss Transaction type').to.equal('Premium Statistical Transaction')
    //     expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionCode, 'Loss Transaction code').to.equal('2')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].causeOfLoss.legacyCode, 'Loss Cause of loss code').to.equal('50')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].causeOfLoss.category, 'Loss Cause of loss category').to.equal(null)
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].causeOfLoss.name, 'Loss Cause of loss name').to.equal(null)
    //     expect(hdsResult.claim.claimFolder.accidentDate, 'Loss Accident Date').to.equal('2009-02-03')
    //     expect(hdsResult.claim.claimFolder.claimNumber, 'Loss Claim Number').to.equal('BP1234567891  ')
    //     expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.legacyCode, 'Loss Policy Form code').to.equal('14')
    //     expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.description, 'Loss Policy Form description').to.equal('Standard form')
    //     expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.versionNumber, 'Loss Policy Form Version Number').to.equal('??')
    //     expect(hdsResult.policy.policyStructure[0].riskClassification.legacyCode, 'Loss Risk Classification code').to.equal('99903')
    //     expect(hdsResult.policy.policyStructure[0].riskClassification.description, 'Loss Risk Classification description').to.equal("Cosmetologists' Liability")
    //     expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.postalCode, 'Loss Postal code').to.equal('06040')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].transactionType, 'Loss Transaction type').to.equal('Loss Statistical Transaction')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].transactionCode, 'Loss Transaction code').to.equal('2')
    //     expect(hdsResult.claim.claimFolder.claimStatus, 'Loss Claim Status').to.equal(' ')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].type, 'Loss amount type').to.equal('Loss amount')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].amount, 'Loss amount').to.equal(9567)
    //     expect(hdsResult.policy.annualStatementLineOfBusiness.code, "Loss Annual statement line of business code").to.equal('010')
    //     expect(hdsResult.policy.annualStatementLineOfBusiness.description, 'Loss Annual statement line of business').to.equal('Fire')
    // });

    // it ('should map IM Reserved Losses correctly', () => {
    //     var hdsResult = lobProcessor.convertFlatToHDS(lossRecords[1], batchId, batchHash)
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].type, 'Reserved Loss amount type').to.equal('Reserve for Claim')
    //     expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].amount, 'Reserved Loss amount').to.equal(1345)
    // });
})

