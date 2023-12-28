source utils.sh

API_KEY=$TF_VAR_ibmcloud_api_key
ENV=$TF_VAR_environment
ORG=$TF_VAR_node
REGION=$TF_VAR_region
RESOURCE_GROUP="rg-$ENV-$ORG"

PIPELINE_DIR=$PWD
# # Login to IBM Cloud
ibmcloud login --apikey $API_KEY -r $REGION -g $RESOURCE_GROUP || error_exit "Error logging into IBM Cloud"

#Copy connection profile to output folder - TBD
cp ansible/connection-profile.json output/connection-profile.json
sed -i 's/MSP/msp/g' output/connection-profile.json


cd $PIPELINE_DIR

APPID_SERVICE_KEY="$ENV-$ORG-AppID-ServiceKey"
APPID_SERVICE_INSTANCE="$ENV-$ORG-appid"

MONGODB_SERVICE_KEY="$ENV-$ORG-MongoDB-ServiceKey"
MONGODB_SERVICE_INSTANCE="$ENV-$ORG-mongodb"

CERTMAN_SERVICE_INSTANCE="$ENV-$ORG-certman"

echo "resource group is $RESOURCE_GROUP"

#Create a Service credential for AppID
ibmcloud resource service-key-create $APPID_SERVICE_KEY Manager --instance-name $APPID_SERVICE_INSTANCE || error_exit "Error creating AppID Service credential for $APPID_SERVICE_INSTANCE"

#Retrieve the Service credential for AppID
APPID_SERVICE_CREDENTIAL=$(ibmcloud resource service-keys --instance-name $APPID_SERVICE_INSTANCE --output json) || error_exit "Error retrieving AppID Service credential for $APPID_SERVICE_INSTANCE"
echo $APPID_SERVICE_CREDENTIAL

