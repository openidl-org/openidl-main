# SPDX-License-Identifier: Apache-2.0
#!/bin/bash
source config.sh
source utils.sh

API_KEY=$TF_VAR_ibmcloud_api_key
ENV=$TF_VAR_environment
ORG=$TF_VAR_node
REGION=$TF_VAR_region
RESOURCE_GROUP="rg-$ENV-$ORG"

PIPELINE_DIR=$PWD
# # Login to IBM Cloud
ibmcloud login --apikey $API_KEY -r $REGION -g $RESOURCE_GROUP || error_exit "Error logging into IBM Cloud"

echo "Certificate creation to the ORG is $1" 

if [ "$1" == "analytics" ]
then
   #EXEC_ARRAY="${ANALYTICS[@]}"
    EXEC_ARRAY=(openidl-HOST-data-call-app-ibp-2.0 openidl-data-call-mood-listener-ibp-2.0 openidl-transactional-data-event-listener-ibp-2.0)
else
  # EXEC_ARRAY="${AAIS_CARRIER[@]}"
     EXEC_ARRAY=(openidl-HOST-data-call-app-ibp-2.0 openidl-HOST-insurance-data-manager-ibp-2.0 openidl-HOST-data-call-processor-ibp-2.0)
fi

if [ "$1" == "aais" ] || [ "$1" == "analytics"  ]
then
    ROLE='advisory'
else
    ROLE='carrier'
fi

# Get API Token
CONTENT_HEADER="Content-Type:application/json"
APPID_OAUTH=$(jq '.oauthServerUrl' output/local-appid-config.json | tr -d '"')
APPID_OAUTH+=/token
APPID_CLIENTID=$(jq '.clientId' output/local-appid-config.json | tr -d '"')
APPID_SECRET=$(jq '.secret' output/local-appid-config.json | tr -d '"')

HTTP_STATUS=$(curl -w '%{http_code}' --location --request POST "$APPID_OAUTH" \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode  'client_id='$APPID_CLIENTID \
--data-urlencode 'client_secret='$APPID_SECRET -o 'token.json') || error_exit "Failed invoking AppID Auth"

echo "HTTP Status is $HTTP_STATUS"
if [[ ${HTTP_STATUS} -lt 200 || ${HTTP_STATUS} -ge 300 ]]
then
    error_exit "Error in Invoking AppID Auth with status ${HTTP_STATUS}"
fi

ACCESS_TOKEN=$(jq '.access_token' token.json)
TOTAL_LENTH_TOKEN=${#ACCESS_TOKEN}


ibmcloud ks cluster config --cluster "$ENV-$ORG-apps-clstr" || error_exit "Error in setting cluster config for $ENV-$ORG-apps-clstr"

kubectl config set-context --current --namespace=openidl-aais-apps || error_exit "Error in setting namespace for $ENV-$ORG-apps-clstr"

content=$(ibmcloud ks cluster get --cluster $ENV-$ORG-apps-clstr --output JSON) || error_exit "Error in getting details for $ENV-$ORG-apps-clstr"
echo "Content is $content"
CLUSTER_NAME=$(jq -r  '.ingressHostname' <<< ${content} | tr -d '"') 
echo "CLUSTER IS $CLUSTER_NAME"


UTLITY_SERVICE_API="https://openidl-utilities.$CLUSTER_NAME/openidl/api/fabric-user-enrollment"


if [ "$ACCESS_TOKEN" != "null" ] && [ "$TOTAL_LENTH_TOKEN" > 0 ]
then
    ACCESS_TOKEN=$(jq '.access_token' token.json | tr -d '"')
 
 
    for CER_NAME in "${EXEC_ARRAY[@]}"
    do
        USER_NAME=${CER_NAME//HOST/$1}
        
        cp $PWD/metadata/payload.json $PWD/payload.json
        
        sed -i 's/${ORG}/'$1'/g' payload.json
        sed -i 's/${OPERATION_MODE}/'$REGISTER'/g' payload.json
        sed -i 's/${ROLE}/'$ROLE'/g' payload.json
        sed -i 's/${USER}/'$USER_NAME'/g' payload.json

        echo `cat payload.json` > register.txt 
        #sed -i 's/"/\\"/g' register.txt

        REG_BODY_PAYLOAD=$(<register.txt)
    
        printf "Register a $USER_NAME into ORG $1 \n \n"

        echo "UTIL is $UTLITY_SERVICE_API"
        echo "Acces tokeb $ACCESS_TOKEN"
        echo "REG Body $REG_BODY_PAYLOAD"
        HTTP_STATUS=$(curl -w '%{http_code}' --location --request POST  $UTLITY_SERVICE_API \
        --header 'Authorization: Bearer '$ACCESS_TOKEN \
        --header 'Content-Type: application/json' \
        --data-raw "$REG_BODY_PAYLOAD" -o 'registerresult.json')

        echo "HTTP Status is $HTTP_STATUS"
        if [[ ${HTTP_STATUS} -lt 200 || ${HTTP_STATUS} -ge 300 ]]
        then
            error_exit "Error in Invoking Utility Service while registering with status ${HTTP_STATUS}"
        fi

        REG_RESULT=$(jq '.success' registerresult.json)
        if [ $REG_RESULT == true ]
        then
            
            printf "User $USER_NAME is registered successfully into ORG $1 \n \n"
            printf "Enrolling the user $USER_NAME into ORG $1"

            jq '.options = "enroll"' payload.json > enroll.txt
            #sed -i 's/"/\\"/g' enroll.txt

            ENROLL_BODY_PAYLOAD=$(<enroll.txt)

            HTTP_STATUS=$(curl -w '%{http_code}' --location --request POST  $UTLITY_SERVICE_API \
            --header 'Authorization: Bearer '$ACCESS_TOKEN \
            --header 'Content-Type: application/json' \
            --data-raw "$ENROLL_BODY_PAYLOAD" -o 'enrollresult.json')

            echo "HTTP Status is $HTTP_STATUS"
            if [[ ${HTTP_STATUS} -lt 200 || ${HTTP_STATUS} -ge 300 ]]
            then
                error_exit "Error in Invoking Utility Service while enrolling with status ${HTTP_STATUS}"
            fi


            ENROLL_RESULT=$(jq '.success' enrollresult.json)

            if [ $ENROLL_RESULT == true ]
            then
                  printf "User $USER_NAME is Enrolled successfully into ORG $1 \n \n"
            else
                  error_exit "Failed to Enroll user $USER_NAME into ORG $ORG. Please connect with support team"
            fi
        else
              error_exit "Failed to Register user $USER_NAME into ORG $ORG. Please connect with support team"
        fi
    done
   
else
    printf "Token generation failed for ORG $1. Hence Failed to Register and Enroll user into ORG $1, please connect with support team \n \n"
    CURSTATUS=$(echo $?)
    exit $CURSTATUS
fi
 






