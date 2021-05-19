# SPDX-License-Identifier: Apache-2.0
source config.sh
source utils.sh

#Set the variables from ENV
API_KEY=$TF_VAR_ibmcloud_api_key
ENV=$TF_VAR_environment
ORG=$TF_VAR_node
REGION=$TF_VAR_region
RESOURCE_GROUP="rg-$ENV-$ORG"

sudo apt-get update -y
#Install jq software
sudo apt-get install -y jq

# # Login to IBM Cloud
ibmcloud login --apikey $API_KEY -g $RESOURCE_GROUP -r $REGION || error_exit "Error logging into IBM Cloud"

IBP_SERVICE_INSTANCE="$ENV-$ORG-ibp"
IBP_SERVICE_KEY="$ENV-$ORG-IBP-ServiceCredential"

# #Create a Service credential for IBP
ibmcloud resource service-key-create $IBP_SERVICE_KEY Manager --instance-name $IBP_SERVICE_INSTANCE || error_exit "Error creating Service credential for $IBP_SERVICE_INSTANCE IBP instance "

# ## Debug the output of each element in Service Credntial
CURRORG_IBP_CREDENTIAL=$(ibmcloud resource service-keys --instance-name $IBP_SERVICE_INSTANCE --output json)  || error_exit "Error in fetching Service credential for $IBP_SERVICE_INSTANCE IBP instance"

CURRORG_IBP_API_ENDPOINT=$(jq '.[0].credentials.api_endpoint' <<< ${CURRORG_IBP_CREDENTIAL} | sed 's/https\?:\/\///' | tr -d '"')

if [ -z $CURRORG_IBP_API_ENDPOINT ] || [ $CURRORG_IBP_API_ENDPOINT == "null" ]
then
    echo "Kubernetes Cluster is not assigned to IBP instance, Please assign the cluster and try again"
    echo "Trying to remove Service keys without API endpoints....if it fails(due to multilpe Keys), remove them manually in IBP instance"
    ibmcloud resource service-key-delete $IBP_SERVICE_KEY -f
    exit 1
fi
echo "CURRENT ORG $IBP_SERVICE_INSTANCE IS $CURRORG_IBP_API_ENDPOINT"

CURRORG_IBP_API_KEY=$(jq '.[0].credentials.apikey' <<< $CURRORG_IBP_CREDENTIAL | tr -d '"')
echo "CURRENT ORG $IBP_SERVICE_INSTANCE IS $CURRORG_IBP_API_KEY"

echo $CURRORG_IBP_API_ENDPOINT
echo $CURRORG_IBP_API_KEY

# ## Replacing $variables in .yml files
if [ "$ORG" == "aais" ]
then
    cp $PWD/metadata/ordering-org-vars.yml $PWD/ansible/ordering-org-vars.yml
    cp $PWD/metadata/org1-vars.yml $PWD/ansible/org1-vars.yml
    cp $PWD/metadata/common-vars.yml $PWD/ansible/common-vars.yml
    cp $PWD/metadata/config_image_var.sh $PWD/ansible/config_image_var.sh

    #Use same for both Orderer and Org1 for now
    sed -i 's/${ORDERER_IBP_API_ENDPOINT}/'$CURRORG_IBP_API_ENDPOINT'/g' ansible/ordering-org-vars.yml
    sed -i 's/${ORDERER_IBP_API_KEY}/'$CURRORG_IBP_API_KEY'/g' ansible/ordering-org-vars.yml
    
    #Use same for both Orderer and Org1 for now
    sed -i 's/${ORG1_IBP_API_ENDPOINT}/'$CURRORG_IBP_API_ENDPOINT'/g' ansible/org1-vars.yml
    sed -i 's/${ORG1_IBP_API_KEY}/'$CURRORG_IBP_API_KEY'/g' ansible/org1-vars.yml
    sed -i 's/${ORG1_NAME}/'$ORG'/g' ansible/org1-vars.yml
    sed -i 's/${ORG1_NAME}/'$ORG'/g' ansible/common-vars.yml
    sed -i 's/${NODE_NAME}/'$ORG'/g' ansible/config_image_var.sh
fi

