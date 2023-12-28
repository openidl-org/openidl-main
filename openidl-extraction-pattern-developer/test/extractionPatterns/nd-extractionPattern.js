/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */



 function map() {
    let queryMonth = "2022-06"
    transactionMonth = `${transactionDate.split('-')[0]}-${transactionDate.split('-')[1]}`
    if (transactionMonth == queryMonth){
        emit(
            this.vinHash, this.transactionDate
        )
    }
}
function reduce(key, value) {
    //return {"key": key, "value": value};

    return {"vinHash": key, "date": value[0]}
}

exports.map = map
exports.reduce = reduce