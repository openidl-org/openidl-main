# SPDX-License-Identifier: Apache-2.0
# updating version
sed -i 's/${VERSION}/'$VERSION'/g' deploy_config.json

if [ "$HOST" == "aais" ]
then
    sed -i 's/${ORG}/'$HOST'/g' deploy_config.json
    sed -i 's/${CHANNEL_ORG}/'$HOST'/g' deploy_config.json

    sed -i 's/${DEFAULT_CC_INSTANTIATE_FLAG}/'true'/g' deploy_config.json
    sed -i 's/${DEFAULT_CC_INSTALL_FLAG}/'true'/g' deploy_config.json
    
    sed -i 's/${CARRIER_CC_INSTANTIATE_FLAG}/'true'/g' deploy_config.json
    sed -i 's/${CARRIER_CC_INSTALL_FLAG}/'true'/g' deploy_config.json
elif [ "$HOST" == "analytics" ]
then
    sed -i 's/${ORG}/'$HOST'/g' deploy_config.json
    sed -i 's/${CHANNEL_ORG}/'aais'/g' deploy_config.json

    sed -i 's/${DEFAULT_CC_INSTANTIATE_FLAG}/'false'/g' deploy_config.json
    sed -i 's/${DEFAULT_CC_INSTALL_FLAG}/'true'/g' deploy_config.json
    
    sed -i 's/${CARRIER_CC_INSTANTIATE_FLAG}/'false'/g' deploy_config.json
    sed -i 's/${CARRIER_CC_INSTALL_FLAG}/'true'/g' deploy_config.json
else
    sed -i 's/${ORG}/'$HOST'/g' deploy_config.json
    sed -i 's/${CHANNEL_ORG}/'$HOST'/g' deploy_config.json

    sed -i 's/${DEFAULT_CC_INSTANTIATE_FLAG}/'false'/g' deploy_config.json
    sed -i 's/${DEFAULT_CC_INSTALL_FLAG}/'true'/g' deploy_config.json
    
    sed -i 's/${CARRIER_CC_INSTANTIATE_FLAG}/'true'/g' deploy_config.json
    sed -i 's/${CARRIER_CC_INSTALL_FLAG}/'true'/g' deploy_config.json
fi


sed -i 's/${ORG}/'$HOST'/g' chaincode/openidl/collection-config.json