(jq '.[0].credentials |
      {
    apikey: .apikey,
    appidServiceEndpoint: .appidServiceEndpoint,
    clientId: .clientId,
    discoveryEndpoint: .discoveryEndpoint,
    iam_apikey_description: .iam_apikey_description,
    iam_apikey_name: .iam_apikey_name,
    iam_role_crn: .iam_role_crn,
    iam_serviceid_crn: .iam_serviceid_crn,
    managementUrl: .managementUrl,
    oauthServerUrl: .oauthServerUrl,
    profilesUrl: .profilesUrl,
    secret: .secret,
    tenantId: .tenantId,
    version: 4,
    callerId: .clientId
    }' <<< $APPID_SERVICE_CREDENTIAL) > output/local-appid-config.json

#Create a Service credential for MongoDB
ibmcloud resource service-key-create $MONGODB_SERVICE_KEY --instance-name $MONGODB_SERVICE_INSTANCE || error_exit "Error creating MongoDB Service credential for $MONGODB_SERVICE_INSTANCE"

MONGODB_SERVICE_CREDENTIAL=$(ibmcloud resource service-keys --instance-name $MONGODB_SERVICE_INSTANCE --output json ) || error_exit "Error retrieving MongoDB Service credential for $MONGODB_SERVICE_INSTANCE"
(jq '.[0].credentials' <<< $MONGODB_SERVICE_CREDENTIAL) > output/local-mongo-config.json

#Get the CRN for certificate Manager
CERTMAN_SERVICE_CREDENTIAL=$(ibmcloud resource service-instance $CERTMAN_SERVICE_INSTANCE --output JSON) || error_exit "Error getting Cretificate Manager service credential for $CERTMAN_SERVICE_INSTANCE"

(jq ".[0] |
      {
          apikey: \"$API_KEY\",
          instance_id: .crn
      }" <<< $CERTMAN_SERVICE_CREDENTIAL) > output/local-certmanager-config.json

#Create Kubernetes Secrets
#ibmcloud ks clusters

ibmcloud ks cluster config --cluster "$ENV-$ORG-apps-clstr" || error_exit "Error in setting the cluster config for $ENV-$ORG-apps-clstr"


kubectl create namespace openidl-aais-apps

kubectl config set-context --current --namespace=openidl-aais-apps || error_exit "Error in setting namespace for $ENV-$ORG-apps-clstr" 

content=$(ibmcloud ks cluster get --cluster $ENV-$ORG-apps-clstr --output JSON) || error_exit "Error in getting cluster details for $ENV-$ORG-apps-clstr" 
echo "Content is $content"
CLUSTER_NAME=$(jq -r  '.ingressHostname' <<< ${content} | tr -d '"') 
echo "CLUSTER IS $CLUSTER_NAME"
SECRET_NAME=$(jq -r  '.ingressSecretName' <<< ${content} | tr -d '"') 
echo "Secret Name IS $SECRET_NAME"

ingressSecret=$(ibmcloud ks ingress secret get -c $ENV-$ORG-apps-clstr --name $SECRET_NAME --namespace default --output JSON) || error_exit "Error in getting TLS secret details for $ENV-$ORG-apps-clstr" 
echo "Secret details are $ingressSecret"
CRN_NAME=$(jq -r  '.crn' <<< ${ingressSecret} | tr -d '"') 
echo "CRN IS $CRN_NAME"

ibmcloud ks ingress secret create --cluster $ENV-$ORG-apps-clstr --cert-crn $CRN_NAME --name $SECRET_NAME --namespace openidl-aais-apps || error_exit "Error in creating TLS secret details for $ENV-$ORG-apps-clstr" 

if [[ $ORG != "analytics" ]]
then
    #COS
    COS_SERVICE_KEY="$ENV-$ORG-COS-ServiceKey"
    COS_SERVICE_INSTANCE="$ENV-$ORG-cos"

    #Create a Service credential for COS
    ibmcloud resource service-key-create $COS_SERVICE_KEY Manager --instance-name $COS_SERVICE_INSTANCE || error_exit "Error in creating COS service credential for $COS_SERVICE_INSTANCE" 

    #Retrieve the Service credential for COS
    COS_SERVICE_CREDENTIAL=$(ibmcloud resource service-keys --instance-name $COS_SERVICE_INSTANCE --output json) || error_exit "Error in retrieving AppID service credential for $COS_SERVICE_INSTANCE" 
    (jq '.[0].credentials' <<< $COS_SERVICE_CREDENTIAL) > output/local-cos-config.json

    #delete the secret if it aleady exists
    kubectl delete secret appssecret

    kubectl create secret generic appssecret --from-file=appid=output/local-appid-config.json --from-file=certmanager=output/local-certmanager-config.json --from-file=kvs=server/config/local-kvs-config.json --from-file=mongodb=output/local-mongo-config.json --from-file=cloudantdb=output/local-cloudant-config.json --from-file=connectionprofile=output/connection-profile.json || error_exit "Error in creating secret for $ENV-$ORG-apps-clstr"
else
    #delete the secret if it aleady exists
    kubectl delete secret appssecret

    kubectl create secret generic appssecret --from-file=appid=output/local-appid-config.json --from-file=certmanager=output/local-certmanager-config.json --from-file=kvs=server/config/local-kvs-config.json --from-file=mongodb=output/local-mongo-config.json --from-file=cloudantdb=output/local-cloudant-config.json --from-file=connectionprofile=output/connection-profile.json --from-file=awss3=output/s3-bucket-config.json || error_exit "Error in creating secret for $ENV-$ORG-apps-clstr"
fi

kubectl get secrets

if [[ $ORG != "analytics" ]]
then
    ibmcloud login --apikey $API_KEY -r $REGION -g $RESOURCE_GROUP || error_exit "Error logging into IBM Cloud"
    ibmcloud ks cluster config --cluster "$ENV-$ORG-nifi-clstr" || error_exit "Error in setting cluster config for $ENV-$ORG-nifi-clstr"


    kubectl create namespace nifi

    kubectl config set-context --current --namespace=nifi || error_exit "Error in setting namespace for $ENV-$ORG-nifi-clstr"

    APPID_OAUTH_SERVER_URL=$(jq '.oauthServerUrl' output/local-appid-config.json | tr -d '"')
    echo "OAUTH IS $APPID_OAUTH_SERVER_URL"
    APPID_CLIENTID=$(jq '.clientId' output/local-appid-config.json | tr -d '"')
    echo "APPID CLIENT ID  IS $APPID_CLIENTID"
    APPID_SECRET=$(jq '.secret' output/local-appid-config.json | tr -d '"')
    echo "SECRET IS $APPID_SECRET"

    COS_API_KEY=$(jq '.apikey' output/local-cos-config.json | tr -d '"')
    echo "COS API KEY IS $COS_API_KEY"
    COS_RESOURCE_INSTANCE_ID=$(jq '.resource_instance_id' output/local-cos-config.json | tr -d '"')
    echo "RESOURCE INSTANCE IS $COS_RESOURCE_INSTANCE_ID"
    echo "CLUSTER IS $CLUSTER_NAME"

    cp metadata/flowConfig.json output/flowConfig.json

    #Use same for both Orderer and Org1 for now
    sed -i 's;${APPID_OAUTH_SERVER_URL};'$APPID_OAUTH_SERVER_URL';g' output/flowConfig.json
    sed -i 's/${APPID_CLIENTID}/'$APPID_CLIENTID'/g' output/flowConfig.json
    sed -i 's/${APPID_SECRET}/'$APPID_SECRET'/g' output/flowConfig.json
    sed -i 's/${COS_API_KEY}/'$COS_API_KEY'/g' output/flowConfig.json
    sed -i 's;${COS_RESOURCE_INSTANCE_ID};'$COS_RESOURCE_INSTANCE_ID';g' output/flowConfig.json
    sed -i 's/${CLUSTER_NAME}/'$CLUSTER_NAME'/g' output/flowConfig.json

    sed -i 's/${ENV}/'$ENV'/g' output/flowConfig.json
    sed -i 's/${ORG}/'$ORG'/g' output/flowConfig.json

    #Getint Ingress secret and creating it in the namespace
    content=$(ibmcloud ks cluster get --cluster $ENV-$ORG-nifi-clstr --output JSON) || error_exit "Error in getting cluster details for $ENV-$ORG-nifi-clstr" 
    echo "Content is $content"
    SECRET_NAME=$(jq -r  '.ingressSecretName' <<< ${content} | tr -d '"') 
    echo "Secret Name IS $SECRET_NAME"

    ingressSecret=$(ibmcloud ks ingress secret get -c $ENV-$ORG-nifi-clstr --name $SECRET_NAME --namespace default --output JSON) || error_exit "Error in getting TLS secret details for $ENV-$ORG-nifi-clstr" 
    echo "Secret details are $ingressSecret"
    CRN_NAME=$(jq -r  '.crn' <<< ${ingressSecret} | tr -d '"') 
    echo "CRN IS $CRN_NAME"

    ibmcloud ks ingress secret create --cluster $ENV-$ORG-nifi-clstr --cert-crn $CRN_NAME --name $SECRET_NAME --namespace nifi || error_exit "Error in creating TLS secret details for $ENV-$ORG-nifi-clstr" 

    #delete the secret if it aleady exists
    kubectl delete secret appssecret

    kubectl create secret generic appssecret --from-file=nifi=output/flowConfig.json || error_exit "Error in creating secret for $ENV-$ORG-nifi-clstr"

    kubectl get secrets
fi

cd ansible
ls -ltr
echo  "*******Ordering Org CA Admin.json**********"
cat "OrderingOrg CA Admin.json"
echo ""
echo  "*******Ordering Org Admin.json**********"
cat "OrderingOrg Admin.json"
echo ""
echo  "*******aais CA Admin.json**********"
cat "$ORG""CA Admin.json"
echo ""
echo  "*******aais MSP Admin.json**********"
cat "$ORG""MSP Admin.json"
echo ""