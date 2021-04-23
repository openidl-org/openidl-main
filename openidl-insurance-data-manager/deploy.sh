#
# SPDX-License-Identifier: Apache-2.0
#
#!/bin/bash

# We should abort as soon as there is an error
set -e

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json
# Add App ID credentials to manifest.yml
sed -i 's|env-appid|'$APPID_CONFIG'|g' manifest.yml
# Add name value to manifest.yml
sed -i 's|env-name|'$HOST_NAME'|g' manifest.yml
# Add host value to manifest.yml
sed -i 's|env-host|'$HOST_NAME'|g' manifest.yml
# Add Certificate Manager (App ID and instance id ) credentials to manifest.yml
sed -i 's|<cert value goes here>|'$IBM_CERTIFICATE_MANAGER_CONFIG'|g' manifest.yml
echo "***************cert env:"
echo $IBM_CERTIFICATE_MANAGER_CONFIG
echo "*********"
cat manifest.yml
echo "*********end"
#rename connection profile and channel config file
mv server/config/channel-config-$HOST.json server/config/channel-config.json
mv server/config/connection-profile-$HOST.json server/config/connection-profile.json
# Provision application on the cloud
cf push "${CF_APP}"

# View logs
# cf logs "${CF_APP}" --recent