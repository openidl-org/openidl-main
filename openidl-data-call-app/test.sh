#!/bin/bash


set -e

# Download and install Node.js 8.9
curl -O https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-x64.tar.xz
tar -xf node-v8.9.0-linux-x64.tar.xz
export PATH=${PWD}/node-v8.9.0-linux-x64/bin:$PATH

# Update npm
npm i npm@5.5.1 -g
node -v
npm -v

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json

# Add Cloudand and App ID credentials to local config files (this is foe execution of test cases)
cat <<< ${APPID_CONFIG} | sed -e 's/^"//' -e 's/"$//' | sed -r 's/\\/"/g' > server/config/local-appid-config.json
cat <<< ${COGNITO_CONFIG} | sed -e 's/^"//' -e 's/"$//' | sed -r 's/\\/"/g' > server/config/local-cognito-config.json
cat <<< ${CLOUDANT_CONFIG}| sed -e 's/^"//' -e 's/"$//' | sed -r 's/\\/"/g' > server/config/local-cloudant-config.json
cat <<< ${IBM_CERTIFICATE_MANAGER_CONFIG}| sed -e 's/^"//' -e 's/"$//' | sed -r 's/\\/"/g' > server/config/local-certmanager-config.json

# Install npm dependencies and run tests
npm install
npm list --depth=0
npm test