# SPDX-License-Identifier: Apache-2.0
#!/bin/bash
set -x
export PROJDIR=${PWD}
#!/bin/bash -e
# Download and Install node 8 on path
curl -O https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-x64.tar.xz
tar -xf node-v8.9.0-linux-x64.tar.xz
export PATH=${PWD}/node-v8.9.0-linux-x64/bin:$PATH
# Update npm
npm i npm@5.5.1 -g
node -v
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json

cd $PROJDIR
cd server/
cd config/
sed -i 's,${DATA_CALL_CARRIER_APP_URL},'$DATA_CALL_CARRIER_APP_URL',g' config.js

cd $PROJDIR
sed -i 's|<value goes here>|'$APPID_CONFIG'|g' manifest.yml

# Add name value to manifest.yml
sed -i 's|env-name|'$HOST_NAME'|g' manifest.yml
# Add host value to manifest.yml
sed -i 's|env-host|'$HOST_NAME'|g' manifest.yml

cat manifest.yml

cd $PROJDIR
cat <<< ${APPID_CONFIG} | sed -e 's/^"//' -e 's/"$//' | sed -r 's/\\/"/g' > server/config/local-appid-config.json

cd $PROJDIR

npm install

mkdir lib
cp -r node_modules/openidl-common-ui/* lib/

npm link @angular/cli

ng build --prod

rm -R node-v8.9.0-linux-x64
rm node-v8.9.0-linux-x64.tar.xz

cd $PROJDIR

