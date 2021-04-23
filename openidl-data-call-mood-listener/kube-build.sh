# SPDX-License-Identifier: Apache-2.0
# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json

# read config for mongo or cloudant
sed -i 's|env_block_managment_db|'$BLOCK_MANAGMENT_DB'|g' server/config/DBConfig.json

echo "Printing package.json file"
cat  package.json

# updating host name in Dockerfile
sed -i 's/${HOST_NAME}/'$HOST_NAME'/g' ${DOCKER_ROOT}/deployment.yml
sed -i 's/${CLUSTER_NAME}/'$CLUSTER_NAME'/g' ${DOCKER_ROOT}/deployment.yml

sed -i 's/${LISTENER_CHANNELS_EVENTS}/'$LISTENER_CHANNELS_EVENTS'/g' ${DOCKER_ROOT}/server/config/listener-channel-config.json