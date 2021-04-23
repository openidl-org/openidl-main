# SPDX-License-Identifier: Apache-2.0
#!/bin/bash
# We should abort as soon as there is an error
set -e

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json
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
mv server/config/listener-channel-config-$HOST.json server/config/listener-channel-config.json
mv server/config/target-channel-config-$HOST.json server/config/target-channel-config.json
mv server/config/connection-profile-$HOST.json server/config/connection-profile.json
mv server/config/unique-identifiers-config-$HOST.json server/config/unique-identifiers-config.json

sed -i 's|env-appName|'$APP_PREFIX'|g' server/config/default.json
# Provision application on the cloud
cf push "${CF_APP}"

# View logs
# cf logs "${CF_APP}" --recent
