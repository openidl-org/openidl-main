# SPDX-License-Identifier: Apache-2.0
#!/bin/bash

# We should abort as soon as there is an error
set -e

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json

# Add name value to manifest.yml
sed -i 's|env-host|'$HOST_NAME'|g' manifest.yml

# Add App ID credentials to manifest.yml
sed -i 's|<value goes here>|'$APPID_CONFIG'|g' manifest.yml

# Add Certificate Manager (App ID and instance id ) credentials to manifest.yml
sed -i 's|<cert value goes here>|'$IBM_CERTIFICATE_MANAGER_CONFIG'|g' manifest.yml

# Provision application on the cloud
cf push "${CF_APP}"

# View logs
# cf logs "${CF_APP}" --recent