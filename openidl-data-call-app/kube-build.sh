# SPDX-License-Identifier: Apache-2.0
# updating host name in Dockerfile
sed -i 's/${HOST_NAME}/'$HOST_NAME'/g' ${DOCKER_ROOT}/deployment.yml
sed -i 's/${CLUSTER_NAME}/'$CLUSTER_NAME'/g' ${DOCKER_ROOT}/deployment.yml

cat ${DOCKER_ROOT}/deployment.yml

set -x
cat ${DOCKER_ROOT}/Dockerfile
# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json

echo "Printing package.json"
cat  package.json

sed -i 's/${HOST}/'$HOST'/g' ./server/config/channel-config.json
sed -i 's/${CROSS_CHANNELS}/'$CROSS_CHANNELS'/g' ./server/config/channel-config.json
cat ./server/config/channel-config.json

# choose mongo or cloudant
sed -i 's|env_target_db|'$TARGET_DB'|g' server/config/DBConfig.json