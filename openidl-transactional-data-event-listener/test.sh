#
# SPDX-License-Identifier: Apache-2.0
#
#!/bin/bash

# We should abort as soon as there is an error
set -e

# Download and install Node.js 8.9
curl -O https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-x64.tar.xz
tar -xf node-v8.9.0-linux-x64.tar.xz
export PATH=${PWD}/node-v8.9.0-linux-x64/bin:$PATH

# Update npm
npm i npm@5.5.1 -g
node -v
npm -v

# Add GitLab token to package.json file
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json

# Add env_insurance_data_storage from env variable insurance_data_storage 
sed -i 's|env_insurance_data_storage|'$INSURANCE_DATA_STORAGE'|g' server/config/default.json

# Create s3-bucket-config file from S3BUCKET_CONFIG env variable
cat <<< ${S3BUCKET_CONFIG}| sed -e 's/^"//' -e 's/"$//' | sed -r 's/\\/"/g' > server/config/s3-bucket-config.json

# Install npm dependencies and run tests
npm install
npm list --depth=0

npm test