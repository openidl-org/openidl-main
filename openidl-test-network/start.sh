# bring down the current network
./network.sh down

# Pull the images
./bootstrap.sh 2.2.3 1.5.1

# bring up the network
./network.sh up -ca -s couchdb

# create the defaultchannel
./network.sh createChannel -c defaultchannel -p DefaultChannel

# create the analytics-aais
./network.sh createChannel -c analytics-aais -p AnalyticsAaisChannel

# create the analytics-carrier
./network.sh createChannel -c analytics-carrier -p AnalyticsCarrierChannel

# package and install 'openidl-cc-default' chaincode on aais node
./network.sh deployCC -ccn openidl-cc-default -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccsd true

# package and install 'openidl-cc-aais-carriers' chaincode on aais, analytics and carrier nodes 
./network.sh deployCC -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccsd true

# deploy 'openidl-cc-default' chaincode on 'defaultchannel'
./network.sh deployCC -c defaultchannel -ccn openidl-cc-default -ccp ../openidl-chaincode/chaincode/openidl -ccl go -cci Init -ccsp true

# deploy 'openidl-cc-aais-carriers' chaincode on 'analytics-aais'
./network.sh deployCC -c analytics-aais -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -cci Init -ccsp true -cccg ../openidl-chaincode/chaincode/openidl/collection-config-analytics-aais.json

# deploy 'openidl-cc-aais-carriers' chaincode on 'analytics-carrier'
./network.sh deployCC -c analytics-carrier -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -cci Init -ccsp true -cccg ../openidl-chaincode/chaincode/openidl/collection-config-analytics-carrier.json

# pre-register users on certificate authority (couchdb)
./pre-register-users.sh -N admin -P adminpw -p password -u localhost:7054 -n ca-aais  -c http://admin:adminpw@localhost:9984/wallet/ -o aais -m aaismsp -U "openidl-aais-insurance-data-manager-ibp-2.0 openidl-aais-data-call-app-ibp-2.0 openidl-aais-data-call-processor-ibp-2.0" -r true -w couch
./pre-register-users.sh -N admin -P adminpw -p password -u localhost:8054 -n ca-analytics  -c http://admin:adminpw@localhost:9984/wallet/ -o analytics -m analyticsmsp -U "openidl-analytics-data-call-app-ibp-2.0 openidl-data-call-mood-listener-ibp-2.0 openidl-transactional-data-event-listener-ibp-2.0" -r false -w couch
./pre-register-users.sh -N admin -P adminpw -p password -u localhost:10054 -n ca-carrier  -c http://admin:adminpw@localhost:9984/wallet/ -o carrier -m carriermsp -U "openidl-carrier-data-call-app-ibp-2.0 openidl-carrier-data-call-processor-ibp-2.0 openidl-carrier-insurance-data-manager-ibp-2.0" -r false -w couch

# # pre-register users on certificate authority (vault)
# ./pre-register-users.sh -N admin -P adminpw -p password -u localhost:7054 -n ca-aais  -o aais -m aaismsp -U "openidl-aais-insurance-data-manager-ibp-2.0 openidl-aais-data-call-app-ibp-2.0 openidl-aais-data-call-processor-ibp-2.0" -V http://127.0.0.1:8200 -l aais -t password -b aais -q fabric-kvs -w vault
# ./pre-register-users.sh -N admin -P adminpw -p password -u localhost:8054 -n ca-analytics  -o analytics -m analyticsmsp -U "openidl-analytics-data-call-app-ibp-2.0 openidl-data-call-mood-listener-ibp-2.0 openidl-transactional-data-event-listener-ibp-2.0" -V http://127.0.0.1:8200 -l analytics -t password -b analytics -q fabric-kvs -w vault
# ./pre-register-users.sh -N admin -P adminpw -p password -u localhost:10054 -n ca-carrier -o carrier -m carriermsp -U "openidl-carrier-data-call-app-ibp-2.0 openidl-carrier-data-call-processor-ibp-2.0 openidl-carrier-insurance-data-manager-ibp-2.0" -V http://127.0.0.1:8200 -l carrier -t password -b carrier -q fabric-kvs -w vault