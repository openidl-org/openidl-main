#
# SPDX-License-Identifier: Apache-2.0
#
#!/bin/bash
# We should abort as soon as there is an error
set -e

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json

# Add name value to manifest.yml
sed -i 's|env-host|'$HOST_NAME'|g' manifest.yml

# Add Certificate Manager (App ID and instance id ) credentials to manifest.yml
sed -i 's|<cert value goes here>|'$IBM_CERTIFICATE_MANAGER_CONFIG'|g' manifest.yml
# Add env_insurance_data_storage from env variable insurance_data_storage 
sed -i 's|env_insurance_data_storage|'$INSURANCE_DATA_STORAGE'|g' server/config/default.json

# Create s3-bucket-config file from S3BUCKET_CONFIG env variable
cat <<< ${S3BUCKET_CONFIG}| sed -e 's/^"//' -e 's/"$//' | sed -r 's/\\/"/g' > server/config/s3-bucket-config.json

echo "***************cert env:"
echo $IBM_CERTIFICATE_MANAGER_CONFIG
echo "*********"
cat manifest.yml
echo "*********end"
# Provision application on the cloud
cf push "${CF_APP}"

# View logs
# cf logs "${CF_APP}" --recent
