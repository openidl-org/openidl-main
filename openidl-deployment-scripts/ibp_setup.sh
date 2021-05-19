# SPDX-License-Identifier: Apache-2.0
#!/bin/bash
source config.sh
source utils.sh
# API_KEY=$TF_VAR_ibmcloud_api_key
# ENV=$TF_VAR_environment
# ORG=$TF_VAR_node
# REGION=$TF_VAR_region
# RESOURCE_GROUP="rg-$ENV-$ORG"



# # # Login to IBM Cloud
# ibmcloud login --apikey $API_KEY -g $RESOURCE_GROUP

# IBP_SERVICE_INSTANCE="$ENV-$ORG-ibp"
# IBP_SERVICE_KEY="$ENV-$ORG-IBP-ServiceCredential"
# # #Create a Service credential for IBP
# ibmcloud resource service-key-create $IBP_SERVICE_KEY Manager --instance-name $IBP_SERVICE_INSTANCE



# # ## Debug the output of each element in Service Credntial
# ORDERER_IBP_API_ENDPOINT=$(ibmcloud resource service-keys --instance-name $IBP_SERVICE_INSTANCE --output json | jq '.[0].credentials.api_endpoint' |sed 's/https\?:\/\///' | tr -d '"')
# ORDERER_IBP_API_KEY=$(ibmcloud resource service-keys --instance-name $IBP_SERVICE_INSTANCE --output json | jq '.[0].credentials.apikey' | tr -d '"')

# echo $ORDERER_IBP_API_ENDPOINT
# echo $ORDERER_IBP_API_KEY


# # ## Replacing $variables in .yml files
# if [ "$1" == "initsetup" ]
# then
#     cp $PWD/metadata/ordering-org-vars.yml $PWD/ansible/ordering-org-vars.yml
#     cp $PWD/metadata/org1-vars.yml $PWD/ansible/org1-vars.yml

#     #Use same for both Orderer and Org1 for now
#     sed -i 's/${ORDERER_IBP_API_ENDPOINT}/'$ORDERER_IBP_API_ENDPOINT'/g' ansible/ordering-org-vars.yml
#     sed -i 's/${ORDERER_IBP_API_KEY}/'$ORDERER_IBP_API_KEY'/g' ansible/ordering-org-vars.yml

#     #Use same for both Orderer and Org1 for now
#     sed -i 's/${ORDERER_IBP_API_ENDPOINT}/'$ORDERER_IBP_API_ENDPOINT'/g' ansible/org1-vars.yml
#     sed -i 's/${ORDERER_IBP_API_KEY}/'$ORDERER_IBP_API_KEY'/g' ansible/org1-vars.yml
# fi

# if [ "$1" == "neworg" ]
# then
#     cp $PWD/metadata/org2-vars.yml $PWD/ansible/org2-vars.yml
#     sed -i 's/${ORDERER_IBP_API_ENDPOINT}/'$ORDERER_IBP_API_ENDPOINT'/g' ansible/org2-vars.yml
#     sed -i 's/${ORDERER_IBP_API_KEY}/'$ORDERER_IBP_API_KEY'/g' ansible/org2-vars.yml
# fi

# chmod -R 777 ansible/
pwd
cd ansible
ORG=$TF_VAR_node

# # # ## Execute ansible playbooks for network setup
if [ "$ORG" == "aais" ]
then
        # Create AAIS Network
        #./build_network.sh build
        ./build_network.sh build | tee $AAIS_RESULT
        cat $AAIS_RESULT 
        EXCE_RESULT=$(grep -o -i  'failed=0'  $AAIS_RESULT | wc -l)
        EXCE_RESULT1=$(grep -o -i  'failed='  $AAIS_RESULT | wc -l)
        if [ $EXCE_RESULT == $EXCE_RESULT1 ]
        then
            echo "IBP build successfully.  Log is availble in $AAIS_RESULT file"
        else
            error_exit "Failed IBP build network. Log is availble in $AAIS_RESULT file"
        fi
fi

# # # ## Execute ansible playbooks for new org setup
if [ "$ORG" != "aais" ]
then
        # Create Carrier Network
        #./join_network.sh -i join
        ./join_network.sh -i join | tee $CARRIER_RESULT
        cat $CARRIER_RESULT 
        EXCE_RESULT=$(grep -o -i  'failed=0'  $CARRIER_RESULT | wc -l)
        EXCE_RESULT1=$(grep -o -i  'failed='  $CARRIER_RESULT | wc -l)
        if [ $EXCE_RESULT == $EXCE_RESULT1 ]
        then
            echo "New $1 is build successfully.  Log is availble in $CARRIER_RESULT file"
        else
            error_exit "Failed IBP build network. Log is availble in $CARRIER_RESULT file"
        fi
fi