if [ "$ORG" == "analytics" ]
then

    PARENT_RESOURCE_GROUP="rg-$ENV-aais"
    echo "parent is $PARENT_RESOURCE_GROUP"
    PARENT_IBP_SERVICE_INSTANCE="$ENV-aais-ibp"
    PARENT_IBP_SERVICE_KEY="$ENV-aais-IBP-ServiceCredential"

    #Get Orderer Org
    ibmcloud target -g $PARENT_RESOURCE_GROUP || error_exit "Error in targetting resource group $PARENT_RESOURCE_GROUP"
    PARENTORG_IBP_CREDENTIAL=$(ibmcloud resource service-keys --instance-name $PARENT_IBP_SERVICE_INSTANCE --output json) || error_exit "Error in fetching service End point for $PARENT_IBP_SERVICE_INSTANCE"
    PARENTORG_IBP_API_ENDPOINT=$(jq '.[0].credentials.api_endpoint' <<< ${PARENTORG_IBP_CREDENTIAL} | sed 's/https\?:\/\///' | tr -d '"') 
    if [ -z $PARENTORG_IBP_API_ENDPOINT ] || [ $PARENTORG_IBP_API_ENDPOINT == "null" ]
    then
        echo "AAIS IBP is not created yet, Please build network with AAIS"
        exit 1
    fi

    PARENTORG_IBP_API_KEY=$(jq '.[0].credentials.apikey' <<< ${PARENTORG_IBP_CREDENTIAL} | tr -d '"')
    echo "PARENT ORG $PARENT_IBP_SERVICE_INSTANCE IS $PARENTORG_IBP_API_ENDPOINT"


    cp $PWD/metadata/ordering-org-vars.yml $PWD/ansible/ordering-org-vars.yml
    cp $PWD/metadata/org1-vars.yml $PWD/ansible/org1-vars.yml
    cp $PWD/metadata/common-vars.yml $PWD/ansible/common-vars.yml
    cp $PWD/metadata/config_image_var.sh $PWD/ansible/config_image_var.sh

    #Use same for both Orderer and Org1 for now
    sed -i 's/${ORDERER_IBP_API_ENDPOINT}/'$PARENTORG_IBP_API_ENDPOINT'/g' ansible/ordering-org-vars.yml
    sed -i 's/${ORDERER_IBP_API_KEY}/'$PARENTORG_IBP_API_KEY'/g' ansible/ordering-org-vars.yml

    #Use same for both Orderer and Org1 for now
    sed -i 's/${ORG1_IBP_API_ENDPOINT}/'$PARENTORG_IBP_API_ENDPOINT'/g' ansible/org1-vars.yml
    sed -i 's/${ORG1_IBP_API_KEY}/'$PARENTORG_IBP_API_KEY'/g' ansible/org1-vars.yml


    cp $PWD/metadata/org2-vars.yml $PWD/ansible/org2-vars.yml
    sed -i 's/${ORG2_IBP_API_ENDPOINT}/'$CURRORG_IBP_API_ENDPOINT'/g' ansible/org2-vars.yml
    sed -i 's/${ORG2_IBP_API_KEY}/'$CURRORG_IBP_API_KEY'/g' ansible/org2-vars.yml
    sed -i 's/${ORG2_NAME}/'$ORG'/g' ansible/org2-vars.yml
    sed -i 's/${ORG1_NAME}/'aais'/g' ansible/common-vars.yml
    sed -i 's/${ORG2_NAME}/'$ORG'/g' ansible/common-vars.yml
    sed -i 's/${ORG1_NAME}/'aais'/g' ansible/org1-vars.yml
    sed -i 's/${NODE_NAME}/'$ORG'/g' ansible/config_image_var.sh
    
fi

