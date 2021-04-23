# SPDX-License-Identifier: Apache-2.0
#!/bin/bash

sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json
# Add Certificate Manager (App ID and instance id ) credentials to manifest.yml
sed -i 's|<cert value goes here>|'$IBM_CERTIFICATE_MANAGER_CONFIG'|g' manifest.yml

# Add name value to manifest.yml
sed -i 's|env-host|'$HOST_NAME'|g' manifest.yml

cat package.json
cf push "${CF_APP}"

# View logs
# cf logs "${CF_APP}" --recent