#!/bin/bash -e
CC_VERSION=$1
CC_SEQUENCE=$2
# package and install 'openidl-cc-default' chaincode on aais node
./network.sh deployCC -ccn openidl-cc-default -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccv ${CC_VERSION} -ccs ${CC_SEQUENCE} -ccsd true

# package and install 'openidl-cc-aais-carriers' chaincode on aais, analytics and carrier nodes 
./network.sh deployCC -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccv ${CC_VERSION} -ccs ${CC_SEQUENCE} -ccsd true

# deploy 'openidl-cc-default' chaincode on 'defaultchannel'
./network.sh deployCC -c defaultchannel -ccn openidl-cc-default -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccv ${CC_VERSION} -ccs ${CC_SEQUENCE} -cci Init -ccsp true

# deploy 'openidl-cc-aais-carriers' chaincode on 'analytics-aais'
./network.sh deployCC -c analytics-aais -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccv ${CC_VERSION} -ccs ${CC_SEQUENCE} -cci Init -ccsp true -cccg ../openidl-chaincode/chaincode/openidl/collection-config-analytics-aais.json

# deploy 'openidl-cc-aais-carriers' chaincode on 'analytics-carrier'
./network.sh deployCC -c analytics-carrier -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccv ${CC_VERSION} -ccs ${CC_SEQUENCE} -cci Init -ccsp true -cccg ../openidl-chaincode/chaincode/openidl/collection-config-analytics-carrier.json
