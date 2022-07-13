function map(){
    if (this.effectiveDate > '2022-05-01')
        emit (this.vin, this.effectiveDate)
}

//unittest-insurancedatamanager