if [ "$ORG" != "aais" ] && [ "$ORG" != "analytics" ]
then

    PARENT_RESOURCE_GROUP="rg-$ENV-aais"
    echo "parent is $PARENT_RESOURCE_GROUP"
    PARENT_IBP_SERVICE_INSTANCE="$ENV-aais-ibp"
    PARENT_IBP_SERVICE_KEY="$ENV-aais-IBP-ServiceCredential"

    #Get Orderer Org
    ibmcloud target -g $PARENT_RESOURCE_GROUP || error_exit "Error in targetting resource group $PARENT_RESOURCE_GROUP"
    PARENTORG_IBP_CREDENTIAL=$(ibmcloud resource service-keys --instance-name $PARENT_IBP_SERVICE_INSTANCE --output json) || error_exit "Error in fetching service end point for $PARENT_IBP_SERVICE_INSTANCE"
    PARENTORG_IBP_API_ENDPOINT=$(jq '.[0].credentials.api_endpoint' <<< ${PARENTORG_IBP_CREDENTIAL} |sed 's/https\?:\/\///' | tr -d '"')
    if [ -z $PARENTORG_IBP_API_ENDPOINT ] || [ $PARENTORG_IBP_API_ENDPOINT == "null" ]
    then
        echo "AAIS IBP is not created yet, Please build network with AAIS and Analytics before creating Carrier"
        exit 1
    fi

    PARENTORG_IBP_API_KEY=$(jq '.[0].credentials.apikey' <<< ${PARENTORG_IBP_CREDENTIAL} | tr -d '"')
    echo "PARENT ORG $PARENT_IBP_SERVICE_INSTANCE IS $PARENTORG_IBP_API_ENDPOINT"

    #Get Analytics Org
    ANALYTICS_RESOURCE_GROUP="rg-$ENV-analytics"
    ANALYTICS_IBP_SERVICE_INSTANCE="$ENV-analytics-ibp"
    ANALYTICS_IBP_SERVICE_KEY="$ENV-analytics-IBP-ServiceCredential"
    ibmcloud target -g $ANALYTICS_RESOURCE_GROUP
    
    ANALYTICSORG_IBP_CREDENTIAL=$(ibmcloud resource service-keys --instance-name $ANALYTICS_IBP_SERVICE_INSTANCE --output json) || error_exit "Error in fetching service end point for $ANALYTICS_IBP_SERVICE_INSTANCE"
    ANALYTICSORG_IBP_API_ENDPOINT=$(jq '.[0].credentials.api_endpoint' <<< ${ANALYTICSORG_IBP_CREDENTIAL} |sed 's/https\?:\/\///' | tr -d '"')
    if [ -z $ANALYTICSORG_IBP_API_ENDPOINT ] || [ $ANALYTICSORG_IBP_API_ENDPOINT == "null" ]
    then
        echo "Analytics IBP is not created yet, Please create Analytics before creating Carrier"
        exit 1
    fi

    ANALYTICSORG_IBP_API_KEY=$(jq '.[0].credentials.apikey' <<< ${ANALYTICSORG_IBP_CREDENTIAL} | tr -d '"') 
    echo "ANALYTICS ORG $ANALYTICS_IBP_SERVICE_INSTANCE IS $ANALYTICSORG_IBP_API_ENDPOINT"

    cp $PWD/metadata/ordering-org-vars.yml $PWD/ansible/ordering-org-vars.yml
    cp $PWD/metadata/org1-vars.yml $PWD/ansible/org1-vars.yml
    cp $PWD/metadata/common-vars.yml $PWD/ansible/common-vars.yml
    cp $PWD/metadata/config_image_var.sh $PWD/ansible/config_image_var.sh
    cp $PWD/metadata/org2-vars.yml $PWD/ansible/org2-vars.yml
    cp $PWD/metadata/org3-vars.yml $PWD/ansible/org3-vars.yml

    #Use same for both Orderer and Org1 for now
    sed -i 's/${ORDERER_IBP_API_ENDPOINT}/'$PARENTORG_IBP_API_ENDPOINT'/g' ansible/ordering-org-vars.yml
    sed -i 's/${ORDERER_IBP_API_KEY}/'$PARENTORG_IBP_API_KEY'/g' ansible/ordering-org-vars.yml

    #Use same for both Orderer and Org1 for now
    sed -i 's/${ORG1_IBP_API_ENDPOINT}/'$PARENTORG_IBP_API_ENDPOINT'/g' ansible/org1-vars.yml
    sed -i 's/${ORG1_IBP_API_KEY}/'$PARENTORG_IBP_API_KEY'/g' ansible/org1-vars.yml



    sed -i 's/${ORG2_IBP_API_ENDPOINT}/'$CURRORG_IBP_API_ENDPOINT'/g' ansible/org2-vars.yml
    sed -i 's/${ORG2_IBP_API_KEY}/'$CURRORG_IBP_API_KEY'/g' ansible/org2-vars.yml
    sed -i 's/${ORG2_NAME}/'$ORG'/g' ansible/org2-vars.yml
    sed -i 's/analytics-${ORG1_NAME}/analytics-'$ORG'/g' ansible/common-vars.yml
    sed -i 's/${ORG1_NAME}/'aais'/g' ansible/common-vars.yml
    sed -i 's/${ORG2_NAME}/'$ORG'/g' ansible/common-vars.yml
    
    sed -i 's/${ORG1_NAME}/'aais'/g' ansible/org1-vars.yml
    sed -i 's/${NODE_NAME}/'$ORG'/g' ansible/config_image_var.sh

    #For analytics node
    sed -i 's/${ORG3_IBP_API_ENDPOINT}/'$ANALYTICSORG_IBP_API_ENDPOINT'/g' ansible/org3-vars.yml
    sed -i 's/${ORG3_IBP_API_KEY}/'$ANALYTICSORG_IBP_API_KEY'/g' ansible/org3-vars.yml
    sed -i 's/${ORG3_NAME}/'analytics'/g' ansible/org3-vars.yml
fi

chmod -R 777 ansible

rm ansible/Org1*.json
rm ansible/Ordering*.json

ls -ltr ansible
