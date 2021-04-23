# SPDX-License-Identifier: Apache-2.0
echo ${HOST_NAME}

# updating host name in Dockerfile
sed -i 's/${HOST_NAME}/'$HOST_NAME'/g' ${DOCKER_ROOT}/deployment.yml
sed -i 's/${CLUSTER_NAME}/'$CLUSTER_NAME'/g' ${DOCKER_ROOT}/deployment.yml

cat ${DOCKER_ROOT}/deployment.yml

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json

echo "Printing package.json"
cat  package.json

echo $DATA_CALL_APP_URL

sed -i 's,${DATA_CALL_CARRIER_APP_URL},'$DATA_CALL_APP_URL',g' ./server/config/config.js

cat ./server/config/config.js