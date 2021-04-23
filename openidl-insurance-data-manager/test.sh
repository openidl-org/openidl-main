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

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json


# Install npm dependencies and run tests
npm install
npm list --depth=0
#rename connection profile and channel config file
mv server/config/channel-config-$HOST.json server/config/channel-config.json
mv server/config/connection-profile-$HOST.json server/config/connection-profile.json

npm test